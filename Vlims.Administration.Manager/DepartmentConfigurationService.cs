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


    using Vlims.Data;
    using Vlims.Common;
    using Vlims.Administration.Entities;
    using Vlims.Administration.DataAccess;



    // Comment
    public class DepartmentConfigurationService : IDepartmentConfigurationService
    {


        public ResponseContext<DepartmentConfiguration> GetAllDepartmentConfiguration(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = DepartmentConfigurationData.GetAllDepartmentConfiguration(requestContext);
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
                DataSet dataset = DepartmentConfigurationData.GetDepartmentConfigurationByDPCFId(dPCFId);
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
                departmentConfiguration.HierarchyManagementId = "1";
                String validationMessages = DepartmentConfigurationValidator.IsValidDepartmentConfiguration(departmentConfiguration);
                if (validationMessages.Length <= 0)
                {
                    var result = DepartmentConfigurationData.SaveDepartmentConfiguration(departmentConfiguration);
                    AuditLog.SaveAuditLog(new AuditLogEntity { UserName = departmentConfiguration.CreatedBy, EntityName = departmentConfiguration.DepartmentName, Type = DepartmentConfigurationConstants.DepartmentType, state = DefinitionStatus.New, CreatedDate = (DateTime)departmentConfiguration.CreatedDate, EntityInfo = departmentConfiguration,Unique= departmentConfiguration.DepartmentCode});
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
                    bool result = DepartmentConfigurationData.UpdateDepartmentConfiguration(departmentConfiguration);
                    AuditLog.SaveAuditLog(new AuditLogEntity { UserName = departmentConfiguration.CreatedBy, EntityName = departmentConfiguration.DepartmentName, Type = DepartmentConfigurationConstants.DepartmentType, state = DefinitionStatus.Modify, CreatedDate = (DateTime)departmentConfiguration.CreatedDate, EntityInfo = departmentConfiguration,Unique= departmentConfiguration.DepartmentCode});

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
                return DepartmentConfigurationData.DeleteDepartmentConfigurationByDPCFId(dPCFId);
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
                return DepartmentConfigurationData.DeleteAllDepartmentConfiguration(dPCFIds);
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
                DataSet dataset = DepartmentConfigurationData.GetDepartmentConfigurationByHierarchyManagementId(hMId);
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
                return DepartmentConfigurationData.DeleteDepartmentConfigurationByHierarchyManagementId(hMId);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
