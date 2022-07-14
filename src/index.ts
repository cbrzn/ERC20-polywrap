import {
  Ethereum_Module,
  Ethereum_TxResponse,
  Args_name,
  Args_symbol,
  Args_decimals,
  Args_totalSupply,
  Args_balanceOf,
  Args_allowance,
  Args_transfer,
  Args_approve,
  Args_transferFrom,
  Args_increaseAllowance,
  Args_decreaseAllowance
} from "./wrap";
import { BigInt } from '@polywrap/wasm-as'

export function name(args: Args_name): string {
  return Ethereum_Module.callContractView({
    connection: args.connection,
    address: args.address,
    method: "function name() public view returns (string memory)",
    args: null
  }).unwrap()
}

export function symbol(args: Args_symbol): string {
  return Ethereum_Module.callContractView({
    connection: args.connection,
    address: args.address,
    method: "function symbol() public view returns (string memory)",
    args: null
  }).unwrap()
}

export function decimals(args: Args_decimals): i32 {
  const res = Ethereum_Module.callContractView({
    connection: args.connection,
    address: args.address,
    method: "function decimals() public view returns (uint8)",
    args: null
  }).unwrap()
  return parseInt(res) as i32
}

export function totalSupply(args: Args_totalSupply): BigInt {
  const res = Ethereum_Module.callContractView({
    connection: args.connection,
    address: args.address,
    method: "function totalSupply() public view returns (uint256)",
    args: null
  }).unwrap()
  return BigInt.fromString(res)
}

export function balanceOf(args: Args_balanceOf): BigInt {
  const res = Ethereum_Module.callContractView({
    connection: args.connection,
    address: args.address,
    method: "function balanceOf(address account) public view returns (uint256)",
    args: [args.account]
  }).unwrap()
  return BigInt.fromString(res)
}

export function allowance(args: Args_allowance): BigInt {
  const res = Ethereum_Module.callContractView({
    connection: args.connection,
    address: args.address,
    method: "function allowance(address owner, address spender) public view returns (uint256)",
    args: [args.owner, args.spender]
  }).unwrap()
  return BigInt.fromString(res)
}

export function transfer(args: Args_transfer): Ethereum_TxResponse {
  return Ethereum_Module.callContractMethod({
    connection: args.connection,
    address: args.address,
    method: "function transfer(address recipient, uint256 amount) public returns (bool)",
    args: [args.recipient, args.amount.toString()],
    txOverrides: null
  }).unwrap()
}

export function approve(args: Args_approve): Ethereum_TxResponse {
  return Ethereum_Module.callContractMethod({
    connection: args.connection,
    address: args.address,
    method: "function approve(address spender, uint256 amount) public returns (bool)",
    args: [args.spender, args.amount.toString()],
    txOverrides: null
  }).unwrap()
}

export function transferFrom(args: Args_transferFrom): Ethereum_TxResponse {
  return Ethereum_Module.callContractMethod({
    connection: args.connection,
    address: args.address,
    method: "function transferFrom(address sender, address recipient, uint256 amount) public returns (bool)",
    args: [args.sender, args.recipient, args.amount.toString()],
    txOverrides: null
  }).unwrap()
}

export function increaseAllowance(args: Args_increaseAllowance): Ethereum_TxResponse {
  return Ethereum_Module.callContractMethod({
    connection: args.connection,
    address: args.address,
    method: "function increaseAllowance(address spender, uint256 addedValue) public returns (bool)",
    args: [args.spender, args.addedValue.toString()],
    txOverrides: null
  }).unwrap()
}

export function decreaseAllowance(args: Args_decreaseAllowance): Ethereum_TxResponse {
  return Ethereum_Module.callContractMethod({
    connection: args.connection,
    address: args.address,
    method: "function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool)",
    args: [args.spender, args.subtractedValue.toString()],
    txOverrides: null
  }).unwrap()
}