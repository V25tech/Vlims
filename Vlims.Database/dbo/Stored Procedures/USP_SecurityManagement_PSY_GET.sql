  CREATE PROCEDURE [dbo].[USP_SecurityManagement_PSY_GET] @SMId_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT SMId_PSY,
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
  FROM [dbo].[SecurityManagement_PSY] WITH (NOLOCK) where [SMId_PSY] = @SMId_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END