using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vlims.DocumentManager.Entities
{
    public class TrackSearchInfo
    {
        public int Id { get; set; }
        public string? DocumentNo { get; set; }
        public string? DocumentName { get; set; }
        public string? DocumentType { get; set; }
        public string? Department { get; set; }
        public string? Status { get; set; }
        public string? Stage { get; set; }
        public string? Document { get; set; }

    }
}
