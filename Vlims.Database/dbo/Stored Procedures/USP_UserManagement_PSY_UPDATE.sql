  CREATE PROCEDURE [dbo].[USP_UserManagement_PSY_UPDATE] @UMId_PSY int, @AdminManagerId_PSY NVarChar(50),
@UserConfiguration_PSY NVarChar(50),
@Status_PSY NVarChar(50),
@UserGroupConfiguration_PSY NVarChar(50),
@AuditLogs_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[UserManagement_PSY] SET AdminManagerId_PSY=@AdminManagerId_PSY,
UserConfiguration_PSY=@UserConfiguration_PSY,
Status_PSY=@Status_PSY,
UserGroupConfiguration_PSY=@UserGroupConfiguration_PSY,
AuditLogs_PSY=@AuditLogs_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [UMId_PSY] = @UMId_PSY ;  select @UMId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END