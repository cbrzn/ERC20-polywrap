const solc = require("solc");
const fs = require("fs");
const {
  abi,
  bytecode,
} = require("../artifacts/contracts/ERC20.sol/ERC20.json");

async function main() {
  // Generate an Assemblyscript file containing the abi + bytecode
  fs.writeFileSync(
    `${__dirname}/../contracts/ERC20.ts`,
    `/// NOTE: This file is auto-generate, see deploy-contract.js
export const abi = \`${JSON.stringify(abi)}\`;
export const bytecode = "${bytecode}";
`
  );

  console.log("✔️ Generated ERC20.ts");

  const formattedAbi = JSON.stringify(abi);
  // Generate a JSON ABI file
  const contractInfo = {
    abi: formattedAbi,
    bytecode,
  };
  fs.writeFileSync(
    `${__dirname}/../contracts/ERC20.json`,
    JSON.stringify(contractInfo)
  );

  console.log("✔️ Generated ERC20.json");
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
