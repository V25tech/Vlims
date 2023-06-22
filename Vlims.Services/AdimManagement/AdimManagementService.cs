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
    
    
    using PolicySummary.Sheet1.Data;
    using Vlims.Entities.Common;
    using Vlims.Entities;


    // Comment
    public class AdimManagementService : IAdimManagementService
    {
        
        private readonly IAdimManagementData adimManagementData;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="adimManagementData"></param>
        public AdimManagementService(IAdimManagementData adimManagementData)
        {
            this.adimManagementData = adimManagementData;
        }
        
        public ResponseContext<AdimManagement> GetAllAdimManagement(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = adimManagementData.GetAllAdimManagement(requestContext);
                List<AdimManagement> result = AdimManagementConverter.SetAllAdimManagement(dataset);
                return new ResponseContext<AdimManagement>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public AdimManagement GetAdimManagementByAMId(string aMId)
        {
            try
            {
                DataSet dataset = adimManagementData.GetAdimManagementByAMId(aMId);
                AdimManagement result = AdimManagementConverter.SetAdimManagement(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool SaveAdimManagement(AdimManagement adimManagement)
        {
            try
            {
                String validationMessages = AdimManagementValidator.IsValidAdimManagement(adimManagement);
                if (validationMessages.Length <= 0)
                {
                    var result = adimManagementData.SaveAdimManagement(adimManagement);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool UpdateAdimManagement(AdimManagement adimManagement)
        {
            try
            {
                String validationMessages = AdimManagementValidator.IsValidAdimManagement(adimManagement);
                if (validationMessages.Length <= 0)
                {
                    bool result = adimManagementData.UpdateAdimManagement(adimManagement);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteAdimManagementByAMId(string aMId)
        {
            try
            {
                return adimManagementData.DeleteAdimManagementByAMId(aMId);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteAllAdimManagement(List<int> aMIds)
        {
            try
            {
                return adimManagementData.DeleteAllAdimManagement(aMIds);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
