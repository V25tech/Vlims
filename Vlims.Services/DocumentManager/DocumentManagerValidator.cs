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
    using Newtonsoft.Json;
    
    using VAMLIbrary.Core.Validators;
    using Vlims.Entities;


    // Comment
    public static class DocumentManagerValidator
    {
        
        public static string IsValidDocumentManager(DocumentManager documentManager)
        {
            try
            {
                StringBuilder validationMessages = new StringBuilder();
                ValidationHelper validationHelper = new ValidationHelper();
                validationMessages.Append(validationHelper.NullCheckValidator(documentManager.DMGId, nameof(documentManager.DMGId)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentManager.DMGId,50, nameof(documentManager.DMGId)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentManager.Documentrequest,50, nameof(documentManager.Documentrequest)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentManager.documentpreparation,50, nameof(documentManager.documentpreparation)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentManager.DocumentEffective,50, nameof(documentManager.DocumentEffective)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentManager.AdditionalTasks,50, nameof(documentManager.AdditionalTasks)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentManager.CreatedBy,100, nameof(documentManager.CreatedBy)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentManager.ModifiedBy,100, nameof(documentManager.ModifiedBy)));
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
}
