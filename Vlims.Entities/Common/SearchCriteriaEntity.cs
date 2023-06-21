using System;
using System.Collections.Generic;
using System.Text;

namespace PolicySummary.Common.Entities
{
    public class SearchCriteria : RequestContext
    {
        private List<SearchParameter> searchparametersField;

        public List<SearchParameter> SearchParameters
        {
            get
            {
                return this.searchparametersField;
            }
            set
            {
                this.searchparametersField = value;
            }
        }
    }

    public class SearchParameter
    {

        private string nameField;

        private string valueField;

        public string Name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }

        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }
}
