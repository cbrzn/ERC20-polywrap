const { ethers } = require('hardhat')
const fs = require('fs')

async function main() {
  const ERC20 = await ethers.getContractFactory("ERC20")
  const erc20 = await ERC20.deploy("TST", "Test Token")
  console.log("ERC20 deployed to:", erc20.address)
  const constants = JSON.parse(
    fs.readFileSync('./recipes/constants.json', { encoding: 'utf8' } )
  )
  constants['Erc20Addr'] = erc20.address
  const signers = await ethers.getSigners()
  for(let i = 0; i < 3; i++) {
    constants[`address${i}`] = await signers[i].getAddress()
  }
  fs.writeFileSync(
    './recipes/constants.json',
    JSON.stringify(constants)
  )
  console.log("Wrote addresses to recipes/constants")
  console.log("Done ✨")
}

main()
  .catch(err => {
    console.error(err)
  })
