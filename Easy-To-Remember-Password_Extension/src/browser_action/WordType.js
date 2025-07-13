class WordType {
  constructor() {
    this.wordsByLength = {};
    this.randomGenerator = new CryptoRandom();

    if (Object.keys(this.wordsByLength).length === 0) {
      this.initialize();
    }
  }

  getRandom(length) {
    if (
      !this.wordsByLength[length] ||
      this.wordsByLength[length].length === 0
    ) {
      return "";
    }

    const words = this.wordsByLength[length];
    const randomIndex = this.randomGenerator.next(0, words.length);
    return words[randomIndex].toLowerCase();
  }

  initialize() {
    throw new Error("Initialize method must be implemented by subclass");
  }

  baseInitialize(words) {
    words.forEach((word) => {
      const trimmedWord = word.trim();
      const length = trimmedWord.length;

      if (this.wordsByLength[length]) {
        this.wordsByLength[length].push(trimmedWord);
      } else {
        this.wordsByLength[length] = [trimmedWord];
      }
    });
  }
}
