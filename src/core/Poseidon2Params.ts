interface Poseidon2Params {
  t: number;
  d: number;
  rounds_f_beginning: number;
  rounds_p: number;
  rounds_f_end: number;
  rounds: number;
  mat_internal_diag_m_1: bigint[];
  _mat_internal: bigint[][];
  round_constants: bigint[][];
}

function getPoseidon2Params(
  t: number,
  d: number,
  rounds_f: number,
  rounds_p: number,
  mat_internal_diag_m_1: bigint[],
  mat_internal: bigint[][],
  round_constants: bigint[][]
): Poseidon2Params {
  const r = rounds_f / 2;
  const rounds = rounds_f + rounds_p;
  return {
    t,
    d,
    rounds_f_beginning: r,
    rounds_p,
    rounds_f_end: r,
    rounds,
    mat_internal_diag_m_1: mat_internal_diag_m_1,
    _mat_internal: mat_internal,
    round_constants: round_constants,
  };
}

export type { Poseidon2Params };
export { getPoseidon2Params };
