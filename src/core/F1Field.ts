class F1Field {
  prime: bigint;
  zero = BigInt(0);
  one = BigInt(1);
  constructor(prime: bigint) {
    this.prime = prime;
  }
  e(x: number | bigint | string) {
    if (typeof x === "bigint") {
      return x % this.prime;
    } else {
      return BigInt(x) % this.prime;
    }
  }
  add(x: bigint, y: bigint) {
    return (x + y) % this.prime;
  }
  sub(x: bigint, y: bigint) {
    return (this.prime + x - y) % this.prime;
  }
  mul(x: bigint, y: bigint) {
    return (x * y) % this.prime;
  }
  square(x: bigint) {
    return (x * x) % this.prime;
  }
  div(x: bigint, y: bigint) {
    return (x / y) % this.prime;
  }
}

export { F1Field };
