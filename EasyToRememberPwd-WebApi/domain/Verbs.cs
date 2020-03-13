namespace EasyToRememberPwd_WebApi
{
    public sealed class Verbs : WordType
    {
        private const string _fileName = "verb.txt";

        public override void Initialize()
        {
            BaseInitialize(_fileName);
        }
    }
}