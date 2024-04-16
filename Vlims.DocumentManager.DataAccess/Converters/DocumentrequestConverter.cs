//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Vlims.DocumentManager.DataAccess
{
    using System;
    using System.Text;
    using System.IO;
    using System.Linq;
    using System.Data;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using Vlims.DMS.Entities;
   // using VAMLIbrary.Core.Extentions;
    using Vlims.Common;


    // Comment
    public static class DocumentrequestConverter
    {

        public static List<Documentrequest> SetAllDocumentrequest(DataSet dataset)
        {
            try
            {
                List<Documentrequest> result = new List<Documentrequest>();
                Documentrequest documentrequestData;
                if (dataset != null && dataset.Tables.Count > 0 && dataset.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; (i < dataset.Tables[0].Rows.Count); i = (i + 1))
                    {
                        DataRow row = dataset.Tables[0].Rows[i];
                        documentrequestData = new Documentrequest();
                        documentrequestData.DRID = Convert.ToString(row[DocumentrequestConstants.DRID.Trim('@')]);
                        documentrequestData.documentmanagerid = Convert.ToString(row[DocumentrequestConstants.documentmanagerid.Trim('@')]);
                        documentrequestData.documenttype = Convert.ToString(row[DocumentrequestConstants.documenttype.Trim('@')]);
                        documentrequestData.department = Convert.ToString(row[DocumentrequestConstants.department.Trim('@')]);
                        documentrequestData.Purpose = Convert.ToString(row[DocumentrequestConstants.Purpose.Trim('@')]);
                        documentrequestData.ApprovalsCount = DatatypeConverter.SetIntValue(row[DocumentrequestConstants.ApprovalsCount.Trim('@')]);
                        documentrequestData.AssigntoGroup = Convert.ToString(row[DocumentrequestConstants.AssigntoGroup.Trim('@')]);
                        documentrequestData.CreatedBy = Convert.ToString(row[DocumentrequestConstants.CreatedBy.Trim('@')]);
                        documentrequestData.CreatedDate = DatatypeConverter.SetDateTime(row[DocumentrequestConstants.CreatedDate.Trim('@')]);
                        documentrequestData.ModifiedBy = Convert.ToString(row[DocumentrequestConstants.ModifiedBy.Trim('@')]);
                        documentrequestData.ModifiedDate = DatatypeConverter.SetDateTime(row[DocumentrequestConstants.ModifiedDate.Trim('@')]);
                        //Added new
                        documentrequestData.Status = Convert.ToString(row[DocumentrequestConstants.Status.Trim('@')]);
                        documentrequestData.Reason = Convert.ToString(row[DocumentrequestConstants.Reason.Trim('@')]);
                        documentrequestData.Workflow = Convert.ToString(row[DocumentrequestConstants.Workflow.Trim('@')]);
                        //documentrequestData.Approvedby = Convert.ToString(row[DocumentrequestConstants.Approvedby.Trim('@')]);
                        //documentrequestData.ApprovedOn= DatatypeConverter.SetDateTime(row[DocumentrequestConstants.ApprovedOn.Trim('@')]);
                        //end
                        result.Add(documentrequestData);
                    }
                }
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public static Documentrequest SetDocumentrequest(DataSet dataset)
        {
            var result = SetAllDocumentrequest(dataset);
            if (result.Count > 0)
            {
                return result.FirstOrDefault();
            }
            return null;
        }
    }
}
