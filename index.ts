import type { Address, Hex } from 'viem'
import { encodePacked, getAddress, keccak256, toBytes } from 'viem'

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
