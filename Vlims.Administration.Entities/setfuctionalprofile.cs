using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vlims.Administration.Entities
{
    public class setfuctionalprofile
    {

        public int sfpid { get; set; }

        public string role { get; set; }

        public bool? adminMgmt { get; set; }

        public bool? SecurityManagement { get; set; }

        public bool? securityMgmt { get; set; }

        public bool? approvalConfigs { get; set; }

        public bool? HirearchyManagement { get; set; }

        public bool? roleConfig { get; set; }

        public bool? deptConfig { get; set; }

        public bool? plantMgmt { get; set; }

        public bool? userMgmt { get; set; }


        public bool? userGroupConfig { get; set; }

        public bool? Activatestatus { get; set; }


        public bool? Audit { get; set; }

        public bool? documentMaster { get; set; } = false;

        public bool? documentTypeConfig { get; set; }


        public bool? documentTemplateConfig { get; set; }


        public bool? workflowConfig { get; set; }



        public bool? documentRequest { get; set; }


        public bool? documentEffective { get; set; }


        public bool? workflowEffective { get; set; }

        public bool? documentRevison { get; set; }


        public bool? DocumentRepository { get; set; }


        public bool? documentPreperation { get; set; }




    }
}
