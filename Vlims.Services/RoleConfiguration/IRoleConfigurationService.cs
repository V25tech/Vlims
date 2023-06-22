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
    public interface IRoleConfigurationService
    {
        
        ResponseContext<RoleConfiguration> GetAllRoleConfiguration(RequestContext requestContext);
        
        RoleConfiguration GetRoleConfigurationByROCFId(string rOCFId);
        
        bool SaveRoleConfiguration(RoleConfiguration roleConfiguration);
        
        bool UpdateRoleConfiguration(RoleConfiguration roleConfiguration);
        
        bool DeleteRoleConfigurationByROCFId(string rOCFId);
        
        bool DeleteAllRoleConfiguration(List<int> rOCFIds);
        
        List<RoleConfiguration> GetRoleConfigurationByHierarchyManagementId(System.Int32? hMId);
        
        bool DeleteRoleConfigurationByHierarchyManagementId(System.Int32? hMId);
    }
}
