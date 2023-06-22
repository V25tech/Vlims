//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Vlims.Services
{
    using System;
    using System.Text;
    using System.IO;
    using System.Linq;
    using System.Data;
    using System.Collections.Generic;
    using Vlims.Entities.Common;
    using Vlims.Entities;




    // Comment
    public interface IUserGroupConfigurationService
    {
        
        ResponseContext<UserGroupConfiguration> GetAllUserGroupConfiguration(RequestContext requestContext);
        
        UserGroupConfiguration GetUserGroupConfigurationByUgcid(string ugcid);
        
        bool SaveUserGroupConfiguration(UserGroupConfiguration userGroupConfiguration);
        
        bool UpdateUserGroupConfiguration(UserGroupConfiguration userGroupConfiguration);
        
        bool DeleteUserGroupConfigurationByUgcid(string ugcid);
        
        bool DeleteAllUserGroupConfiguration(List<int> ugcids);
        
        List<UserGroupConfiguration> GetUserGroupConfigurationByUserManagementId(System.Int32? uMId);
        
        bool DeleteUserGroupConfigurationByUserManagementId(System.Int32? uMId);
    }
}
