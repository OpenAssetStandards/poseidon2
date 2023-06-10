import { describe, expect, it } from "vitest";
import { Poseidon2Goldilocks12 } from "../src/goldilocks-12";

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
      BigInt("4676078130971295920"),
      BigInt("10183258696855793571"),
      BigInt("15600641847707049561"),
      BigInt("6602041563876587060"),
      BigInt("13137619883760816643"),
      BigInt("8849590418944608963"),
      BigInt("10998040560159952847"),
      BigInt("15206271513183927451"),
      BigInt("5975958540203922369"),
      BigInt("15926261106117560013"),
      BigInt("17396220699479397239"),
      BigInt("16744530920792852206"),
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
      BigInt("17095027314848075059"),
      BigInt("18124150414442078544"),
      BigInt("15284687323142546159"),
      BigInt("6784844296492226711"),
      BigInt("4870838776976620139"),
      BigInt("6222185298486530077"),
      BigInt("16450947849879353518"),
      BigInt("643974238185471420"),
      BigInt("2975392058905691406"),
      BigInt("11609261642319894788"),
      BigInt("11999098011033569640"),
      BigInt("1713291167031093441"),
    ]);
  });
});
