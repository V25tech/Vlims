  CREATE PROCEDURE [dbo].[USP_UserManagement_PSY_GET] @UMId_PSY int 
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
  FROM [dbo].[UserManagement_PSY] WITH (NOLOCK) where [UMId_PSY] = @UMId_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END