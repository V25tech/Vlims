  CREATE PROCEDURE [dbo].[USP_UserConfiguration_PSY_GET] @UCFId_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT UCFId_PSY,
UserManagementID_PSY,
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
ModifiedDate_PSY 
  FROM [dbo].[UserConfiguration_PSY] WITH (NOLOCK) where [UCFId_PSY] = @UCFId_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END