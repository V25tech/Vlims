using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vlims.Administration.Entities
{
    public class UserLogin
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class UserModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }

    public class UserConstants
    {
        public static List<UserModel> Users = new()
            {
                    new UserModel(){ Username="rst",Password="rst",Role="Admin"}
            };
    }
}
