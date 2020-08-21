using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace MexQuiz.Controllers
{
    internal static class TokenGenerator
    { 
        public static string GenerateTokenJwt(string username,string pass,string correo,int role)
    {
        var secretKey = ConfigurationManager.AppSettings["JWT_SECRET_KEY"];
        var audienceToken = ConfigurationManager.AppSettings["JWT_AUDIENCE_TOKEN"];
        var issuerToken = ConfigurationManager.AppSettings["JWT_ISSUER_TOKEN"];
        var expireTime = ConfigurationManager.AppSettings["JWT_EXPIRE_MINUTES"];

        var securityKey = new SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(secretKey));
        var signingCredentials = new SigningCredentials(securityKey,
            SecurityAlgorithms.HmacSha256Signature);
            ////Create A ClaimsIdentity
            IList<Claim> claimCollection = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username)
                , new Claim(ClaimTypes.Gender, pass)
                , new Claim(ClaimTypes.Email,correo)
                , new Claim(ClaimTypes.Role,role.ToString())
            };
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claimCollection);

        //Create token to the user
        var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
        var jwtSeccurityToken = tokenHandler.CreateJwtSecurityToken(
            audience: audienceToken,
            issuer: issuerToken,
            subject: claimsIdentity,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddMinutes(Convert.ToInt32(expireTime)),
            signingCredentials: signingCredentials
            );
        var jwtTokenString = tokenHandler.WriteToken(jwtSeccurityToken);
        return jwtTokenString;
    }
}
    
}