import {
  hashCapacity,
  hashNToMNoPad,
  hashPad,
  hashNoPad,
  twoToOne,
} from "./hash";

import { Poseidon2Goldilocks12 } from "./instance";

const F = Poseidon2Goldilocks12.primeField;
const permute = Poseidon2Goldilocks12.permute.bind(Poseidon2Goldilocks12);

export {
  Poseidon2Goldilocks12,
  F,
  permute,
  hashCapacity,
  hashNToMNoPad,
  hashPad,
  hashNoPad,
  twoToOne,
};
