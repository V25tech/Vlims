  CREATE PROCEDURE [dbo].[USP_RoleConfiguration_PSY_By_HierarchyManagementId_DELETE] @HierarchyManagementId int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[RoleConfiguration_PSY]  WHERE HierarchyManagementId_PSY IN (@HierarchyManagementId) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END