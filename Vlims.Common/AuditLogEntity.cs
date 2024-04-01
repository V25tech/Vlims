using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vlims.Common
{
    public class AuditLogEntity
    {
        public string UserName { get; set; }
        public string Message { get; set; }
        public string EntityName { get; set; }
        public string Type { get; set; }
        public Actions Action { get; set; }
        public DateTime CreatedDate { get; set; }
        public DefinitionStatus state { get; set; }
        public string Unique { get; set; }

        public string printauditid { get; set; } // Add VersionNumber property
                                               // public string JsonData { get; set; } // Add JsonData property
        public dynamic EntityInfo { get; set; } // Add JsonData property

        //public DocumentTypeConfiguration DocumentTypeConfiguration { get; set; } //
    }

    public enum Actions
    {
        Added,
        Modified,
        Removed
    }
    public enum DefinitionStatus
    {
        New,
        Modify
    }

}
