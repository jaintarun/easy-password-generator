using System.Globalization;
using EasyToRemember.Cryptography;

namespace EasyToRememberPwd_WebApi
{
    public class PasswordGenerator
    {
        private readonly bool _addNumbers;
        private readonly bool _addSymbols;
        private readonly int _minimumLength;

        private readonly CryptoRandom _randomNumGenerator = new CryptoRandom();
        private readonly char[] _symbols;

        public PasswordGenerator(int minimumLength, bool addNumbers, bool addSymbols, char[] symbols)
        {
            _minimumLength = minimumLength;

            if (_minimumLength < 8)
            {
                _minimumLength = 8;
            }

            _addNumbers = addNumbers;
            _addSymbols = addSymbols;
            _symbols = symbols;
        }

        public string Generate()
        {
            string randomNumber = string.Empty;
            if (_addNumbers)
            {
                int maxNumber = _minimumLength <= 8 ? 10 : 100;
                randomNumber = _randomNumGenerator.Next(1, maxNumber).ToString();
            }

            string symbol = string.Empty;
            if (_addSymbols)
            {
                symbol = _symbols[_randomNumGenerator.Next(0, _symbols.Length)].ToString();
            }

            (int firstWordLen, int secondWordLen) = GetWordLengths(randomNumber.Length, symbol.Length);

            string firstWord = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(new Adjectives().GetRandom(firstWordLen));
            string secondWord = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(new Nouns().GetRandom(firstWordLen));

            return $"{firstWord}{secondWord}{randomNumber}{symbol}";
        }


        private (int firstWordLen, int secondWordLen) GetWordLengths(int randomNumberLength, int symbolLength)
        {
            int newMinLen = _minimumLength - randomNumberLength - symbolLength;

            int randNewLen = _randomNumGenerator.Next(newMinLen, newMinLen + 2);

            int toReturn1 = randNewLen / 2;
            int toReturn2 = randNewLen - toReturn1;

            return (toReturn1, toReturn2);
        }
    }
}