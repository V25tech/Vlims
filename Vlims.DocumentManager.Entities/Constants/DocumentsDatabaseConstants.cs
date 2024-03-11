using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vlims.DocumentManager.Entities.Constants
{
    public class DocumentsDatabaseConstants
    {
        #region Exisiting Documents
        public const string USP_ExistingDocuments_PSY_GET_ALL = "dbo.USP_ExistingDocuments_PSY_GET_ALL";
        public static string Id = "ID_PSY";
        public static string DocumentNo = "documentno_PSY";
        public static string DocumentName = "documenttitle_PSY";
        public static string DocumentType = "documenttype_PSY";
        public static string Status = "Status_PSY";
        public static string CreatedBy = "CreatedBy_PSY";
        public static string CreatedOn = "CreatedDate_PSY";
        public static string ModifiedBy = "ModifiedBy_PSY";
        public static string ModifiedOn = "ModifiedDate_PSY";
        public static string DcoumentEffectiveDate = "DcoumentEffectiveDate";
        public static string Department = "department_PSY";
        public static string TotalRows = "TotalRows";
        public static string Document = "document_PSY";
        public static string Template = "Template_PSY";
        public static string WorkFlow = "WorkFlow_PSY";
        public static string Details = "details_PSY";
        public static string Refrence = "Refrence_PSY";
        public static string Documentmanagerid = "Documentmanagerid_PSY";
        public static string EffectiveDate = "effectivedate_PSY";
        public static string ReviewDate = "reviewdate_PSY";
        #endregion
    }
}
