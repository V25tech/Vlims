//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Vlims.DMS.Entities
{
    using System;
    using System.Collections.Generic;
    //using PolicySummary.Common.Entities;


    // Comment
    public class AdditionalTask
    {

        private string atidField;

        private int documentEffectiveID;

        private string createdbyField;

        private DateTime? createddateField;

        private string modifiedbyField;

        private DateTime? modifieddateField;

        private DateTime? updateddateField;
        public string Status { get; set; }
        public int Version { get; set; }

        private DateTime? effectiveDateField;

        private DateTime? reviewDateField;
        public string Department { get; set; }
        public string DocumentTitle { get; set; }
        public string Documentno { get; set; }
        public string DocumentType { get; set; }
        public string Document { get; set; }

        private string workflowField;
        public int DocumentEffectiveID
        {
            get
            {
                return this.documentEffectiveID;
            }
            set
            {
                this.documentEffectiveID = value;
            }
        }

        public string ATID
        {
            get
            {
                return this.atidField;
            }
            set
            {
                this.atidField = value;
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

        public DateTime? EffectiveDate
        {
            get
            {
                return this.effectiveDateField;
            }
            set
            {
                this.effectiveDateField = value;
            }
        }

        public DateTime? ReviewDate
        {
            get
            {
                return this.reviewDateField;
            }
            set
            {
                this.reviewDateField = value;
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
        public string Workflow
        {
            get
            {
                return this.workflowField;
            }
            set
            {
                this.workflowField = value;
            }
        }
        public string Template { get; set; }
        public int ReferenceId { get; set; }
    }
}
