import type { Address, Hex } from 'viem'
import { encodePacked, getAddress, keccak256, toBytes, toRlp } from 'viem'

// Adapted from https://github.com/LuKks/predict-deterministic-address/
// moved from using '@noble/hashes/sha3' for cryptography to viem

const PROXY_START = '0x3d602d80600a3d3981f3363d3d373d3d3d363d73'
const PROXY_END = '5af43d82803e903d91602b57fd5bf3'

export function predictDeterministicAddress(
  implementation: Address,
  salt: Hex,
  deployer: Address,
  virtualMachine?: string,
) {
  const creationCode = PROXY_START + removeHexStart(implementation).toLowerCase() + PROXY_END
  const bytecode = keccak256(toBytes(creationCode))
  const vm = getVM(virtualMachine)

  const concatenatedHex = `0x${[vm, deployer, salt, bytecode].map(removeHexStart).join('')}`
  const hash = keccak256(toBytes(concatenatedHex))
  return getAddress(`0x${hash.slice(-40)}`)
}

function getVM(vm?: string) {
  if (!vm || vm === 'EVM') return 'ff' // Ethereum
  // Note: Disabled for now, checksum address needs to be compatible with Tron
  // if (vm === 'TVM') return '41' // Tron
  throw new Error('Invalid virtual machine code')
}

function removeHexStart(value: Hex | string): string {
  if (value.startsWith('0x')) return value.slice(2)
  return value
}


/**
 * Predicts the address of a contract deployed via CREATE3.
 * The address creation formula is: keccak256(rlp([keccak256(0xff ++ address(this) ++ _salt ++ keccak256(childBytecode))[12:], 0x01]))
 */
export function predictCreate3Address(
  deployer: Address,
  salt: Hex,
): Address {
  const create3ProxyBytecodeHash = "0x21c35dbe1b344a2488cf3321d6ce542f8e9f305544ff09e4993a62319a497c1f" // aka childBytecode

  // keccak256(0xff ++ address(this) ++ _salt ++ keccak256(childBytecode))
  const proxyHash = keccak256(
    `0x${['ff', removeHexStart(deployer), removeHexStart(salt), removeHexStart(create3ProxyBytecodeHash)].join('')}`
  )

  const proxy = getAddress(`0x${proxyHash.slice(-40)}`)

  const finalHash = keccak256(toRlp([proxy, '0x01']))

  return getAddress(`0x${finalHash.slice(-40)}`)
}
