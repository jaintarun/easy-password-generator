namespace EasyToRememberPwd_WebApi
{
    public sealed class Adverbs : WordType
    {
        private const string _fileName = "adverb.txt";

        public override void Initialize()
        {
            BaseInitialize(_fileName);
        }
    }
}