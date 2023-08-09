//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PolicySummary.Sheet1.Services
{
    using System;
    using System.Text;
    using System.IO;
    using System.Linq;
    using System.Data;
    using System.Collections.Generic;

    using Vlims.Administration.Entities;
    using Vlims.Administration.DataAccess;
    using Vlims.Common;
    using Vlims.Administration.Manager;


    // Comment
    public class UserConfigurationService : IUserConfigurationService
    {


        public ResponseContext<UserConfiguration> GetAllUserConfiguration(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = UserConfigurationData.GetAllUserConfiguration(requestContext);
                List<UserConfiguration> result = UserConfigurationConverter.SetAllUserConfiguration(dataset);
                return new ResponseContext<UserConfiguration>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public UserConfiguration GetUserConfigurationByUCFId(int uCFId)
        {
            try
            {
                DataSet dataset = UserConfigurationData.GetUserConfigurationByUCFId(uCFId);
                UserConfiguration result = UserConfigurationConverter.SetUserConfiguration(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool SaveUserConfiguration(UserConfiguration userConfiguration)
        {
            try
            {
                userConfiguration.UserManagementID = "1";

                String validationMessages = UserConfigurationValidator.IsValidUserConfiguration(userConfiguration);
                if (validationMessages.Length <= 0)
                {
                    var result = UserConfigurationData.SaveUserConfiguration(userConfiguration);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool SaveApprovalConfiguration(ApprovalConfiguration ApprovalConfiguration)
        {
            try
            {
                //ApprovalConfiguration.DocTempNoOfApprovals = "1";
                var result = UserConfigurationData.SaveApprovalConfiguration(ApprovalConfiguration);
                return result;


            }
            catch (System.Exception ex)
            {
                throw;
            }
        }


        public ApprovalConfiguration GetAllApprovalConfiguration(RequestContext requestContext)
        {
            ApprovalConfiguration approvalConfiguration = null;
            try
            {
                approvalConfiguration = new ApprovalConfiguration();
                DataSet dataset = UserConfigurationData.GetApprovalConfiguration(requestContext);
                if (dataset != null && dataset.Tables[0] != null && dataset.Tables[0].Rows.Count > 0)
                {
                    approvalConfiguration.DocTempNoOfApprovals = dataset.Tables[0].Rows[0]["DocTempNoOfApprovals"].ToString();
                    approvalConfiguration.DocTypeNoOfApprovals = dataset.Tables[0].Rows[0]["DocTypeNoOfApprovals"].ToString();
                    approvalConfiguration.WFlowNoOfApprovals = dataset.Tables[0].Rows[0]["WFlowNoOfApprovals"].ToString();
                }
                return approvalConfiguration;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }





        public bool UpdateUserConfiguration(UserConfiguration userConfiguration)
        {
            try
            {
                String validationMessages = UserConfigurationValidator.IsValidUserConfiguration(userConfiguration);
                if (validationMessages.Length <= 0)
                {
                    bool result = UserConfigurationData.UpdateUserConfiguration(userConfiguration);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteUserConfigurationByUCFId(string uCFId)
        {
            try
            {
                return UserConfigurationData.DeleteUserConfigurationByUCFId(uCFId);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteAllUserConfiguration(List<int> uCFIds)
        {
            try
            {
                return UserConfigurationData.DeleteAllUserConfiguration(uCFIds);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public List<UserConfiguration> GetUserConfigurationByUserManagementId(System.Int32? uMId)
        {
            try
            {
                DataSet dataset = UserConfigurationData.GetUserConfigurationByUserManagementId(uMId);
                List<UserConfiguration> result = UserConfigurationConverter.SetAllUserConfiguration(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteUserConfigurationByUserManagementId(System.Int32? uMId)
        {
            try
            {
                return UserConfigurationData.DeleteUserConfigurationByUserManagementId(uMId);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
