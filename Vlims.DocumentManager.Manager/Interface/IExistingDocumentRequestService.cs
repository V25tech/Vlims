using System;
using System.Text;
using System.IO;
using System.Linq;
using System.Data;
using System.Collections.Generic;
using Vlims.Common;
using Microsoft.AspNetCore.Http;



// Comment
public interface IExistingDocumentRequestService
{

    ResponseContext<ExistingDocumentRequest> GetAllExistingDocumentRequest(RequestContext requestContext);

    ExistingDocumentRequest GetExistingDocumentRequestByEDRId(string eDRId);

    bool SaveExistingDocumentRequest(ExistingDocumentRequest existingDocumentRequest);

    bool UpdateExistingDocumentRequest(ExistingDocumentRequest existingDocumentRequest);

    bool DeleteExistingDocumentRequestByEDRId(string eDRId);

    bool DeleteAllExistingDocumentRequest(List<int> eDRIds);
    string Importbulkdocuments(IFormFile p_fileInfo);
}

