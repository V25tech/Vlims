  CREATE PROCEDURE [dbo].[USP_SecurityManagement_PSY_By_AdminManagerId_GET] @AdminManagerId int 
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
  FROM [dbo].[SecurityManagement_PSY] WITH (NOLOCK) where AdminManagerId_PSY = @AdminManagerId   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END