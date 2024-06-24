//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Vlims.DocumentMaster.Entities
{
    using System;
    using System.Collections.Generic;



    // Comment
    public class DocumentTemplateConfiguration
    {

        private string dtidField;

        private string documentmasteridField;

        private string templatenameField;

        private string uniquecodeField;

        private string documenttypeField;

        private string headerField;

        private string rowsField;

        private string columnsField;

        private string footerField;

        //private string rowsField;

        //private string columnsField;

        private string createdbyField;

        private DateTime? createddateField;

        private string modifiedbyField;

        private string statusField;


        private DateTime? modifieddateField;

        public string DTID
        {
            get
            {
                return this.dtidField;
            }
            set
            {
                this.dtidField = value;
            }
        }

        public string DocumentMasterId
        {
            get
            {
                return this.documentmasteridField;
            }
            set
            {
                this.documentmasteridField = value;
            }
        }

        public string Templatename
        {
            get
            {
                return this.templatenameField;
            }
            set
            {
                this.templatenameField = value;
            }
        }

        public string Uniquecode
        {
            get
            {
                return this.uniquecodeField;
            }
            set
            {
                this.uniquecodeField = value;
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

        public string header
        {
            get
            {
                return this.headerField;
            }
            set
            {
                this.headerField = value;
            }
        }

        public string rows
        {
            get
            {
                return this.rowsField;
            }
            set
            {
                this.rowsField = value;
            }
        }

        public string columns
        {
            get
            {
                return this.columnsField;
            }
            set
            {
                this.columnsField = value;
            }
        }

        public string footer
        {
            get
            {
                return this.footerField;
            }
            set
            {
                this.footerField = value;
            }
        }
        public string footerrows { get; set; }
        public string footercolumns { get; set; }
        //public string rows
        //{
        //    get
        //    {
        //        return this.rowsField;
        //    }
        //    set
        //    {
        //        this.rowsField = value;
        //    }
        //}

        //public string columns
        //{
        //    get
        //    {
        //        return this.columnsField;
        //    }
        //    set
        //    {
        //        this.columnsField = value;
        //    }
        //}

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
        public int Pages { get; set; }

        public List<Page> Page { get; set; }
        public string description { get; set; }
        public List<List<HeaderTable>> headerTable { get; set; }
        public List<List<FooterTable>> footerTable { get; set; }

        public List<List<HeaderTable>> titleTable { get; set; }

        public List<BodyTable> bodyData { get; set; }
        public bool IsParent { get; set; }

        public string DocumentTitle { get; set; }
        public string DocumentNo { get; set; }
        public int Version { get; set; }
        public int Supersedes { get; set; }
        public string Department { get; set; }
        public string EffectiveDate { get; set; }
        public string ReviewDate { get; set; }
        public string ReviewedBy { get; set; }
        public string ApprovedBy { get; set; }
        public string PreparedBy { get; set; }
        public string ApprovedDept { get; set; }
        public string ReviewedDept { get; set; }
        public string PrepareDept { get; set; }
        public string ApprovedRole { get; set; }
        public string ReviewedRole { get; set; }
        public string PreparedRole { get; set; }
        public string PreparedDate { get; set; }
        public string PrintCopy { get; set; }
        public string PrintReason { get; set; }
        public string PrintCount { get; set; }
        public string BatchNumber { get; set; }
        public string BatchSize { get; set; }
        public bool IsClone { get; set; }
        public int PreparationId { get; set; }
        public string CloneTemp { get; set; }
        public string FormatNo { get; set; }
        public string ReviewDates { get; set; }
        public string ApproveDates { get; set; }
        public string PreparedDates { get; set; }
        public int RevisionNumber { get; set; }

    }
    public class Page
    {
        public string header { get; set; }

        public string footer { get; set; }
        public string text { get; set; }
        public int pagenumber { get; set; }

        public string pagetype { get; set; }
        public bool istext { get; set; }
        public bool isgrid { get; set; }

        public bool istextposition { get; set; }
        public List<List<BodyDataElement>> bodyData { get; set; }
    }

    public class HeaderTable
    {
        public int selectedOption { get; set; }
        public string inputValue { get; set; }
    }
    public class FooterTable
    {
        public int selectedOption { get; set; }
        public string inputValue { get; set; }
    }
    public class BodyDataElement
    {
        public int selectedOption { get; set; }
        public string inputValue { get; set; }
    }

    public class BodyTable
    {
        public string text { get; set; }
        public int pagenumber { get; set; }
        public string pagetype { get; set; }
       
        public List<BodyDataElement> bodyData { get; set; }

        
    }
}
