using System;
using System.Collections.Generic;
using System.Text;

namespace Vlims.Common
{
    public class DatatypeConverter
    {
        public static DateTime? SetDateTime(object val)
        {
            if (val is DBNull) return null;
            return Convert.ToDateTime(val);
        }

        public static System.Int32? SetIntValue(object val)
        {
            if (val is DBNull) return null;
            return Convert.ToInt32(val);
        }

        public static System.Boolean? SetBoolValue(object val)
        {
            if (val is DBNull) return null;
            return Convert.ToBoolean(val);
        }

        public static System.Decimal? SetDecimalValue(object val)
        {
            if (val is DBNull) return null;
            return Convert.ToDecimal(val);
        }

        public static System.Double? SetDoubleValue(object val)
        {
            if (val is DBNull) return null;
            return Convert.ToDouble(val);
        }
    }
}

