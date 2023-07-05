  CREATE PROCEDURE [dbo].[USP_UserManagement_PSY_INSERT] @AdminManagerId_PSY NVarChar(50),
@UserConfiguration_PSY NVarChar(50),
@Status_PSY NVarChar(50),
@UserGroupConfiguration_PSY NVarChar(50),
@AuditLogs_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[UserManagement_PSY] 
 (AdminManagerId_PSY,
UserConfiguration_PSY,
Status_PSY,
UserGroupConfiguration_PSY,
AuditLogs_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY)
 VALUES 
(@AdminManagerId_PSY,
@UserConfiguration_PSY,
@Status_PSY,
@UserGroupConfiguration_PSY,
@AuditLogs_PSY,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate() );
 SELECT @ID = @@IDENTITY; 
 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END