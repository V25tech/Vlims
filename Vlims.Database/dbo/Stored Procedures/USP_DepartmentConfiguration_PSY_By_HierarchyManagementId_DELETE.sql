  CREATE PROCEDURE [dbo].[USP_DepartmentConfiguration_PSY_By_HierarchyManagementId_DELETE] @HierarchyManagementId int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[DepartmentConfiguration_PSY]  WHERE HierarchyManagementId_PSY IN (@HierarchyManagementId) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END