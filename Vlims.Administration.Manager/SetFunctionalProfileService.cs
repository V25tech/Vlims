
using System;
using System.Text;
using System.IO;
using System.Linq;
using System.Data;
using System.Collections.Generic;
using Vlims.Common;
using Vlims.Data;
using Vlims.Administration.Entities;

namespace Vlims.Administration.Manager
{
    // Comment
    public class SetFunctionalProfileService : ISetFunctionalProfileService
    {


        public ResponseContext<setfuctionalprofile> GetAllSetFunctionalProfile(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = SetFunctionalProfileData.GetAllSetFunctionalProfile(requestContext);
                List<setfuctionalprofile> result = SetFunctionalProfileConverter.SetAllSetFunctionalProfile(dataset);
                return new ResponseContext<setfuctionalprofile>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public setfuctionalprofile GetSetFunctionalProfileBySFPID(System.Boolean? sFPID)
        {
            try
            {
                DataSet dataset = SetFunctionalProfileData.GetSetFunctionalProfileBySFPID(sFPID);
                setfuctionalprofile result = SetFunctionalProfileConverter.SetSetFunctionalProfile(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        //public SetFunctionalProfile GetSetFunctionalProfileBySFPID(int sFPID)
        //{
        //    throw new NotImplementedException();
        //}

        public bool SaveSetFunctionalProfile(setfuctionalprofile setFunctionalProfile)
        {
            try
            {
                String validationMessages = SetFunctionalProfileValidator.IsValidSetFunctionalProfile(setFunctionalProfile);
                if (validationMessages.Length <= 0)
                {
                    //setFunctionalProfile.CreatedBy = "admin";
                    //setFunctionalProfile.ModifiedBy = "admin";
                    var result = SetFunctionalProfileData.SaveSetFunctionalProfile(setFunctionalProfile);
                    AuditLog.SaveAuditLog(new AuditLogEntity { UserName = setFunctionalProfile.CreatedBy, EntityName = setFunctionalProfile.role, Type = SetFunctionalProfileConstants.ProfileType, state = DefinitionStatus.New,  EntityInfo = setFunctionalProfile, Unique = setFunctionalProfile.role });

                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool UpdateSetFunctionalProfile(setfuctionalprofile setFunctionalProfile)
        {
            try
            {
                String validationMessages = SetFunctionalProfileValidator.IsValidSetFunctionalProfile(setFunctionalProfile);
                if (validationMessages.Length <= 0)
                {
                    bool result = SetFunctionalProfileData.UpdateSetFunctionalProfile(setFunctionalProfile);
                    AuditLog.SaveAuditLog(new AuditLogEntity { UserName = setFunctionalProfile.CreatedBy, EntityName = setFunctionalProfile.role, Type = SetFunctionalProfileConstants.ProfileType, state = DefinitionStatus.Modify, EntityInfo = setFunctionalProfile, Unique = setFunctionalProfile.role });

                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }



        //public bool DeleteSetFunctionalProfileBySFPID(System.Boolean? sFPID)
        //{
        //    try
        //    {
        //        return SetFunctionalProfileData.DeleteSetFunctionalProfileBySFPID(sFPID);
        //    }
        //    catch (System.Exception ex)
        //    {
        //        throw;
        //    }
        //}

        //public bool DeleteAllSetFunctionalProfile(List<int> sFPIDs)
        //{
        //    try
        //    {
        //        return SetFunctionalProfileData.DeleteAllSetFunctionalProfile(sFPIDs);
        //    }
        //    catch (System.Exception ex)
        //    {
        //        throw;
        //    }
        //}
    }

}