namespace EasyToRememberPwd_WebApi
{
    public sealed class Adjectives : WordType
    {
        private const string _fileName = "adjective.txt";

        public override void Initialize()
        {
            BaseInitialize(_fileName);
        }
    }
}