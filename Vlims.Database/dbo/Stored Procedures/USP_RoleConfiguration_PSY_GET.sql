  CREATE PROCEDURE [dbo].[USP_RoleConfiguration_PSY_GET] @ROCFId_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT ROCFId_PSY,
HierarchyManagementId_PSY,
Role_PSY,
Department_PSY,
Comments_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[RoleConfiguration_PSY] WITH (NOLOCK) where [ROCFId_PSY] = @ROCFId_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END