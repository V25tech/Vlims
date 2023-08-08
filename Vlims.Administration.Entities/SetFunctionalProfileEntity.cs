
using System;
using System.Collections.Generic;

namespace Vlims.Administration.Entities
{
    // Comment
    public class SetFunctionalProfile
    {

        private int sfpidField;

        private string roleField;

        private bool? adminmanagementField;

        private bool? securitymanagementField;

        private bool? securityconfigurationsField;

        private bool? esignandaprrovalconfigurationsField;

        private bool? hirearchymanagementField;

        private bool? roleconfigurationField;

        private bool? departmentconfigurationField;

        private bool? setfunctionalprofileField;

        private bool? plantmanagementField;

        private bool? usermanagementField;

        private bool? usergroupconfigurationField;

        private bool? activatestatus;

        private bool? auditlogField;

        private bool? documentmasterField;

        private bool? documenttypeconfigurationField;

        private bool? documenttemplateconfigurationField;

        private bool? workflowconfigurationField;

        private bool? dashboardconfigurationField;

        private bool? notificationconfigurationField;


        private bool? documentrequestField;

        private bool? documentpreparationField;

        private bool? documenteffectiveoutField;

        private bool? additionaltasksField;


        private bool? documentrevisionField;

        private bool? documentrepositoryField;



        private string createdbyField;

        private DateTime? createddateField;

        private string modifiedbyField;

        private DateTime? modifieddateField;

        public int SFPID
        {
            get
            {
                return this.sfpidField;
            }
            set
            {
                this.sfpidField = value;
            }
        }

        public string role
        {
            get
            {
                return this.roleField;
            }
            set
            {
                this.roleField = value;
            }
        }

        public bool? adminMgmt
        {
            get
            {
                return this.adminmanagementField;
            }
            set
            {
                this.adminmanagementField = value;
            }
        }

        public bool? SecurityManagement
        {
            get
            {
                return this.securitymanagementField;
            }
            set
            {
                this.securitymanagementField = value;
            }
        }

        public bool? securityMgmt
        {
            get
            {
                return this.securityconfigurationsField;
            }
            set
            {
                this.securityconfigurationsField = value;
            }
        }

        public bool? approvalConfigs
        {
            get
            {
                return this.esignandaprrovalconfigurationsField;
            }
            set
            {
                this.esignandaprrovalconfigurationsField = value;
            }
        }

        public bool? HirearchyManagement
        {
            get
            {
                return this.hirearchymanagementField;
            }
            set
            {
                this.hirearchymanagementField = value;
            }
        }

        public bool? roleConfig
        {
            get
            {
                return this.roleconfigurationField;
            }
            set
            {
                this.roleconfigurationField = value;
            }
        }

        public bool? deptConfig
        {
            get
            {
                return this.departmentconfigurationField;
            }
            set
            {
                this.departmentconfigurationField = value;
            }
        }


        public bool? plantMgmt
        {
            get
            {
                return this.plantmanagementField;
            }
            set
            {
                this.plantmanagementField = value;
            }
        }

        public bool? userMgmt
        {
            get
            {
                return this.usermanagementField;
            }
            set
            {
                this.usermanagementField = value;
            }
        }

        public bool? userGroupConfig
        {
            get
            {
                return this.usergroupconfigurationField;
            }
            set
            {
                this.usergroupconfigurationField = value;
            }
        }

        public bool? Activatestatus
        {
            get
            {
                return this.Activatestatus;
            }
            set
            {
                this.Activatestatus = value;
            }
        }

        public bool? Audit
        {
            get
            {
                return this.auditlogField;
            }
            set
            {
                this.auditlogField = value;
            }
        }

        public bool? documentMaster
        {
            get
            {
                return this.documentmasterField;
            }
            set
            {
                this.documentmasterField = value;
            }
        }

        public bool? documentTypeConfig
        {
            get
            {
                return this.documenttypeconfigurationField;
            }
            set
            {
                this.documenttypeconfigurationField = value;
            }
        }

        public bool? documentTemplateConfig
        {
            get
            {
                return this.documenttemplateconfigurationField;
            }
            set
            {
                this.documenttemplateconfigurationField = value;
            }
        }

        public bool? workflowConfig
        {
            get
            {
                return this.workflowconfigurationField;
            }
            set
            {
                this.workflowconfigurationField = value;
            }
        }

        public bool? dashboardConfig
        {
            get
            {
                return this.dashboardconfigurationField;
            }
            set
            {
                this.dashboardconfigurationField = value;
            }
        }

        public bool? notificationConfig
        {
            get
            {
                return this.notificationconfigurationField;
            }
            set
            {
                this.notificationconfigurationField = value;
            }
        }



        public bool? documentRequest
        {
            get
            {
                return this.documentrequestField;
            }
            set
            {
                this.documentrequestField = value;
            }
        }

        public bool? documentPreperation
        {
            get
            {
                return this.documentpreparationField;
            }
            set
            {
                this.documentpreparationField = value;
            }
        }

        public bool? documentEffective
        {
            get
            {
                return this.documenteffectiveoutField;
            }
            set
            {
                this.documenteffectiveoutField = value;
            }
        }

        public bool? additionalTasks
        {
            get
            {
                return this.additionaltasksField;
            }
            set
            {
                this.additionaltasksField = value;
            }
        }



        public bool? documentRevison
        {
            get
            {
                return this.documentrevisionField;
            }
            set
            {
                this.documentrevisionField = value;
            }
        }

        public bool? DocumentRepository
        {
            get
            {
                return this.documentrepositoryField;
            }
            set
            {
                this.documentrepositoryField = value;
            }
        }





        public string CreatedBy
        {
            get
            {
                return this.createdbyField;
            }
            set
            {
                this.createdbyField = value;
            }
        }

        public DateTime? CreatedDate
        {
            get
            {
                return this.createddateField;
            }
            set
            {
                this.createddateField = value;
            }
        }

        public string ModifiedBy
        {
            get
            {
                return this.modifiedbyField;
            }
            set
            {
                this.modifiedbyField = value;
            }
        }

        public DateTime? ModifiedDate
        {
            get
            {
                return this.modifieddateField;
            }
            set
            {
                this.modifieddateField = value;
            }
        }

    }
}
