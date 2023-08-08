
using System;
using System.Text;
using System.IO;
using System.Linq;
using System.Data;
using System.Collections.Generic;
using Newtonsoft.Json;
using Vlims.Common;
using Vlims.Administration.Entities;



// Comment
public static class SetFunctionalProfileConverter
{

    public static List<setfuctionalprofile> SetAllSetFunctionalProfile(DataSet dataset)
    {
        try
        {
            List<setfuctionalprofile> result = new List<setfuctionalprofile>();
            setfuctionalprofile setFunctionalProfileData;
            if (dataset != null && dataset.Tables.Count > 0 && dataset.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; (i < dataset.Tables[0].Rows.Count); i = (i + 1))
                {
                    DataRow row = dataset.Tables[0].Rows[i];
                    setFunctionalProfileData = new setfuctionalprofile();
                    setFunctionalProfileData.sfpid = Convert.ToInt16(row[SetFunctionalProfileConstants.SFPID.Trim('@')]);
                    setFunctionalProfileData.role = row[SetFunctionalProfileConstants.Role.Trim('@')].ToString();
                    setFunctionalProfileData.adminMgmt = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.AdminManagement.Trim('@')]);
                    setFunctionalProfileData.SecurityManagement = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Security_Management.Trim('@')]);
                    setFunctionalProfileData.securityMgmt = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Security_Configurations.Trim('@')]);
                    setFunctionalProfileData.approvalConfigs = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.E_sign_and_Aprroval_Configurations.Trim('@')]);
                    setFunctionalProfileData.HirearchyManagement = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Hirearchy_Management.Trim('@')]);
                    setFunctionalProfileData.roleConfig = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Role_Configuration.Trim('@')]);
                    setFunctionalProfileData.deptConfig = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Department_Configuration.Trim('@')]);
                    setFunctionalProfileData.plantMgmt = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Plant_Management.Trim('@')]);
                    setFunctionalProfileData.userMgmt = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.User_Management.Trim('@')]);
                    setFunctionalProfileData.userGroupConfig = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.User_Group_Configuration.Trim('@')]);
                    setFunctionalProfileData.Activatestatus = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Activatestatus.Trim('@')]);
                    setFunctionalProfileData.Audit = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Audit_Log.Trim('@')]);
                    setFunctionalProfileData.documentMaster = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Document_Master.Trim('@')]);
                    setFunctionalProfileData.documentTypeConfig = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Document_Type_Configuration.Trim('@')]);
                    setFunctionalProfileData.documentTemplateConfig = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Document_Template_Configuration.Trim('@')]);
                    setFunctionalProfileData.workflowConfig = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.WorkFlow_Configuration.Trim('@')]);
                    setFunctionalProfileData.documentRequest = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Document_Request.Trim('@')]);
                    setFunctionalProfileData.documentPreperation = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Document_Preparation.Trim('@')]);
                    setFunctionalProfileData.documentEffective = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Document_EffectiveOut.Trim('@')]);
                    setFunctionalProfileData.documentRevison = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Document_Revision.Trim('@')]);
                    setFunctionalProfileData.DocumentRepository = DatatypeConverter.SetBoolValue(row[SetFunctionalProfileConstants.Document_Repository.Trim('@')]);                                  
                    result.Add(setFunctionalProfileData);
                }
            }
            return result;
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }

    public static setfuctionalprofile SetSetFunctionalProfile(DataSet dataset)
    {
        var result = SetAllSetFunctionalProfile(dataset);
        if (result.Count > 0)
        {
            return result.FirstOrDefault();
        }
        return null;
    }
}

