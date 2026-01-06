## Predict Deterministic Address
Minimal JavaScript implementation of Create2 and Create3 functions to predict addresses deterministically.

## Development

```
npm i
npm run test
```

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
