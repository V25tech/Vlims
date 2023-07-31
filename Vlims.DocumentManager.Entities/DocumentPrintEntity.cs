
    using System;
    using System.Collections.Generic;
    
    
    // Comment
    public class DocumentPrint
    {
        
        private string dridField;
        
        private string documenttitleField;
        
        private string printtypeField;
        
        private string documentnoField;
        
        private string noofcopiesField;
        
        private string workflowField;
        
        private string reasonField;
        
        private string createdbyField;
        
        private DateTime? createddateField;
        
        private string modifiedbyField;
        
        private DateTime? modifieddateField;
        
        public string DRId
        {
            get
            {
                return this.dridField;
            }
            set
            {
                this.dridField = value;
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
        
        public string printtype
        {
            get
            {
                return this.printtypeField;
            }
            set
            {
                this.printtypeField = value;
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
        
        public string noofcopies
        {
            get
            {
                return this.noofcopiesField;
            }
            set
            {
                this.noofcopiesField = value;
            }
        }
        
        public string workflow
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
        
        public string reason
        {
            get
            {
                return this.reasonField;
            }
            set
            {
                this.reasonField = value;
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

