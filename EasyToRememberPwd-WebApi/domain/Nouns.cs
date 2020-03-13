namespace EasyToRememberPwd_WebApi
{
    public sealed class Nouns : WordType
    {
        private const string _fileName = "noun.txt";

        public override void Initialize()
        {
            BaseInitialize(_fileName);
        }
    }
}