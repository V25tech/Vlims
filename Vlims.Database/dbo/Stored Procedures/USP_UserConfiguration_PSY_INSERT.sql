  CREATE PROCEDURE [dbo].[USP_UserConfiguration_PSY_INSERT] @UserManagementID_PSY NVarChar(50),
@FirstName_PSY NVarChar(50),
@LastName_PSY NVarChar(50),
@UserID_PSY NVarChar(50),
@Department_PSY NVarChar(50),
@Role_PSY NVarChar(50),
@Doj_PSY NVarChar(50),
@Empid_PSY Int,
@EmailId_PSY NVarChar(50),
@Activedirectory_PSY NVarChar(50),
@Standarduser_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[UserConfiguration_PSY] 
 (UserManagementID_PSY,
FirstName_PSY,
LastName_PSY,
UserID_PSY,
Department_PSY,
Role_PSY,
Doj_PSY,
Empid_PSY,
EmailId_PSY,
Activedirectory_PSY,
Standarduser_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,Password_PSY)
 VALUES 
(@UserManagementID_PSY,
@FirstName_PSY,
@LastName_PSY,
@UserID_PSY,
@Department_PSY,
@Role_PSY,
@Doj_PSY,
@Empid_PSY,
@EmailId_PSY,
@Activedirectory_PSY,
@Standarduser_PSY,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate(),'Passw0rd' );
 SELECT @ID = @@IDENTITY; 
 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END