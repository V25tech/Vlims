//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Vlims.Administration.Manager
{
    using System;
    using System.Data;
    using System.Collections.Generic;
    using Vlims.Administration.Entities;
    using Vlims.Administration.DataAccess;
    using Vlims.Common;
    using Vlims.Administration.Manager;


    // Comment
    public class RoleConfigurationService : IRoleConfigurationService
    {



        public ResponseContext<RoleConfiguration> GetAllRoleConfiguration(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = RoleConfigurationData.GetAllRoleConfiguration(requestContext);
                List<RoleConfiguration> result = RoleConfigurationConverter.SetAllRoleConfiguration(dataset);
                return new ResponseContext<RoleConfiguration>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public RoleConfiguration GetRoleConfigurationByROCFId(string rOCFId)
        {
            try
            {
                DataSet dataset = RoleConfigurationData.GetRoleConfigurationByROCFId(rOCFId);
                RoleConfiguration result = RoleConfigurationConverter.SetRoleConfiguration(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool SaveRoleConfiguration(RoleConfiguration roleConfiguration)
        {
            try
            {
                roleConfiguration.HierarchyManagementId = "1";
                
                String validationMessages = RoleConfigurationValidator.IsValidRoleConfiguration(roleConfiguration);
                if (validationMessages.Length <= 0)
                {
                    var result = RoleConfigurationData.SaveRoleConfiguration(roleConfiguration);
                    roleConfiguration.CreatedDate = DateTime.Now;
                    AuditLog.SaveAuditLog(new AuditLogEntity { UserName = roleConfiguration.CreatedBy, EntityName = roleConfiguration.Role, Type = RoleConfigurationConstants.RoleType, state = DefinitionStatus.New, EntityInfo = roleConfiguration, Unique = roleConfiguration.Comments });
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool UpdateRoleConfiguration(RoleConfiguration roleConfiguration)
        {
            try
            {
                String validationMessages = RoleConfigurationValidator.IsValidRoleConfiguration(roleConfiguration);
                if (validationMessages.Length <= 0)
                {
                    bool result = RoleConfigurationData.UpdateRoleConfiguration(roleConfiguration);
                    roleConfiguration.CreatedDate = DateTime.Now;
                    AuditLog.SaveAuditLog(new AuditLogEntity { UserName = roleConfiguration.CreatedBy, EntityName = roleConfiguration.Role, Type = RoleConfigurationConstants.RoleType, state = DefinitionStatus.Modify, EntityInfo = roleConfiguration, Unique = roleConfiguration.Comments });
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteRoleConfigurationByROCFId(string rOCFId)
        {
            try
            {
                return RoleConfigurationData.DeleteRoleConfigurationByROCFId(rOCFId);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteAllRoleConfiguration(List<int> rOCFIds)
        {
            try
            {
                return RoleConfigurationData.DeleteAllRoleConfiguration(rOCFIds);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public List<RoleConfiguration> GetRoleConfigurationByHierarchyManagementId(System.Int32? hMId)
        {
            try
            {
                DataSet dataset = RoleConfigurationData.GetRoleConfigurationByHierarchyManagementId(hMId);
                List<RoleConfiguration> result = RoleConfigurationConverter.SetAllRoleConfiguration(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteRoleConfigurationByHierarchyManagementId(System.Int32? hMId)
        {
            try
            {
                return RoleConfigurationData.DeleteRoleConfigurationByHierarchyManagementId(hMId);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
