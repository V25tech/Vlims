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
    using PolicySummary.Common.Entities;
    using PolicySummary.Sheet1.Entities;
    using PolicySummary.Sheet1.Data;
    
    
    // Comment
    public class SecurityManagementService : ISecurityManagementService
    {
        
        private readonly ISecurityManagementData securityManagementData;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="securityManagementData"></param>
        public SecurityManagementService(ISecurityManagementData securityManagementData)
        {
            this.securityManagementData = securityManagementData;
        }
        
        public ResponseContext<SecurityManagement> GetAllSecurityManagement(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = securityManagementData.GetAllSecurityManagement(requestContext);
                List<SecurityManagement> result = SecurityManagementConverter.SetAllSecurityManagement(dataset);
                return new ResponseContext<SecurityManagement>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public SecurityManagement GetSecurityManagementBySMId(string sMId)
        {
            try
            {
                DataSet dataset = securityManagementData.GetSecurityManagementBySMId(sMId);
                SecurityManagement result = SecurityManagementConverter.SetSecurityManagement(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool SaveSecurityManagement(SecurityManagement securityManagement)
        {
            try
            {
                String validationMessages = SecurityManagementValidator.IsValidSecurityManagement(securityManagement);
                if (validationMessages.Length <= 0)
                {
                    var result = securityManagementData.SaveSecurityManagement(securityManagement);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool UpdateSecurityManagement(SecurityManagement securityManagement)
        {
            try
            {
                String validationMessages = SecurityManagementValidator.IsValidSecurityManagement(securityManagement);
                if (validationMessages.Length <= 0)
                {
                    bool result = securityManagementData.UpdateSecurityManagement(securityManagement);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteSecurityManagementBySMId(string sMId)
        {
            try
            {
                return securityManagementData.DeleteSecurityManagementBySMId(sMId);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteAllSecurityManagement(List<int> sMIds)
        {
            try
            {
                return securityManagementData.DeleteAllSecurityManagement(sMIds);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
