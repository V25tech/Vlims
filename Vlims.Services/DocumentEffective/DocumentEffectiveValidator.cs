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
    public static class DocumentEffectiveValidator
    {
        
        public static string IsValidDocumentEffective(DocumentEffective documentEffective)
        {
            try
            {
                StringBuilder validationMessages = new StringBuilder();
                ValidationHelper validationHelper = new ValidationHelper();
                validationMessages.Append(validationHelper.NullCheckValidator(documentEffective.DEID, nameof(documentEffective.DEID)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentEffective.DEID,50, nameof(documentEffective.DEID)));
                validationMessages.Append(validationHelper.NullCheckValidator(documentEffective.Documentmanagerid, nameof(documentEffective.Documentmanagerid)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentEffective.Documentmanagerid,50, nameof(documentEffective.Documentmanagerid)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentEffective.documenttitle,50, nameof(documentEffective.documenttitle)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentEffective.documentno,50, nameof(documentEffective.documentno)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentEffective.documenttype,50, nameof(documentEffective.documenttype)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentEffective.department,50, nameof(documentEffective.department)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentEffective.document,50, nameof(documentEffective.document)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentEffective.CreatedBy,100, nameof(documentEffective.CreatedBy)));
                validationMessages.Append(validationHelper.LengthCheckValidator(documentEffective.ModifiedBy,100, nameof(documentEffective.ModifiedBy)));
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
