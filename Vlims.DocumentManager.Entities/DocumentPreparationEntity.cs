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
    // using PolicySummary.Common.Entities;


    // Comment
    public class DocumentPreparation
    {

        private string dpnidField;

        private string documentmanageridField;

        private string documenttitleField;

        private string documentnoField;

        private string documenttypeField;

        private string departmentField;

        private string documentField;

        private string templateField;

        private string wokflowField;

        private string detailsField;

        private string createdbyField;

        private DateTime? createddateField;

        private string modifiedbyField;

        private DateTime? modifieddateField;

        private string statusField;


        public string DPNID
        {
            get
            {
                return this.dpnidField;
            }
            set
            {
                this.dpnidField = value;
            }
        }

        public string Documentmanagerid
        {
            get
            {
                return this.documentmanageridField;
            }
            set
            {
                this.documentmanageridField = value;
            }
        }

        public string documenttitle
        {
            get
            {
                return this.documenttitleField;
            }
            set
            {
                this.documenttitleField = value;
            }
        }

        public string documentno
        {
            get
            {
                return this.documentnoField;
            }
            set
            {
                this.documentnoField = value;
            }
        }

        public string documenttype
        {
            get
            {
                return this.documenttypeField;
            }
            set
            {
                this.documenttypeField = value;
            }
        }

        public string department
        {
            get
            {
                return this.departmentField;
            }
            set
            {
                this.departmentField = value;
            }
        }

        public string document
        {
            get
            {
                return this.documentField;
            }
            set
            {
                this.documentField = value;
            }
        }

        public string template
        {
            get
            {
                return this.templateField;
            }
            set
            {
                this.templateField = value;
            }
        }

        public string wokflow
        {
            get
            {
                return this.wokflowField;
            }
            set
            {
                this.wokflowField = value;
            }
        }

        public string details
        {
            get
            {
                return this.detailsField;
            }
            set
            {
                this.detailsField = value;
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
        public string Status
        {
            get
            {
                return this.statusField;
            }
            set
            {
                this.statusField = value;
            }
        }
        public string path { get; set; }
        public int ReferenceId { get; set; }
        public PreperationDocument Prepdocument { get; set; }
        public bool IsEffectiveApproved { get; set; }
    }


    public class PreperationDocument
    {
        public string sampleQuantity { get; set; }
        public string packingInformation { get; set; }
        public string labelClaim { get; set; }
        public string reference { get; set; }
        public string productCode { get; set; }
        public string revisionNo { get; set; }
    }
}
