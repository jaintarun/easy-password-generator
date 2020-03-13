using System.Collections.Generic;
using System.IO;
using System.Linq;
using EasyToRemember.Cryptography;

namespace EasyToRememberPwd_WebApi
{
    public abstract class WordType
    {
        private static readonly Dictionary<int, List<string>> _wordsByLength = new Dictionary<int, List<string>>();
        private readonly CryptoRandom _randomNumGenerator = new CryptoRandom();

        protected WordType()
        {
            if (_wordsByLength.Count == 0)
            {
                Initialize();
            }
        }

        public string GetRandom(int length)
        {
            List<string> words = _wordsByLength[length];
            return words[_randomNumGenerator.Next(0, words.Count)].ToLower();
        }

        public abstract void Initialize();

        protected void BaseInitialize(string fileName)
        {
            List<string> words = File.ReadAllLines("data\\" + fileName).ToList();

            words.ForEach(word =>
            {
                string tempWord = word.Trim();

                if (_wordsByLength.TryGetValue(tempWord.Length, out List<string> wordList))
                {
                    wordList.Add(tempWord);
                }
                else
                {
                    _wordsByLength.Add(tempWord.Length, new List<string>(new[] {tempWord}));
                }
            });
        }
    }
}