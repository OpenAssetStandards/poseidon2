<a name="readme-top"></a>
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">poseidon2</h1>
  <p align="center">
A zero dependency implementation of the <a href="https://eprint.iacr.org/2023/323.pdf">Poseidon2</a> hash function.
The permutation function exposed by the Poseidon2 class is one-to-one compatible with <a href="https://github.com/HorizenLabs/poseidon2/blob/main/plain_implementations/src/poseidon2/poseidon2.rs">HorizenLabs/poseidon2</a>. 3kb gzipped 🎉
  </p>
</div>

# Install

```bash
npm install poseidon2
```

#### Note For TypeScript Users:

If you see the error "Cannot find module 'poseidon2/goldilocks-12' or its corresponding type declarations.ts(2307)", update your tsconfig.json to set "moduleResolution": "NodeNext".

## Usage For Goldilocks Field, T = 12

### Permute

```javascript
import { permute } from "poseidon2/goldilocks-12";
const result = permute([
  1337n,
  123456n,
  100n,
  15n,
  1n,
  2n,
  3n,
  4n,
  22n,
  23n,
  24n,
  25n,
]);
```

### Two to One (Hash two 4-element-wide values)

```javascript
import { twoToOne } from "poseidon2/goldilocks-12";
const result = twoToOne([1337n, 123456n, 100n, 15n], [1n, 2n, 3n, 4n]);
```

### Sponge Hash with Pad (Hash n elements with padding)

```javascript
import { hashPad } from "poseidon2/goldilocks-12";
const result = hashPad([1n, 2n, 3n, 1337n, 9999n, 123n]);
```

## How to use with other prime fields/t values

See [Working with other prime fields and t values](./CUSTOM_FIELD_T.md).

## Credits

Original implementation of poseidon2 by https://github.com/HorizenLabs

# License

MIT License

Copyright (c) 2023 Zero Knowledge Labs Limited

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/OpenAssetStandards/poseidon2.svg?style=for-the-badge
[contributors-url]: https://github.com/OpenAssetStandards/poseidon2/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/OpenAssetStandards/poseidon2.svg?style=for-the-badge
[forks-url]: https://github.com/OpenAssetStandards/poseidon2/network/members
[stars-shield]: https://img.shields.io/github/stars/OpenAssetStandards/poseidon2.svg?style=for-the-badge
[stars-url]: https://github.com/OpenAssetStandards/poseidon2/stargazers
[issues-shield]: https://img.shields.io/github/issues/OpenAssetStandards/poseidon2.svg?style=for-the-badge
[issues-url]: https://github.com/OpenAssetStandards/poseidon2/issues
