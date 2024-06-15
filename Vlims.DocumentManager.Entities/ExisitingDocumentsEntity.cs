using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vlims.DocumentManager.Entities
{
    public class DocumentsEntity
    {
        public List<ExisitingDocumentsEntity> exisitingDocuments {  get; set; }
        public int TotalRecords { get; set; }
    }
    public class ExisitingDocumentsEntity
    {
        public int Id { get; set; }
        public string? DocumentNo { get; set; }
        public string? DocumentName { get; set; }
        public string? DocumentType { get; set; }
        public string? Department {  get; set; }
        public string? CreatedBy { get; set;}
        public DateTime? CreatedOn { get; set;}
        public string? ModifiedBy { get;set;}
        public DateTime? ModifiedOn { get; set;}
        public string? Status { get; set;}
        public DateTime? EffectiveDate { get; set; }
        public dynamic? ReviewDate { get; set; }
        public string? EntityName { get; set; }
        public string? Document { get; set; }
        public string? Template { get; set; }
        public int PrepId { get; set; }
        public int RevisionNumber { get; set; }



    }
}
