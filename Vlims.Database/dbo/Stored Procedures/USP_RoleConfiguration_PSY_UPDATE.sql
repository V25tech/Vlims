  CREATE PROCEDURE [dbo].[USP_RoleConfiguration_PSY_UPDATE] @ROCFId_PSY int, @HierarchyManagementId_PSY NVarChar(50),
@Role_PSY NVarChar(50),
@Department_PSY NVarChar(50),
@Comments_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[RoleConfiguration_PSY] SET HierarchyManagementId_PSY=@HierarchyManagementId_PSY,
Role_PSY=@Role_PSY,
Department_PSY=@Department_PSY,
Comments_PSY=@Comments_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [ROCFId_PSY] = @ROCFId_PSY ;  select @ROCFId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END