using System;
using System.Collections.Generic;

namespace PolicySummary.Common.Entities
{

    public class RequestContext
    {

        private int pagenumberField = 1;

        private int pagesizeField = 9999;

        public int PageNumber
        {
            get
            {
                return this.pagenumberField;
            }
            set
            {
                this.pagenumberField = value;
            }
        }

        public int PageSize
        {
            get
            {
                return this.pagesizeField;
            }
            set
            {
                this.pagesizeField = value;
            }
        }
    }
}
