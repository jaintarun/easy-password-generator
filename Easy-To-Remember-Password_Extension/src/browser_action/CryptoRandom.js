class CryptoRandom {
  constructor() {
    this.crypto = window.crypto || window.msCrypto;
  }

  next(minValue = 0, maxValue = 2147483647) {
    if (arguments.length === 0) {
      return this.getRandomUInt32() & 0x7fffffff;
    }

    if (arguments.length === 1) {
      maxValue = minValue;
      minValue = 0;
    }

    if (minValue > maxValue) {
      throw new Error("minValue cannot be greater than maxValue");
    }

    if (minValue === maxValue) {
      return minValue;
    }

    const diff = maxValue - minValue;

    while (true) {
      const rand = this.getRandomUInt32();
      const max = 0x100000000;
      const remainder = max % diff;

      if (rand < max - remainder) {
        return minValue + (rand % diff);
      }
    }
  }

  getRandomUInt32() {
    const array = new Uint32Array(1);
    this.crypto.getRandomValues(array);
    return array[0];
  }

  nextDouble() {
    return this.getRandomUInt32() / (1.0 + 0xffffffff);
  }
}
