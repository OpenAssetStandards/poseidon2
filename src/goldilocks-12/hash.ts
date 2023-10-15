type IHashOut = [bigint, bigint, bigint, bigint];

import { Poseidon2Goldilocks12 } from "./instance";

const SPONGE_RATE = 8;
const SPONGE_WIDTH = 12;
const ZERO = BigInt(0);
const F = Poseidon2Goldilocks12.primeField;
function hashNToMNoPad(
  inputs: bigint[] | BigUint64Array,
  numOutputs: number
): bigint[] {
  const inputsLength = inputs.length;

  let state: bigint[] = [
    ZERO,
    ZERO,
    ZERO,
    ZERO,
    ZERO,
    ZERO,
    ZERO,
    ZERO,
    ZERO,
    ZERO,
    ZERO,
    ZERO,
  ];
  const nChunks = Math.floor(inputsLength / SPONGE_RATE);
  for (let i = 0; i < nChunks; i++) {
    state[0] = F.e(inputs[i * 8]);
    state[1] = F.e(inputs[i * 8 + 1]);
    state[2] = F.e(inputs[i * 8 + 2]);
    state[3] = F.e(inputs[i * 8 + 3]);
    state[4] = F.e(inputs[i * 8 + 4]);
    state[5] = F.e(inputs[i * 8 + 5]);
    state[6] = F.e(inputs[i * 8 + 6]);
    state[7] = F.e(inputs[i * 8 + 7]);
    const n_state = Poseidon2Goldilocks12.permute(state);
    state[0] = n_state[0];
    state[1] = n_state[1];
    state[2] = n_state[2];
    state[3] = n_state[3];
    state[4] = n_state[4];
    state[5] = n_state[5];
    state[6] = n_state[6];
    state[7] = n_state[7];
    state[8] = n_state[8];
    state[9] = n_state[9];
    state[10] = n_state[10];
    state[11] = n_state[11];
  }
  const start = nChunks * SPONGE_RATE;
  const remaining = inputsLength - start;
  if (remaining > 0 && remaining < state.length) {
    for (let i = 0; i < remaining; i++) {
      state[i] = F.e(inputs[start + i]);
    }
    const n_state = Poseidon2Goldilocks12.permute(state);
    state[0] = n_state[0];
    state[1] = n_state[1];
    state[2] = n_state[2];
    state[3] = n_state[3];
    state[4] = n_state[4];
    state[5] = n_state[5];
    state[6] = n_state[6];
    state[7] = n_state[7];
    state[8] = n_state[8];
    state[9] = n_state[9];
    state[10] = n_state[10];
    state[11] = n_state[11];
  }
  if (numOutputs === 4) {
    return [state[0], state[1], state[2], state[3]];
  }
  const outputs: bigint[] = [];
  const nOutputRounds = Math.ceil(numOutputs / SPONGE_RATE);
  let outputsPushed = 0;
  for (let i = 0; i < nOutputRounds; i++) {
    for (let x = 0; x < SPONGE_RATE && outputsPushed < numOutputs; x++) {
      outputs.push(state[x]);
      outputsPushed++;
    }
    state = Poseidon2Goldilocks12.permute(state);
  }
  return outputs;
}
function hashPad(input: bigint[]) {
  const paddedInput = input.concat([]);
  paddedInput.push(BigInt(1));
  while ((paddedInput.length + 1) % SPONGE_WIDTH !== 0) {
    paddedInput.push(ZERO);
  }
  paddedInput.push(BigInt(1));
  return hashNToMNoPad(paddedInput, 4).slice(0, 4);
}
function hashNoPad(input: bigint[] | BigUint64Array): IHashOut {
  const output = hashNToMNoPad(input, 4);
  return [output[0], output[1], output[2], output[3]];
}
function hashCapacity(inputs: bigint[], capacity: bigint[]) {
  if (Array.isArray(capacity)) {
    return Poseidon2Goldilocks12.permute(
      inputs.concat(capacity).map(x => F.e(x) as any)
    ).slice(0, 4);
  } else {
    return Poseidon2Goldilocks12.permute(
      inputs.map(x => F.e(x) as any).concat([ZERO, ZERO, ZERO, ZERO])
    ).slice(0, 4);
  }
}
function twoToOne(a: IHashOut, b: IHashOut) {
  return hashNoPad([a[0], a[1], a[2], a[3], b[0], b[1], b[2], b[3]]);
}
const permute = Poseidon2Goldilocks12.permute.bind(Poseidon2Goldilocks12);

export {
  F,
  permute,
  hashCapacity,
  hashNToMNoPad,
  hashPad,
  hashNoPad,
  twoToOne,
};
export type { IHashOut };
