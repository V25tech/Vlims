//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Vlims.Administration.DataAccess
{
    using System;
    using System.Text;
    using System.IO;
    using System.Linq;
    using System.Data;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using Vlims.Administration.Entities;
    using Vlims.Common;



    // Comment
    public static class UserGroupConfigurationConverter
    {
        
        public static List<UserGroupConfiguration> SetAllUserGroupConfiguration(DataSet dataset)
        {
            try
            {
                List<UserGroupConfiguration> result = new List<UserGroupConfiguration>();
                UserGroupConfiguration userGroupConfigurationData;
                if (dataset != null && dataset.Tables.Count > 0 && dataset.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; (i < dataset.Tables[0].Rows.Count); i = (i + 1))
                    {
                        DataRow row = dataset.Tables[0].Rows[i];
                        userGroupConfigurationData = new UserGroupConfiguration();
                        userGroupConfigurationData.Ugcid = Convert.ToString(row[UserGroupConfigurationConstants.Ugcid.Trim('@')]);
                        userGroupConfigurationData.Usermanagementid = Convert.ToString(row[UserGroupConfigurationConstants.Usermanagementid.Trim('@')]);
                        userGroupConfigurationData.Usergroupname = Convert.ToString(row[UserGroupConfigurationConstants.Usergroupname.Trim('@')]);
                        userGroupConfigurationData.Code = Convert.ToString(row[UserGroupConfigurationConstants.Code.Trim('@')]);
                        userGroupConfigurationData.Users = Convert.ToString(row[UserGroupConfigurationConstants.Users.Trim('@')]);
                        userGroupConfigurationData.Totalusers = DatatypeConverter.SetIntValue(row[UserGroupConfigurationConstants.Totalusers.Trim('@')]);
                        userGroupConfigurationData.CreatedBy = Convert.ToString(row[UserGroupConfigurationConstants.CreatedBy.Trim('@')]);
                        userGroupConfigurationData.CreatedDate = DatatypeConverter.SetDateTime(row[UserGroupConfigurationConstants.CreatedDate.Trim('@')]);
                        userGroupConfigurationData.ModifiedBy = Convert.ToString(row[UserGroupConfigurationConstants.ModifiedBy.Trim('@')]);
                        userGroupConfigurationData.ModifiedDate = DatatypeConverter.SetDateTime(row[UserGroupConfigurationConstants.ModifiedDate.Trim('@')]);
                        result.Add(userGroupConfigurationData);
                    }
                }
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public static UserGroupConfiguration SetUserGroupConfiguration(DataSet dataset)
        {
            var result = SetAllUserGroupConfiguration(dataset);
            if (result.Count > 0)
            {
                return result.FirstOrDefault();
            }
            return null;
        }
        
        public static DataTable SetDataSet(List<UserGroupConfiguration> userGroupConfigurations)
        {
            DataTable dataTable = new DataTable();
            DataRow row = null;
            SetDataTableColumns(dataTable);
            try
            {
                if (userGroupConfigurations != null && userGroupConfigurations.Count > 0)
                {
                    for (int i = 0; (i < userGroupConfigurations.Count); i = (i + 1))
                    {
                        row = dataTable.NewRow();
                        row[UserGroupConfigurationConstants.Ugcid.Trim()] = userGroupConfigurations[i].Ugcid;
                        row[UserGroupConfigurationConstants.Usermanagementid.Trim()] = userGroupConfigurations[i].Usermanagementid;
                        row[UserGroupConfigurationConstants.Usergroupname.Trim()] = userGroupConfigurations[i].Usergroupname;
                        row[UserGroupConfigurationConstants.Code.Trim()] = userGroupConfigurations[i].Code;
                        row[UserGroupConfigurationConstants.Users.Trim()] = userGroupConfigurations[i].Users;
                        row[UserGroupConfigurationConstants.Totalusers.Trim()] = userGroupConfigurations[i].Totalusers;
                        row[UserGroupConfigurationConstants.CreatedBy.Trim()] = userGroupConfigurations[i].CreatedBy;
                        row[UserGroupConfigurationConstants.CreatedDate.Trim()] = userGroupConfigurations[i].CreatedDate;
                        row[UserGroupConfigurationConstants.ModifiedBy.Trim()] = userGroupConfigurations[i].ModifiedBy;
                        row[UserGroupConfigurationConstants.ModifiedDate.Trim()] = userGroupConfigurations[i].ModifiedDate;
                        dataTable.Rows.Add(row);
                    }
                }
                return dataTable;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        private static void SetDataTableColumns(DataTable dataTable)
        {
            dataTable.TableName = "UT_UserGroupConfiguration_PSY";
            dataTable.Columns.Add(UserGroupConfigurationConstants.Ugcid.Trim());
            dataTable.Columns.Add(UserGroupConfigurationConstants.Usermanagementid.Trim());
            dataTable.Columns.Add(UserGroupConfigurationConstants.Usergroupname.Trim());
            dataTable.Columns.Add(UserGroupConfigurationConstants.Code.Trim());
            dataTable.Columns.Add(UserGroupConfigurationConstants.Users.Trim());
            dataTable.Columns.Add(UserGroupConfigurationConstants.Totalusers.Trim());
            dataTable.Columns.Add(UserGroupConfigurationConstants.CreatedBy.Trim());
            dataTable.Columns.Add(UserGroupConfigurationConstants.CreatedDate.Trim());
            dataTable.Columns.Add(UserGroupConfigurationConstants.ModifiedBy.Trim());
            dataTable.Columns.Add(UserGroupConfigurationConstants.ModifiedDate.Trim());
        }
    }
}
