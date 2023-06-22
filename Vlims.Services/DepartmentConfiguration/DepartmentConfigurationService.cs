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
    public class DepartmentConfigurationService : IDepartmentConfigurationService
    {
        
        private readonly IDepartmentConfigurationData departmentConfigurationData;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="departmentConfigurationData"></param>
        public DepartmentConfigurationService(IDepartmentConfigurationData departmentConfigurationData)
        {
            this.departmentConfigurationData = departmentConfigurationData;
        }
        
        public ResponseContext<DepartmentConfiguration> GetAllDepartmentConfiguration(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = departmentConfigurationData.GetAllDepartmentConfiguration(requestContext);
                List<DepartmentConfiguration> result = DepartmentConfigurationConverter.SetAllDepartmentConfiguration(dataset);
                return new ResponseContext<DepartmentConfiguration>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public DepartmentConfiguration GetDepartmentConfigurationByDPCFId(string dPCFId)
        {
            try
            {
                DataSet dataset = departmentConfigurationData.GetDepartmentConfigurationByDPCFId(dPCFId);
                DepartmentConfiguration result = DepartmentConfigurationConverter.SetDepartmentConfiguration(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool SaveDepartmentConfiguration(DepartmentConfiguration departmentConfiguration)
        {
            try
            {
                String validationMessages = DepartmentConfigurationValidator.IsValidDepartmentConfiguration(departmentConfiguration);
                if (validationMessages.Length <= 0)
                {
                    var result = departmentConfigurationData.SaveDepartmentConfiguration(departmentConfiguration);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool UpdateDepartmentConfiguration(DepartmentConfiguration departmentConfiguration)
        {
            try
            {
                String validationMessages = DepartmentConfigurationValidator.IsValidDepartmentConfiguration(departmentConfiguration);
                if (validationMessages.Length <= 0)
                {
                    bool result = departmentConfigurationData.UpdateDepartmentConfiguration(departmentConfiguration);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteDepartmentConfigurationByDPCFId(string dPCFId)
        {
            try
            {
                return departmentConfigurationData.DeleteDepartmentConfigurationByDPCFId(dPCFId);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteAllDepartmentConfiguration(List<int> dPCFIds)
        {
            try
            {
                return departmentConfigurationData.DeleteAllDepartmentConfiguration(dPCFIds);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public List<DepartmentConfiguration> GetDepartmentConfigurationByHierarchyManagementId(System.Int32? hMId)
        {
            try
            {
                DataSet dataset = departmentConfigurationData.GetDepartmentConfigurationByHierarchyManagementId(hMId);
                List<DepartmentConfiguration> result = DepartmentConfigurationConverter.SetAllDepartmentConfiguration(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteDepartmentConfigurationByHierarchyManagementId(System.Int32? hMId)
        {
            try
            {
                return departmentConfigurationData.DeleteDepartmentConfigurationByHierarchyManagementId(hMId);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
