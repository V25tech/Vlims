
using System;
using System.Text;
using System.IO;
using System.Linq;
using System.Data;
using System.Collections.Generic;
using Newtonsoft.Json;
using Vlims.Common;
using Vlims.Administration.Entities;
using System.Xml.Serialization;
using Vlims.Data;



// Comment
public static class SetFunctionalProfileConverter
{

    public static List<setfuctionalprofile> SetAllSetFunctionalProfile(DataSet dataset)
    {
        try
        {
            List<setfuctionalprofile> result = new List<setfuctionalprofile>();
            setfuctionalprofile setFunctionalProfileData;
            if (dataset != null && dataset.Tables.Count > 0 && dataset.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; (i < dataset.Tables[0].Rows.Count); i = (i + 1))
                {
                    DataRow row = dataset.Tables[0].Rows[i];
                    setFunctionalProfileData = new setfuctionalprofile();
                    setFunctionalProfileData.sfpid = Convert.ToInt16(row[SetFunctionalProfileConstants.SFPID.Trim('@')]);
                    int id = setFunctionalProfileData.sfpid;
                    setFunctionalProfileData.role = row[SetFunctionalProfileConstants.Role.Trim('@')].ToString();
                    setFunctionalProfileData.RevisionNumber = Convert.ToInt32(row[SetFunctionalProfileConstants.RevisionNumber.Trim('@')]);

                    string docvalue = Convert.ToString(row[SetFunctionalProfileConstants.Document.Trim('@')]);
                    if (!string.IsNullOrEmpty(docvalue))
                    {
                        // Create an XmlSerializer for the Person type
                        var serializer1 = new XmlSerializer(typeof(setfuctionalprofile));
                        // Create a StringReader to read the XML data
                        var reader = new StringReader(Convert.ToString(row[SetFunctionalProfileConstants.Document.Trim('@')]));
                        // Deserialize the XML data back to a Person object
                        var person = (setfuctionalprofile)serializer1.Deserialize(reader);
                        setFunctionalProfileData = person;
                        setFunctionalProfileData.sfpid = id;
                    }
                    result.Add(setFunctionalProfileData);
                }
            }
            return result;
        }
        catch (System.Exception ex)
        {
            throw;
        }
    }

    public static setfuctionalprofile SetSetFunctionalProfile(DataSet dataset)
    {
        var result = SetAllSetFunctionalProfile(dataset);
        if (result.Count > 0)
        {
            return result.FirstOrDefault();
        }
        return null;
    }
}

