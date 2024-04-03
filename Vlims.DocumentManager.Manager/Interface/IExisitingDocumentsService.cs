using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vlims.Common;
using Vlims.DocumentManager.Entities;

namespace Vlims.DocumentManager.Manager.Interface
{
    public interface IExisitingDocumentsService
    {
        Task<DocumentsEntity> GetAllExistingDocuments(RequestContext requestContext);
        Task<List<TrackSearchInfo>> GetAllTrackedDocuments(string userName,string searchTerm);
    }
}
