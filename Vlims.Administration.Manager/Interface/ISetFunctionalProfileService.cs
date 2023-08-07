

using System;
using System.Text;
using System.IO;
using System.Linq;
using System.Data;
using System.Collections.Generic;
using Vlims.Common;


// Comment
public interface ISetFunctionalProfileService
{

    ResponseContext<SetFunctionalProfile> GetAllSetFunctionalProfile(RequestContext requestContext);

    //SetFunctionalProfile GetSetFunctionalProfileBySFPID(int sFPID);

    bool SaveSetFunctionalProfile(SetFunctionalProfile setFunctionalProfile);

    bool UpdateSetFunctionalProfile(SetFunctionalProfile setFunctionalProfile);

    //bool DeleteSetFunctionalProfileBySFPID(System.Boolean? sFPID);

    //bool DeleteAllSetFunctionalProfile(List<int> sFPIDs);
}

