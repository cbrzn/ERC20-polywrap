import {
  Ethereum_Query,
  Input_name,
  Input_symbol,
  Input_decimals,
  Input_totalSupply,
  Input_balanceOf,
  Input_allowance
} from "./w3";
import { BigInt } from '@web3api/wasm-as'

export function name(input: Input_name): string {
  const res = Ethereum_Query.callContractView({
    connection: input.connection,
    address: input.address,
    method: "function name() public view returns (string memory)",
    args: null
  })
  return res as string
}

export function symbol(input: Input_symbol): string {
  const res = Ethereum_Query.callContractView({
    connection: input.connection,
    address: input.address,
    method: "function symbol() public view returns (string memory)",
    args: null
  })
  return res as string
}

export function decimals(input: Input_decimals): i32 {
  const res = Ethereum_Query.callContractView({
    connection: input.connection,
    address: input.address,
    method: "function decimals() public view returns (uint8)",
    args: null
  })
  return parseInt(res) as i32
}

export function totalSupply(input: Input_totalSupply): BigInt {
  const res = Ethereum_Query.callContractView({
    connection: input.connection,
    address: input.address,
    method: "function totalSupply() public view returns (uint256)",
    args: null
  })
  return BigInt.fromString(res)
}

export function balanceOf(input: Input_balanceOf): BigInt {
  const res = Ethereum_Query.callContractView({
    connection: input.connection,
    address: input.address,
    method: "function balanceOf(address account) public view returns (uint256)",
    args: [input.account]
  })
  return BigInt.fromString(res)
}

export function allowance(input: Input_allowance): BigInt {
  const res = Ethereum_Query.callContractView({
    connection: input.connection,
    address: input.address,
    method: "function allowance(address owner, address spender) public view returns (uint256)",
    args: [input.owner, input.spender]
  })
  return BigInt.fromString(res)
}