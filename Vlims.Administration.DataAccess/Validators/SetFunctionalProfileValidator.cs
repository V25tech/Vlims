
    using System;
    using System.Text;
    using System.IO;
    using System.Linq;
    using System.Data;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using PolicySummary.DMS.Entities;
using Vlims.Common;


// Comment
public static class SetFunctionalProfileValidator
    {
        
        public static string IsValidSetFunctionalProfile(SetFunctionalProfile setFunctionalProfile)
        {
            try
            {
                StringBuilder validationMessages = new StringBuilder();
                ValidationHelper validationHelper = new ValidationHelper();
                validationMessages.Append(validationHelper.LengthCheckValidator(setFunctionalProfile.CreatedBy,100, nameof(setFunctionalProfile.CreatedBy)));
                validationMessages.Append(validationHelper.LengthCheckValidator(setFunctionalProfile.ModifiedBy,100, nameof(setFunctionalProfile.ModifiedBy)));
                if (!String.IsNullOrEmpty(validationMessages.ToString()))
                {
                    return Convert.ToString(validationMessages.Remove(validationMessages.ToString().LastIndexOf(','),1));
                }
                else
                {
                    return Convert.ToString(validationMessages);
                }
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
