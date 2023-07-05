  CREATE PROCEDURE [dbo].[USP_RoleConfiguration_PSY_By_HierarchyManagementId_GET] @HierarchyManagementId int 
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
  FROM [dbo].[RoleConfiguration_PSY] WITH (NOLOCK) where HierarchyManagementId_PSY = @HierarchyManagementId   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END