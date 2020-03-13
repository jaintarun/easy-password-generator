using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace EasyToRememberPwd_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class GetPasswordController : ControllerBase
    {
        [HttpGet]
        [EnableCors("AllowAll")]
        public ActionResult<string> Get(int minLen = 11, bool numbers = true, bool addSymbols = true,
            string symbols = "!@#$%^&*")
        {
            var pwdGenerator = new PasswordGenerator(minLen, numbers, addSymbols, symbols.ToCharArray());
            return pwdGenerator.Generate();
        }
    }
}