using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Vlims.Common
{
    public class DocumentMappingJSON
    {
        public string plantCode { get; set; }
        public string plantName { get; set; }
        public string clientInfo { get; set; }
        public SOP operatingProcedure { get; set; }
    }
    public class SOP
    {
        public string documentTitle { get; set; }
        public string documentNumber { get; set; }
        public string revisonNumber { get; set; }
        public string supersedesNumber { get; set; }
        public string reference { get; set; }
        public string sampleQuantity { get; set; }
        public string packingInfo { get; set; }
        public string labelClaim { get; set; }
    }
}
