//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Vlims.DocumentManager.Manager
{
    using System;
    using System.Text;
    using System.IO;
    using System.Linq;
    using System.Data;
    using System.Collections.Generic;
    using Vlims.Common;
    using Vlims.DMS.Entities;
    using Vlims.DocumentManager.DataAccess;


    // Comment
    public class DocumentrequestService : IDocumentrequestService
    {



        public ResponseContext<Documentrequest> GetAllDocumentrequest(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = DocumentrequestData.GetAllDocumentrequest(requestContext);
                List<Documentrequest> result = DocumentrequestConverter.SetAllDocumentrequest(dataset);
                return new ResponseContext<Documentrequest>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public Documentrequest GetDocumentrequestByDRID(string dRID)
        {
            try
            {
                DataSet dataset = DocumentrequestData.GetDocumentrequestByDRID(dRID);
                Documentrequest result = DocumentrequestConverter.SetDocumentrequest(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool SaveDocumentrequest(Documentrequest documentrequest)
        {
            try
            {
                //documentrequest.AssigntoGroup = "A";
                documentrequest.documentmanagerid = "1";
                //documentrequest.Status = "In-Progress";
                var result = DocumentrequestData.SaveDocumentrequest(documentrequest);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool UpdateDocumentrequest(Documentrequest documentrequest)
        {
            try
            {
                String validationMessages = DocumentrequestValidator.IsValidDocumentrequest(documentrequest);
                if (validationMessages.Length <= 0)
                {
                    bool result = DocumentrequestData.UpdateDocumentrequest(documentrequest);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteDocumentrequestByDRID(string dRID)
        {
            try
            {
                return DocumentrequestData.DeleteDocumentrequestByDRID(dRID);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteAllDocumentrequest(List<int> dRIDs)
        {
            try
            {
                return DocumentrequestData.DeleteAllDocumentrequest(dRIDs);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
