const { ethers } = require("ethers")
const { Web3ApiClient } = require("@web3api/client-js")
const { ensPlugin } = require("@web3api/ens-plugin-js")
const { ethereumPlugin } = require("@web3api/ethereum-plugin-js")
const { ipfsPlugin } = require("@web3api/ipfs-plugin-js")
const axios = require("axios")

/**
 * This test exists because:
 * In order to test `transferFrom`, we need to be able to call
 * approve from one account and then transferFrom from a different
 * account. AFAIK, this cannot be done in the recipes test framework
 * today.
 */

const constants = require("../recipes/constants.json")
const erc20artifact = require("../artifacts/contracts/ERC20Mintable.sol/ERC20Mintable.json")

async function getClient(signer) {
  signerAddress = await signer.getAddress()
  return new Web3ApiClient({
    plugins: [
      {
        uri: "/ens/ens.web3api.eth",
        plugin: ensPlugin({
            addresses: { testnet: ensAddress }
        })
      },
      {
        uri: "/ens/ipfs.web3api.eth",
        plugin: ipfsPlugin({
          provider: ipfs
        }),
      },
      {
        uri: "/ens/ethereum.web3api.eth",
        plugin: ethereumPlugin({
          networks: {
            testnet: {
              provider: ethereum,
              signer: signerAddress
            }
          },
          // If defaultNetwork is not specified, mainnet will be used.
          defaultNetwork: "testnet"
        })
      }
    ]
  })
}

const uri = '/ens/testnet/erc20.eth'
let ensAddress, ethereum, ipfs, provider, alice, bob, amount

beforeAll(async () => {
  ensAddress = (await axios.get("http://localhost:4040/ens")).data.ensAddress
  const localProviders = await axios.get("http://localhost:4040/providers")
  ethereum = localProviders.data.ethereum
  ipfs = localProviders.data.ipfs
  provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
  alice = await provider.getSigner(0)
  bob = await provider.getSigner(1)
  // mint tokens
  const erc20 = new ethers.Contract(
    constants.Erc20Addr,
    erc20artifact.abi,
    alice
  )
  amount = ethers.utils.parseEther("1")
  await erc20.mint(
    await alice.getAddress(),
    amount
  )
  await erc20.mint(
    await bob.getAddress(),
    amount
  )
})

test("transferFrom works", async () => {
  const clientAlice = await getClient(alice)
  const clientBob = await getClient(bob)

  // approve allowance from Alice to Bob
  let result = await clientAlice.query({
    uri,
    query: `
      mutation approve {
        approve(
          address: $address
          spender: $spender
          amount: $amount
        )
      }
    `,
    variables: {
      address: constants.Erc20Addr,
      spender: await bob.getAddress(),
      amount: String(amount.div(2))
    }
  })
  expect(result.errors).toBeUndefined()

  // Bob calls transferFrom to transfer from Alice
  result = await clientBob.query({
    uri,
    query: `
      mutation transferFrom {
        transferFrom(
          address: $address
          sender: $sender
          recipient: $recipient
          amount: $amount
        )
      }
    `,
    variables: {
      address: constants.Erc20Addr,
      sender: await alice.getAddress(),
      recipient: await bob.getAddress(),
      amount: String(amount.div(2))
    }
  })
  expect(result.errors).toBeUndefined()
})