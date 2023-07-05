  CREATE PROCEDURE [dbo].[USP_AdimManagement_PSY_UPDATE] @AMId_PSY int, @SecurityManagement_PSY NVarChar(50),
@HierarchyManagement_PSY NVarChar(50),
@PlantManagement_PSY NVarChar(50),
@UserManagement_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[AdimManagement_PSY] SET SecurityManagement_PSY=@SecurityManagement_PSY,
HierarchyManagement_PSY=@HierarchyManagement_PSY,
PlantManagement_PSY=@PlantManagement_PSY,
UserManagement_PSY=@UserManagement_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [AMId_PSY] = @AMId_PSY ;  select @AMId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END