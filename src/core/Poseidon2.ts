import { F1Field } from "./F1Field";
import type { Poseidon2Params } from "./Poseidon2Params";

class Poseidon2 {
  params: Poseidon2Params;
  primeField: F1Field;
  constructor(params: Poseidon2Params, primeField: F1Field) {
    this.params = params;
    this.primeField = primeField;
  }
  getT() {
    return this.params.t;
  }
  sbox(input: bigint[]): bigint[] {
    return input.map((x: bigint) => this.sboxP(x));
  }
  sboxP(input: bigint): bigint {
    const input2 = this.primeField.square(input);
    if (this.params.d == 3) {
      return this.primeField.mul(input2, input);
    } else if (this.params.d == 5) {
      return this.primeField.mul(this.primeField.square(input2), input);
    } else if (this.params.d == 7) {
      return this.primeField.mul(
        this.primeField.square(input2),
        this.primeField.mul(input2, input)
      );
    } else {
      throw new Error("Invalid d paramter, must be 3, 5 or 7");
    }
  }
  matmulExternal(input: bigint[]): bigint[] {
    const t = this.params.t;
    if (t == 2) {
      const sum = this.primeField.add(input[0], input[1]);
      input[0] = this.primeField.add(input[0], sum);
      input[1] = this.primeField.add(input[1], sum);
    } else if (t == 3) {
      const sum = this.primeField.add(
        this.primeField.add(input[0], input[1]),
        input[2]
      );
      input[0] = this.primeField.add(input[0], sum);
      input[1] = this.primeField.add(input[1], sum);
      input[2] = this.primeField.add(input[2], sum);
    } else if (t == 4 || t == 8 || t == 12 || t == 16 || t == 20 || t == 24) {
      const t4 = t / 4;
      for (let i = 0; i < t4; i++) {
        const startIndex = i * 4;
        let t_0 = input[startIndex];
        t_0 = this.primeField.add(t_0, input[startIndex + 1]);

        let t_1 = input[startIndex + 2];
        t_1 = this.primeField.add(t_1, input[startIndex + 3]);

        let t_2 = input[startIndex + 1];
        t_2 = this.primeField.add(t_2, t_2);
        t_2 = this.primeField.add(t_2, t_1);

        let t_3 = input[startIndex + 3];
        t_3 = this.primeField.add(t_3, t_3);
        t_3 = this.primeField.add(t_3, t_0);

        let t_4 = t_1;
        t_4 = this.primeField.add(t_4, t_4);
        t_4 = this.primeField.add(t_4, t_4);
        t_4 = this.primeField.add(t_4, t_3);

        let t_5 = t_0;
        t_5 = this.primeField.add(t_5, t_5);
        t_5 = this.primeField.add(t_5, t_5);

        t_5 = this.primeField.add(t_5, t_2);
        let t_6 = t_3;
        t_6 = this.primeField.add(t_6, t_5);

        let t_7 = t_2;
        t_7 = this.primeField.add(t_7, t_4);

        input[startIndex] = t_6;
        input[startIndex + 1] = t_5;
        input[startIndex + 2] = t_7;
        input[startIndex + 3] = t_4;
      }
      const stored = [
        this.primeField.zero,
        this.primeField.zero,
        this.primeField.zero,
        this.primeField.zero,
      ];
      for (let l = 0; l < 4; l++) {
        stored[l] = input[l];
        for (let j = 1; j < t4; j++) {
          stored[l] = this.primeField.add(stored[l], input[4 * j + l]);
        }
      }
      for (let i = 0; i < input.length; i++) {
        input[i] = this.primeField.add(input[i], stored[i % 4]);
      }
    } else {
      throw new Error(
        "Invalid t parameter, must be 2, 3, 4, 8, 12, 16, 20 or 24"
      );
    }
    return input;
  }
  matmulInternal(input: bigint[]): bigint[] {
    const t = this.params.t;
    if (t == 2) {
      const sum = this.primeField.add(input[0], input[1]);
      input[0] = this.primeField.add(input[0], sum);
      input[1] = this.primeField.add(
        this.primeField.add(input[1], input[1]),
        sum
      );
    } else if (t == 3) {
      const sum = this.primeField.add(
        this.primeField.add(input[0], input[1]),
        input[2]
      );
      input[0] = this.primeField.add(input[0], sum);
      input[1] = this.primeField.add(input[1], sum);
      input[2] = this.primeField.add(
        this.primeField.add(input[2], input[2]),
        sum
      );
    } else if (t == 4 || t == 8 || t == 12 || t == 16 || t == 20 || t == 24) {
      let sum = input[0];
      for (let i = 1; i < t; i++) {
        sum = this.primeField.add(sum, input[i]);
      }
      for (let i = 0; i < input.length; i++) {
        input[i] = this.primeField.add(
          this.primeField.mul(this.params.mat_internal_diag_m_1[i], input[i]),
          sum
        );
      }
    } else {
      throw new Error(
        "Invalid t parameter, must be 2, 3, 4, 8, 12, 16, 20 or 24"
      );
    }
    return input;
  }
  permute(input: bigint[]): bigint[] {
    const t = this.params.t;
    if (input.length != t) {
      throw new Error("Invalid input length");
    }
    let current_state = input;
    this.matmulExternal(current_state);
    for (let r = 0; r < this.params.rounds_f_beginning; r++) {
      current_state = this.addRc(current_state, this.params.round_constants[r]);
      current_state = this.sbox(current_state);
      this.matmulExternal(current_state);
    }
    const p_end = this.params.rounds_f_beginning + this.params.rounds_p;
    for (let r = this.params.rounds_f_beginning; r < p_end; r++) {
      current_state[0] = this.primeField.add(
        current_state[0],
        this.params.round_constants[r][0]
      );
      current_state[0] = this.sboxP(current_state[0]);
      this.matmulInternal(current_state);
    }
    for (let r = p_end; r < this.params.rounds; r++) {
      current_state = this.addRc(current_state, this.params.round_constants[r]);
      current_state = this.sbox(current_state);
      this.matmulExternal(current_state);
    }
    return current_state;
  }
  addRc(input: bigint[], rc: bigint[]): bigint[] {
    return input.map((a, i) => this.primeField.add(a, rc[i]));
  }
}

export { Poseidon2 };
