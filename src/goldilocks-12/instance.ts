import { F1Field } from "../core/F1Field";
import { Poseidon2 } from "../core/Poseidon2";
import { getPoseidon2Params } from "../core/Poseidon2Params";
import { MAT_DIAG12_M_1, MAT_INTERNAL12, RC12 } from "./constants";

const goldilocksField = new F1Field(BigInt("18446744069414584321"));

const Poseidon2Goldilocks12 = new Poseidon2(
  getPoseidon2Params(12, 7, 8, 22, MAT_DIAG12_M_1, MAT_INTERNAL12, RC12),
  goldilocksField
);
export { Poseidon2Goldilocks12 };
