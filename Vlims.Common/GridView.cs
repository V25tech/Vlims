using System;
using System.Collections.Generic;
using System.Text;

namespace Vlims.Common
{
    public class GridView
    {
        public List<GridHeder> GridHeders { get; set; }
        public List<Dictionary<string, string>> GridRows { get; set; }
        public string GridName { get; set; }
        public int TotalRows { get; set; }
    }
    public class GridHeder
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
    }
}
