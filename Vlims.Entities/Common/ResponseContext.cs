using System;
using System.Collections.Generic;
using System.Text;

namespace PolicySummary.Common.Entities
{
    public class ResponseContext<T>
    {
        private int rowCountField = 0;
        public int RowCount
        {
            get
            {
                return this.rowCountField;
            }
            set
            {
                this.rowCountField = value;
            }
        }

        private List<T> responseField;

        public List<T> Response
        {
            get
            {
                return responseField;
            }
            set
            {
                responseField = value;
            }
        }

    }
}

