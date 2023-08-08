
using Vlims.Administration.Entities;
using Vlims.Common;

namespace Vlims.Administration.Manager
{

    // Comment
    public interface ISetFunctionalProfileService
    {

        ResponseContext<setfuctionalprofile> GetAllSetFunctionalProfile(RequestContext requestContext);

        //SetFunctionalProfile GetSetFunctionalProfileBySFPID(int sFPID);

        bool SaveSetFunctionalProfile(setfuctionalprofile setFunctionalProfile);

        bool UpdateSetFunctionalProfile(setfuctionalprofile setFunctionalProfile);

        //bool DeleteSetFunctionalProfileBySFPID(System.Boolean? sFPID);

        //bool DeleteAllSetFunctionalProfile(List<int> sFPIDs);
    }

}
