const { EthereumPlugin } = require("@web3api/ethereum-plugin-js");
const fs = require("fs");
const buildContract = require("./build-contract");

async function main() {
  // Ensure the contract is built
  await buildContract.main();

  // Fetch the contract's ABI
  const contract = JSON.parse(
    fs.readFileSync(`${__dirname}/../contracts/ERC20.json`, "utf-8")
  );

  // Deploy the contract to testnet
  const eth = new EthereumPlugin({
    networks: {
      testnet: {
        provider: "http://localhost:8545",
      },
    },
    defaultNetwork: "testnet",
  });

  const address = await eth.deployContract({
    abi: contract.abi,
    bytecode: contract.bytecode,
    args: ["Test", "TEST"],
    connection: {
      networkNameOrChainId: "testnet",
    },
  });

  console.log(`✔️ ERC20 live at: ${address}`);

  // Store the address in our recipes' constants file
  const constants = require(`${__dirname}/../recipes/constants.json`);
  constants.Erc20Addr = address;
  constants.address0 = "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1";
  constants.address1 = "0x47b77f91F441688492B7Da74152cDA0dD16f3564";
  constants.address2 = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
  fs.writeFileSync(
    `${__dirname}/../recipes/constants.json`,
    JSON.stringify(constants, null, 2)
  );

  console.log("✔️ Recipe Constants Updated");
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
} else {
  module.exports = {
    main,
  };
}
