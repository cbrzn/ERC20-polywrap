const { ethers } = require('hardhat')
const fs = require('fs')

async function main() {
  const ERC20Mintable = await ethers.getContractFactory("ERC20Mintable")
  const erc20 = await ERC20Mintable.deploy("TST", "Test Token")
  console.log("ERC20 deployed to:", erc20.address)
  let constants = JSON.parse(
    fs.readFileSync('./recipes/constants.json', { encoding: 'utf8' } )
  )
  constants = {}
  constants['Erc20Addr'] = erc20.address
  const signers = await ethers.getSigners()
  const amount = ethers.utils.parseEther("1")
  constants["amount"] = String(amount)
  for(let i = 0; i < 2; i++) {
    const address = await signers[i].getAddress()
    constants[`address${i}`] = address
    await erc20.mint(address, amount)
    console.log(`Minted ${amount} to ${address}`)
  }
  fs.writeFileSync(
    './recipes/constants.json',
    JSON.stringify(constants)
  )
  console.log("Wrote addresses and amount to recipes/constants")
  console.log("Done ✨")
}

main()
  .catch(err => {
    console.error(err)
  })
