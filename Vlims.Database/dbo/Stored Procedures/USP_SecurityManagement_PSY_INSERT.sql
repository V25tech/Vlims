



  CREATE PROCEDURE [dbo].[USP_SecurityManagement_PSY_INSERT] @AdminManagerId_PSY NVarChar(50),
@MinimumUserIdLength_PSY NVarChar(50),
@MinimumPasswordLength_PSY NVarChar(50),
@PasswordComplexity_PSY Int,
@InvalidAttempts_PSY Int,
@SessionTimeOut_PSY Int,
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
  

  IF EXISTS (SELECT * FROM [SecurityManagement_PSY] )
BEGIN

Select @ID=SMId_PSY from [SecurityManagement_PSY]

UPDATE [SecurityManagement_PSY] SET MinimumUserIdLength_PSY=@MinimumUserIdLength_PSY,
MinimumPasswordLength_PSY=@MinimumPasswordLength_PSY,PasswordComplexity_PSY=@MinimumPasswordLength_PSY,
InvalidAttempts_PSY=@InvalidAttempts_PSY,SessionTimeOut_PSY=@SessionTimeOut_PSY
WHERE SMId_PSY=@ID





END
ELSE
BEGIN
 INSERT INTO [dbo].[SecurityManagement_PSY] 
 (AdminManagerId_PSY,
MinimumUserIdLength_PSY,
MinimumPasswordLength_PSY,
PasswordComplexity_PSY,
InvalidAttempts_PSY,
SessionTimeOut_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY)
 VALUES 
(@AdminManagerId_PSY,
@MinimumUserIdLength_PSY,
@MinimumPasswordLength_PSY,
@PasswordComplexity_PSY,
@InvalidAttempts_PSY,
@SessionTimeOut_PSY,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate() );END

  

 SELECT @ID = @@IDENTITY; 
 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END