
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
                    setFunctionalProfileData.adminMgmt = DatatypeConverter.SetBoolValue(row["AdminManagement_PSY"]);
                    setFunctionalProfileData.securityMgmt = DatatypeConverter.SetBoolValue(row["SecurityManagement_PSY"]);
                    setFunctionalProfileData.securityConfig = DatatypeConverter.SetBoolValue(row["SecurityConfigurations_PSY"]);
                    setFunctionalProfileData.approvalConfigs = DatatypeConverter.SetBoolValue(row["EsignandAprrovalConfigurations_PSY"]);
                    setFunctionalProfileData.hirearchyMgmt = DatatypeConverter.SetBoolValue(row["HirearchyManagement_PSY"]);
                    setFunctionalProfileData.roleConfig = DatatypeConverter.SetBoolValue(row["RoleConfiguration_PSY"]);
                    setFunctionalProfileData.deptConfig = DatatypeConverter.SetBoolValue(row["DepartmentConfiguration_PSY"]);
                    setFunctionalProfileData.plantMgmt = DatatypeConverter.SetBoolValue(row["PlantManagement_PSY"]);
                    setFunctionalProfileData.userMgmt = DatatypeConverter.SetBoolValue(row["UserManagement_PSY"]);
                    setFunctionalProfileData.userGroupConfig = DatatypeConverter.SetBoolValue(row["UserGroupConfiguration_PSY"]);
                    setFunctionalProfileData.Activatestatus = DatatypeConverter.SetBoolValue(row["ActivateStatus"]);
                    setFunctionalProfileData.Audit = DatatypeConverter.SetBoolValue(row["AuditLog_PSY"]);
                    setFunctionalProfileData.documentMaster = DatatypeConverter.SetBoolValue(row["DocumentMaster_PSY"]);
                    setFunctionalProfileData.documentTypeConfig = DatatypeConverter.SetBoolValue(row["DocumentTypeConfiguration_PSY"]);
                    setFunctionalProfileData.documentTemplateConfig = DatatypeConverter.SetBoolValue(row["DocumentTemplateConfiguration_PSY"]);
                    setFunctionalProfileData.workflowConfig = DatatypeConverter.SetBoolValue(row["WorkFlowConfiguration_PSY"]);
                    setFunctionalProfileData.documentRequest = DatatypeConverter.SetBoolValue(row["DocumentRequest_PSY"]);
                    setFunctionalProfileData.documentPreperation = DatatypeConverter.SetBoolValue(row["DocumentPreparation_PSY"]);
                    setFunctionalProfileData.documentEffective = DatatypeConverter.SetBoolValue(row["DocumentEffectiveOut_PSY"]);
                    setFunctionalProfileData.documentRevison = DatatypeConverter.SetBoolValue(row["DocumentRevision_PSY"]);
                    setFunctionalProfileData.DocumentRepository = DatatypeConverter.SetBoolValue(row["DocumentRepository_PSY"]);                                  
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

