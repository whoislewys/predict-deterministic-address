## Predict Deterministic Address
Minimal JavaScript version of [Clones.predictDeterministicAddress](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/a6b8366980d8b28cbe4be7f1798719f0fac4cac1/contracts/proxy/Clones.sol#L61) from OpenZeppelin

## Usage
Installation:
```bash
npm i viem predict-deterministic-address
```

Usage:
```
import { predictDeterministicAddress } from '@whoislewys/predict-deterministic-address';
import { zeroAddress } from 'viem';

// Mock values for implementation, salt, and deployer
const implementation = zeroAddress;
const salt = 69n;
const deployer = zeroAddress;

const predictedAddress = predictDeterministicAddress(implementation, salt, deployer);
```
