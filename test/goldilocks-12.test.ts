import { describe, expect, it } from "vitest";
import { Poseidon2Goldilocks12, hashNoPad } from "../src/goldilocks-12";
describe("poseidon2 goldilocks 12", () => {
  it("permute [0,0,0,0,0,0,0,0,0,0,0,0] ", () => {
    const zero = BigInt(0);
    const state = [
      zero,
      zero,
      zero,
      zero,
      zero,
      zero,
      zero,
      zero,
      zero,
      zero,
      zero,
      zero,
    ];
    const permuteResult = Poseidon2Goldilocks12.permute(state);
    expect(permuteResult).toEqual([
      BigInt("2706484646582314364"),
      BigInt("16460758560799937193"),
      BigInt("2052063466144512209"),
      BigInt("9649607828149110866"),
      BigInt("2033662915869228037"),
      BigInt("16251664193980936151"),
      BigInt("1869425810546879860"),
      BigInt("399174958178618195"),
      BigInt("963282781129924902"),
      BigInt("348076645890865798"),
      BigInt("8513101393627905513"),
      BigInt("13429406292428034341"),
    ]);
  });
  it("permute [0,1,2,3,4,5,6,7,8,9,10,11] ", () => {
    const state = [
      BigInt(0),
      BigInt(1),
      BigInt(2),
      BigInt(3),
      BigInt(4),
      BigInt(5),
      BigInt(6),
      BigInt(7),
      BigInt(8),
      BigInt(9),
      BigInt(10),
      BigInt(11),
    ];
    const permuteResult = Poseidon2Goldilocks12.permute(state);
    expect(permuteResult).toEqual([
      BigInt("14495112113092593719"),
      BigInt("10329066293759305023"),
      BigInt("4698416604356330095"),
      BigInt("14656054275012077034"),
      BigInt("14040445052016575643"),
      BigInt("18281582380570098475"),
      BigInt("6807696650297444323"),
      BigInt("6066054412809714982"),
      BigInt("5411921328316089755"),
      BigInt("14958086802832817041"),
      BigInt("4858815946660806269"),
      BigInt("8971086601262742856"),
    ]);
  });
});
