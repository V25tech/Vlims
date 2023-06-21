//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PolicySummary.Sheet1.Data
{
    using System;
    using System.Data;
    using System.Linq;
    using System.Data.SqlClient;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using PolicySummary.Common.Entities;
    using PolicySummary.Sheet1.Entities;
    using VAMLibrary.Core;
    using VAMLibrary.Core.Common;
    
    
    // Comment
    public class RoleConfigurationData : IRoleConfigurationData
    {
        
        private readonly DataAccessHelper dataAccessHelper;
        
        public RoleConfigurationData(DataAccessHelper dataAccessHelper)
        {
            this.dataAccessHelper = dataAccessHelper;
        }
        
        public DataSet GetAllRoleConfiguration(RequestContext requestContext)
        {
            try
            {
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageNumber, Value = requestContext.PageNumber });
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageSize, Value = requestContext.PageSize });
                DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(RoleConfigurationConstants.USP_RoleConfiguration_PSY_GET_ALL, sqlparms, ExecutionType.Dataset);
                return dataset;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public DataSet GetRoleConfigurationByROCFId(string rOCFId)
        {
            try
            {
                DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(RoleConfigurationConstants.USP_RoleConfiguration_PSY_GET, RoleConfigurationConstants.ROCFId, DbType.Int32, rOCFId, ExecutionType.Dataset);
                return dataset;
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
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = RoleConfigurationConstants.HierarchyManagementId, Value = roleConfiguration.HierarchyManagementId });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = RoleConfigurationConstants.Role, Value = roleConfiguration.Role });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = RoleConfigurationConstants.Department, Value = roleConfiguration.Department });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = RoleConfigurationConstants.Comments, Value = roleConfiguration.Comments });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = RoleConfigurationConstants.CreatedBy, Value = roleConfiguration.CreatedBy });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = RoleConfigurationConstants.ModifiedBy, Value = roleConfiguration.ModifiedBy });
                Object result = dataAccessHelper.ExecuteStoredProcedure(RoleConfigurationConstants.USP_RoleConfiguration_PSY_INSERT, sqlparms, ExecutionType.Scalar);
                return (Convert.ToInt32(result) > 0);
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
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = RoleConfigurationConstants.ROCFId, Value = roleConfiguration.ROCFId });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = RoleConfigurationConstants.HierarchyManagementId, Value = roleConfiguration.HierarchyManagementId });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = RoleConfigurationConstants.Role, Value = roleConfiguration.Role });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = RoleConfigurationConstants.Department, Value = roleConfiguration.Department });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = RoleConfigurationConstants.Comments, Value = roleConfiguration.Comments });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = RoleConfigurationConstants.ModifiedBy, Value = roleConfiguration.ModifiedBy });
                Object result = dataAccessHelper.ExecuteStoredProcedure(RoleConfigurationConstants.USP_RoleConfiguration_PSY_UPDATE, sqlparms, ExecutionType.Scalar);
                return (Convert.ToInt32(result) > 0);
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
                var result = dataAccessHelper.ExecuteStoredProcedure(RoleConfigurationConstants.USP_RoleConfiguration_PSY_DELETE, RoleConfigurationConstants.ROCFId, DbType.Int32, rOCFId, ExecutionType.NonQuery);
                return (Convert.ToInt32(result) >= 0);
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
                var result = dataAccessHelper.ExecuteStoredProcedure(RoleConfigurationConstants.USP_RoleConfiguration_PSY_DELETE_ALL, RoleConfigurationConstants.ROCFId, DbType.String, string.Join(',',  rOCFIds), ExecutionType.NonQuery);
                return (Convert.ToInt32(result) >= 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public DataSet GetRoleConfigurationByHierarchyManagementId(System.Int32? hMId)
        {
            try
            {
                DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(RoleConfigurationConstants.USP_RoleConfiguration_PSY_By_HMId_GET, "@HMId", DbType.Int32, hMId, ExecutionType.Dataset);
                return dataset;
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
                var result = dataAccessHelper.ExecuteStoredProcedure(RoleConfigurationConstants.USP_RoleConfiguration_PSY_By_HMId_DELETE, "@HMId", DbType.Int32, hMId, ExecutionType.NonQuery);
                return (Convert.ToInt32(result) >= 0);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
