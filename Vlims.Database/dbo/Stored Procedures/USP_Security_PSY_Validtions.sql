--select * from [dbo].[SecurityManagement_PSY]


create procedure USP_Security_PSY_Validtions
As
Begin
  select 
  SMId_PSY,
AdminManagerId_PSY,
MinimumUserIdLength_PSY,
MinimumPasswordLength_PSY,
PasswordComplexity_PSY,
InvalidAttempts_PSY,
SessionTimeOut_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY
from [dbo].[SecurityManagement_PSY]
End