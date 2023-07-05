  CREATE PROCEDURE [dbo].[USP_SecurityManagement_PSY_UPDATE] @SMId_PSY int, @AdminManagerId_PSY NVarChar(50),
@MinimumUserIdLength_PSY NVarChar(50),
@MinimumPasswordLength_PSY NVarChar(50),
@PasswordComplexity_PSY Int,
@InvalidAttempts_PSY Int,
@SessionTimeOut_PSY Int,
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[SecurityManagement_PSY] SET AdminManagerId_PSY=@AdminManagerId_PSY,
MinimumUserIdLength_PSY=@MinimumUserIdLength_PSY,
MinimumPasswordLength_PSY=@MinimumPasswordLength_PSY,
PasswordComplexity_PSY=@PasswordComplexity_PSY,
InvalidAttempts_PSY=@InvalidAttempts_PSY,
SessionTimeOut_PSY=@SessionTimeOut_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [SMId_PSY] = @SMId_PSY ;  select @SMId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END