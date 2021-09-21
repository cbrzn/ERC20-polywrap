const { ethers } = require("ethers")
const { waffleJest } = require("@ethereum-waffle/jest")
const { Web3ApiClient } = require("@web3api/client-js")
const { ensPlugin } = require("@web3api/ens-plugin-js")
const { ethereumPlugin } = require("@web3api/ethereum-plugin-js")
const { ipfsPlugin } = require("@web3api/ipfs-plugin-js")
const axios = require("axios")
expect.extend(waffleJest)

const constants = require("../recipes/constants.json")

test("test test", async () => {
  const { data: { ensAddress } } = await axios.get("http://localhost:4040/ens")
  const { data: { ethereum, ipfs } } = await axios.get("http://localhost:4040/providers")
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
  const signer = await provider.getSigner(0).getAddress()
  const spender = await provider.getSigner(1).getAddress()
  const client = new Web3ApiClient({
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
              signer: signer
            }
          },
          // If defaultNetwork is not specified, mainnet will be used.
          defaultNetwork: "testnet"
        })
      }
    ]
  })
  const result = await client.query({
    uri: '/ens/testnet/erc20.eth',
    query: `
      query name {
        name(
          address: $address
        )
      }
    `,
    variables: {
        address: constants.Erc20Addr
    }
  })
  console.log(result)
  const result2 = await client.query({
    uri: '/ens/testnet/erc20.eth',
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
        spender,
        amount: "1000"
    }
  })
  console.log(result2)
  expect(1).toEqual(1)
})