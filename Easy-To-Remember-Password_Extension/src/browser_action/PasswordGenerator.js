class PasswordGenerator {
  constructor(minimumLength, addNumbers, addSymbols, symbols) {
    this.minimumLength = minimumLength < 8 ? 8 : minimumLength;
    this.addNumbers = addNumbers;
    this.addSymbols = addSymbols;
    this.symbols = symbols;
    this.randomGenerator = new CryptoRandom();
  }

  generate() {
    let randomNumber = "";
    if (this.addNumbers) {
      const maxNumber = this.minimumLength <= 8 ? 10 : 100;
      randomNumber = this.randomGenerator.next(1, maxNumber).toString();
    }

    let symbol = "";
    if (this.addSymbols && this.symbols.length > 0) {
      const symbolIndex = this.randomGenerator.next(0, this.symbols.length);
      symbol = this.symbols[symbolIndex];
    }

    const wordLengths = this.getWordLengths(randomNumber.length, symbol.length);

    const firstWord = this.toTitleCase(
      new Adjectives().getRandom(wordLengths.firstWordLen)
    );
    const secondWord = this.toTitleCase(
      new Nouns().getRandom(wordLengths.secondWordLen)
    );

    return `${firstWord}${secondWord}${randomNumber}${symbol}`;
  }

  getWordLengths(randomNumberLength, symbolLength) {
    const newMinLen = this.minimumLength - randomNumberLength - symbolLength;
    const randNewLen = this.randomGenerator.next(newMinLen, newMinLen + 2);

    const firstWordLen = Math.floor(randNewLen / 2);
    const secondWordLen = randNewLen - firstWordLen;

    return {
      firstWordLen: firstWordLen,
      secondWordLen: secondWordLen,
    };
  }

  toTitleCase(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
