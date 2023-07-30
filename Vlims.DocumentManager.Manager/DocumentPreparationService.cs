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
    using Vlims.DMS.Entities;
    using Vlims.Common;
    using Vlims.DocumentManager.DataAccess;
    using static System.Net.Mime.MediaTypeNames;


    // Comment
    public class DocumentPreparationService : IDocumentPreparationService
    {


        public ResponseContext<DocumentPreparation> GetAllDocumentPreparation(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = DocumentPreparationData.GetAllDocumentPreparation(requestContext);
                List<DocumentPreparation> result = DocumentPreparationConverter.SetAllDocumentPreparation(dataset);
                return new ResponseContext<DocumentPreparation>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        //public ResponseContext<Documentrequest> GetAllDocumentPreparation(RequestContext requestContext)
        //{
        //    List<Documentrequest> result1 = null;
        //    try
        //    {
        //        requestContext.PageNumber = 1;
        //        requestContext.PageSize = 50;
        //        //DataSet dataset = DocumentPreparationData.GetAllDocumentPreparation(requestContext);
        //        DataSet dataset = DocumentrequestData.GetAllDocumentrequest(requestContext);
        //        List<Documentrequest> result = DocumentrequestConverter.SetAllDocumentrequest(dataset);
        //        result = result.Where(item => item.Status == "Approved").ToList();
        //        return new ResponseContext<Documentrequest>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
        //        //List<DocumentPreparation> result = DocumentPreparationConverter.SetAllDocumentPreparation(dataset);
        //        //return new ResponseContext<DocumentPreparation>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
        //    }
        //    catch (System.Exception ex)
        //    {
        //        throw;
        //    }
        //}

        public DocumentPreparation GetDocumentPreparationByDPNID(string dPNID)
        {
            try
            {
                DataSet dataset = DocumentPreparationData.GetDocumentPreparationByDPNID(dPNID);
                DocumentPreparation result = DocumentPreparationConverter.SetDocumentPreparation(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool SaveDocumentPreparation(DocumentPreparation documentPreparation)
        {
            try
            {
                String validationMessages = DocumentPreparationValidator.IsValidDocumentPreparation(documentPreparation);
                //if (validationMessages.Length <= 0)
                //{
                //documentPreparation.document = "test";
                //documentPreparation.Documentmanagerid = "1";
                //documentPreparation.template = "";
                var result = DocumentPreparationData.SaveDocumentPreparation(documentPreparation);
                return result;
                //}
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool UpdateDocumentPreparation(DocumentPreparation documentPreparation)
        {
            try
            {
                //String validationMessages = DocumentPreparationValidator.IsValidDocumentPreparation(documentPreparation);
                //if (validationMessages.Length <= 0)
                //{
                    bool result = DocumentPreparationData.UpdateDocumentPreparation(documentPreparation);
                    return result;
                //}
                //throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteDocumentPreparationByDPNID(string dPNID)
        {
            try
            {
                return DocumentPreparationData.DeleteDocumentPreparationByDPNID(dPNID);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteAllDocumentPreparation(List<int> dPNIDs)
        {
            try
            {
                return DocumentPreparationData.DeleteAllDocumentPreparation(dPNIDs);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}
