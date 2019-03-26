using Default.Identity.Models;
using Default.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Default.Identity
{
    public interface IJwtFactory
    {
        Task<string> GenerateEncodedToken(ApplicationUser user);
        string GenerateRefreshToken();
    }

    public class JwtFactory : IJwtFactory
    {
        private readonly JwtIssuerOptions jwtOptions;
        private readonly UserManager<ApplicationUser> userManager;

        public JwtFactory(
            IOptions<JwtIssuerOptions> jwtOptions,
            UserManager<ApplicationUser> userManager)
        {
            this.jwtOptions = jwtOptions.Value;
            this.userManager = userManager;
        }

        public async Task<string> GenerateEncodedToken(ApplicationUser user)
        {
            var userClaims = await userManager.GetClaimsAsync(user);
            var customClaims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Jti, await jwtOptions.JtiGenerator()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("userId", user.Id),
            };

            // Create the JWT security token and encode it.
            var jwt = new JwtSecurityToken(
                issuer: jwtOptions.Issuer,
                audience: jwtOptions.Audience,
                claims: customClaims.Union(userClaims),
                notBefore: jwtOptions.NotBefore,
                expires: jwtOptions.Expiration,
                signingCredentials: jwtOptions.SigningCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return encodedJwt;
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }
}
