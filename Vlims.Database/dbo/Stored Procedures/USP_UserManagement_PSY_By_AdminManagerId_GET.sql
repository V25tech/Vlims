  CREATE PROCEDURE [dbo].[USP_UserManagement_PSY_By_AdminManagerId_GET] @AdminManagerId int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT UMId_PSY,
AdminManagerId_PSY,
UserConfiguration_PSY,
Status_PSY,
UserGroupConfiguration_PSY,
AuditLogs_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[UserManagement_PSY] WITH (NOLOCK) where AdminManagerId_PSY = @AdminManagerId   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END