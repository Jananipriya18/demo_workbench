// using CommonLibrary.Models;


// namespace dotnetapp.Services
// {
//     public interface IAuthService
//     {
//         Task<(int, string)> Registration(User model, string role);
//         Task<(int, string)> Login(LoginModel model);
//     }
// }

using CommonLibrary.Models;

namespace dotnetapp.Services
{
    public interface IAuthService
    {
        Task<(int status, string token, User user)> Login(LoginModel model);
        Task<(int status, string message)> Registration(User model, string role);
    }
}
