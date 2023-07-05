  CREATE PROCEDURE [dbo].[USP_UserConfiguration_PSY_UPDATE] @UCFId_PSY int, @UserManagementID_PSY NVarChar(50),
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
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[UserConfiguration_PSY] SET UserManagementID_PSY=@UserManagementID_PSY,
FirstName_PSY=@FirstName_PSY,
LastName_PSY=@LastName_PSY,
UserID_PSY=@UserID_PSY,
Department_PSY=@Department_PSY,
Role_PSY=@Role_PSY,
Doj_PSY=@Doj_PSY,
Empid_PSY=@Empid_PSY,
EmailId_PSY=@EmailId_PSY,
Activedirectory_PSY=@Activedirectory_PSY,
Standarduser_PSY=@Standarduser_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [UCFId_PSY] = @UCFId_PSY ;  select @UCFId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END