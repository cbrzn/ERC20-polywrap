import {
  Ethereum_TxResponse,
  Ethereum_Mutation,
  Input_transfer,
  Input_approve,
  Input_transferFrom,
  Input_increaseAllowance,
  Input_decreaseAllowance
} from "./w3";

export function transfer(input: Input_transfer): Ethereum_TxResponse {
  return Ethereum_Mutation.callContractMethod({
    connection: input.connection,
    address: input.address,
    method: "function transfer(address recipient, uint256 amount) public returns (bool)",
    args: [input.recipient, input.amount.toString()]
  })
}

export function approve(input: Input_approve): Ethereum_TxResponse {
  return Ethereum_Mutation.callContractMethod({
    connection: input.connection,
    address: input.address,
    method: "function approve(address spender, uint256 amount) public returns (bool)",
    args: [input.spender, input.amount.toString()]
  })
}

export function transferFrom(input: Input_transferFrom): Ethereum_TxResponse {
  return Ethereum_Mutation.callContractMethod({
    connection: input.connection,
    address: input.address,
    method: "function transferFrom(address sender, address recipient, uint256 amount) public returns (bool)",
    args: [input.sender, input.recipient, input.amount.toString()]
  })
}

export function increaseAllowance(input: Input_increaseAllowance): Ethereum_TxResponse {
  return Ethereum_Mutation.callContractMethod({
    connection: input.connection,
    address: input.address,
    method: "function increaseAllowance(address spender, uint256 addedValue) public returns (bool)",
    args: [input.spender, input.addedValue.toString()]
  })
}

export function decreaseAllowance(input: Input_decreaseAllowance): Ethereum_TxResponse {
  return Ethereum_Mutation.callContractMethod({
    connection: input.connection,
    address: input.address,
    method: "function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool)",
    args: [input.spender, input.subtractedValue.toString()]
  })
}