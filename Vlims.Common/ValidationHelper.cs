using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Vlims.Common
{
    public class ValidationHelper
    {
        public string LengthCheckValidator(string instance, int length, string instanceName)
        {
            if (!string.IsNullOrEmpty(instance))
            {
                if (instance.Length > length)
                {
                    return ValidateHelperConstants.lengthCheckValidate(instanceName);
                }

                return "";
            }

            return "";
        }

        public string RequireCheckValidator(object objInstance, string instanceName)
        {
            if (objInstance == null || objInstance == "")
            {
                return ValidateHelperConstants.nullCheckValidate(instanceName);
            }

            if (objInstance.GetType().Name == "Int32" && Convert.ToInt32(objInstance) != 0)
            {
                return ValidateHelperConstants.integerValueCheck(instanceName);
            }

            if (objInstance.GetType().Name == "Decimal" && Convert.ToDecimal(objInstance) <= 0m)
            {
                return ValidateHelperConstants.integerValueCheck(instanceName);
            }

            if (objInstance.GetType().Name == "Double" && Convert.ToDouble(objInstance) <= 0.0)
            {
                return ValidateHelperConstants.doubleValueCheck(instanceName);
            }

            return "";
        }

        public string NullCheckValidator(string instance, string instanceName)
        {
            if (string.IsNullOrEmpty(instance))
            {
                return ValidateHelperConstants.nullCheckValidate(instanceName);
            }

            return "";
        }

        public string EmailCheckValidator(string instance, string instanceName)
        {
            if (!string.IsNullOrEmpty(instance))
            {
                if (!Regex.IsMatch(instance, "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z\\s]{2,100}$", RegexOptions.IgnoreCase))
                {
                    return ValidateHelperConstants.PatternCheckValidate(instanceName);
                }

                return "";
            }

            return "";
        }

        public string PhoneNumberCheckValidator(string instance, string instanceName)
        {
            if (!string.IsNullOrEmpty(instance))
            {
                if (!Regex.IsMatch(instance, "\\(?\\d{3}\\)?-? *\\d{3}-? *-?\\d{4}", RegexOptions.IgnoreCase))
                {
                    return ValidateHelperConstants.PatternCheckValidate(instanceName);
                }

                return "";
            }

            return "";
        }

        public string UrlCheckValidator(string instance, string instanceName)
        {
            if (!string.IsNullOrEmpty(instance))
            {
                if (!Regex.IsMatch(instance, "^(((https?:\\/\\/www\\.)|(https?:\\/\\/)|(www\\.))([A-Za-z0-9-\\.]{1,100})\\.([A-Za-z0-9-\\.]{2,6}))|(((https?:\\/\\/WWW\\.)|(https?:\\/\\/)|(WWW\\.))([A-Za-z0-9-\\.]{1,100})\\.([A-Za-z0-9-\\.]{2,6}))", RegexOptions.IgnoreCase))
                {
                    return ValidateHelperConstants.PatternCheckValidate(instanceName);
                }

                return "";
            }

            return "";
        }

        public string NameCheckValidator(string instance, string instanceName)
        {
            if (!string.IsNullOrEmpty(instance))
            {
                if (!Regex.IsMatch(instance, "^[A-Za-z0-9-_()'@,;: ]*$", RegexOptions.IgnoreCase))
                {
                    return ValidateHelperConstants.PatternCheckValidate(instanceName);
                }

                return "";
            }

            return "";
        }

        public string CodeCheckValidator(string instance, string instanceName)
        {
            if (!string.IsNullOrEmpty(instance))
            {
                if (!Regex.IsMatch(instance, "^[A-Za-z0-9? ,_-]+$", RegexOptions.IgnoreCase))
                {
                    return ValidateHelperConstants.PatternCheckValidate(instanceName);
                }

                return "";
            }

            return "";
        }

        public string StreetCheckValidator(string instance, string instanceName)
        {
            if (!string.IsNullOrEmpty(instance))
            {
                if (!Regex.IsMatch(instance, "^[A-Za-z0-9\\(\\).,:;_'/#@&?\\-\\ ]*$", RegexOptions.IgnoreCase))
                {
                    return ValidateHelperConstants.PatternCheckValidate(instanceName);
                }

                return "";
            }

            return "";
        }

        public string ZipcodeCheckValidator(string instance, string instanceName)
        {
            if (!string.IsNullOrEmpty(instance))
            {
                if (!Regex.IsMatch(instance, "^\\[0-9]d{5}$", RegexOptions.IgnoreCase))
                {
                    return ValidateHelperConstants.PatternCheckValidate(instanceName);
                }

                return "";
            }

            return "";
        }

        public string DateTimeCheckValidator(DateTime dateTime, string instanceName)
        {
            if (!string.IsNullOrEmpty(dateTime.ToString()))
            {
                if (dateTime < DateTime.Now)
                {
                    return ValidateHelperConstants.PatternCheckValidate(instanceName);
                }

                return "";
            }

            return "";
        }
    }

    public class ValidateHelperConstants
    {
        public static string nullCheckValidate(string field)
        {
            return field + " can not be null,";
        }

        public static string integerValueCheck(string field)
        {
            return field + " value should be greater than zero,";
        }

        public static string doubleValueCheck(string field)
        {
            return field + " value should be greater than 0.0,";
        }

        public static string lengthCheckValidate(string field)
        {
            return field + " length should not exceed,";
        }

        public static string dataTypeCheckValidate(string field)
        {
            return field + " type is not matching,";
        }

        public static string PatternCheckValidate(string field)
        {
            return "Please provide valid " + field + ",";
        }
    }

}
