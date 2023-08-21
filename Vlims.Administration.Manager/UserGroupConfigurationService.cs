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
    using System.Text;
    using System.IO;
    using System.Linq;
    using System.Data;
    using System.Collections.Generic;
    using Vlims.Common;
    using Vlims.Administration.Entities;
    using Vlims.Administration.DataAccess;
    using PolicySummary.Sheet1.Services;


    // Comment
    public class UserGroupConfigurationService : IUserGroupConfigurationService
    {



        public ResponseContext<UserGroupConfiguration> GetAllUserGroupConfiguration(RequestContext requestContext)
        {
            try
            {
                //requestContext.PageNumber = 1;
                //requestContext.PageSize= 1;
                DataSet dataset = UserGroupConfigurationData.GetAllUserGroupConfiguration(requestContext);
                List<UserGroupConfiguration> result = UserGroupConfigurationConverter.SetAllUserGroupConfiguration(dataset);
                return new ResponseContext<UserGroupConfiguration>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public UserGroupConfiguration GetUserGroupConfigurationByUgcid(string ugcid)
        {
            try
            {
                DataSet dataset = UserGroupConfigurationData.GetUserGroupConfigurationByUgcid(ugcid);
                UserGroupConfiguration result = UserGroupConfigurationConverter.SetUserGroupConfiguration(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool SaveUserGroupConfiguration(UserGroupConfiguration userGroupConfiguration)
        {
            try
            {
                userGroupConfiguration.createdBy = "manoj";
                userGroupConfiguration.modifiedBy = "manoj";
                String validationMessages = UserGroupConfigurationValidator.IsValidUserGroupConfiguration(userGroupConfiguration);
                //if (validationMessages.Length <= 0)
                //{
                var result = UserGroupConfigurationData.SaveUserGroupConfiguration(userGroupConfiguration);
                AuditLog.SaveAuditLog(new AuditLogEntity { UserName = "test", EntityName = userGroupConfiguration.usergroupname, Type = UserGroupConfigurationConstants.Usergroupname1, state = DefinitionStatus.New });
                return result;
                //}
                //throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool UpdateUserGroupConfiguration(UserGroupConfiguration userGroupConfiguration)
        {
            try
            {
                String validationMessages = UserGroupConfigurationValidator.IsValidUserGroupConfiguration(userGroupConfiguration);
                if (validationMessages.Length <= 0)
                {
                    bool result = UserGroupConfigurationData.UpdateUserGroupConfiguration(userGroupConfiguration);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteUserGroupConfigurationByUgcid(string ugcid)
        {
            try
            {
                return UserGroupConfigurationData.DeleteUserGroupConfigurationByUgcid(ugcid);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteAllUserGroupConfiguration(List<int> ugcids)
        {
            try
            {
                return UserGroupConfigurationData.DeleteAllUserGroupConfiguration(ugcids);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public List<UserGroupConfiguration> GetUserGroupConfigurationByUserManagementId(System.Int32? uMId)
        {
            try
            {
                DataSet dataset = UserGroupConfigurationData.GetUserGroupConfigurationByUserManagementId(uMId);
                List<UserGroupConfiguration> result = UserGroupConfigurationConverter.SetAllUserGroupConfiguration(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteUserGroupConfigurationByUserManagementId(System.Int32? uMId)
        {
            try
            {
                return UserGroupConfigurationData.DeleteUserGroupConfigurationByUserManagementId(uMId);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
