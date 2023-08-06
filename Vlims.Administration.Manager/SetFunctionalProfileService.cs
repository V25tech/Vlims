
    using System;
    using System.Text;
    using System.IO;
    using System.Linq;
    using System.Data;
    using System.Collections.Generic;
using Vlims.Common;
using PolicySummary.DMS.Data;


// Comment
public class SetFunctionalProfileService
    {
        
       
        public ResponseContext<SetFunctionalProfile> GetAllSetFunctionalProfile(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = SetFunctionalProfileData.GetAllSetFunctionalProfile(requestContext);
                List<SetFunctionalProfile> result = SetFunctionalProfileConverter.SetAllSetFunctionalProfile(dataset);
                return new ResponseContext<SetFunctionalProfile>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public SetFunctionalProfile GetSetFunctionalProfileBySFPID(System.Boolean? sFPID)
        {
            try
            {
                DataSet dataset = SetFunctionalProfileData.GetSetFunctionalProfileBySFPID(sFPID);
                SetFunctionalProfile result = SetFunctionalProfileConverter.SetSetFunctionalProfile(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool SaveSetFunctionalProfile(SetFunctionalProfile setFunctionalProfile)
        {
            try
            {
                String validationMessages = SetFunctionalProfileValidator.IsValidSetFunctionalProfile(setFunctionalProfile);
                if (validationMessages.Length <= 0)
                {
                    var result = SetFunctionalProfileData.SaveSetFunctionalProfile(setFunctionalProfile);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool UpdateSetFunctionalProfile(SetFunctionalProfile setFunctionalProfile)
        {
            try
            {
                String validationMessages = SetFunctionalProfileValidator.IsValidSetFunctionalProfile(setFunctionalProfile);
                if (validationMessages.Length <= 0)
                {
                    bool result = SetFunctionalProfileData.UpdateSetFunctionalProfile(setFunctionalProfile);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteSetFunctionalProfileBySFPID(System.Boolean? sFPID)
        {
            try
            {
                return SetFunctionalProfileData.DeleteSetFunctionalProfileBySFPID(sFPID);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public bool DeleteAllSetFunctionalProfile(List<int> sFPIDs)
        {
            try
            {
                return SetFunctionalProfileData.DeleteAllSetFunctionalProfile(sFPIDs);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }

