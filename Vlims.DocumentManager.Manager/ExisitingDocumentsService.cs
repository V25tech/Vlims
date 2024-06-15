using Azure;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vlims.Common;
using Vlims.DocumentManager.DataAccess;
using Vlims.DocumentManager.DataAccess.Converters;
using Vlims.DocumentManager.Entities;
using Vlims.DocumentManager.Manager.Interface;

namespace Vlims.DocumentManager.Manager
{
    public class ExisitingDocumentsService : IExisitingDocumentsService
    {
        public Task<DocumentsEntity> GetAllExistingDocuments(Common.RequestContext requestContext)
        {
            DataSet dataset = ExisitingDocumentsData.GetAllExistingDocuments(requestContext);
            DocumentsEntity documents = ExistingDocumentsConverter.SetAllExistingDocuments(dataset);
            return Task.FromResult(documents);
        }

        public Task<List<TrackSearchInfo>> GetAllTrackedDocuments(string userName, string searchTerm)
        {
            DataSet dataset = ExisitingDocumentsData.GetAllTrackedDocuments(userName, searchTerm);
            List<TrackSearchInfo> documents = ExistingDocumentsConverter.SetAllTrackedDocuments(dataset);
            return Task.FromResult(documents);
        }
        public Task<DocumentsEntity> GetRevisedDocuments(Common.RequestContext requestContext)
        {
            DataSet dataset = ExisitingDocumentsData.GetRevisedDocuments(requestContext);
            DocumentsEntity documents = ExistingDocumentsConverter.SetAllExistingDocuments(dataset);
            return Task.FromResult(documents);
        }
    }
}
