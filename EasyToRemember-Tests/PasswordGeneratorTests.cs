using System.Linq;
using EasyToRememberPwd_WebApi;
using NUnit.Framework;

namespace Tests
{
    public class PasswordGeneratorTests
    {
        [Test]
        public void Test_Verbs()
        {
            var symbols = "!@#$%^&*".ToCharArray();

            var generator = new PasswordGenerator(12, true, true, symbols);
            var password = generator.Generate();

            Assert.IsTrue(password.Length >= 12);
            Assert.IsTrue(password.Any(char.IsDigit));
            Assert.IsTrue(password.Any(symbols.Contains));
        }
    }
}