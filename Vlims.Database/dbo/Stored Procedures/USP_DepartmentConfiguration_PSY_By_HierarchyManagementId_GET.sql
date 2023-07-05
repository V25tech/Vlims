  CREATE PROCEDURE [dbo].[USP_DepartmentConfiguration_PSY_By_HierarchyManagementId_GET] @HierarchyManagementId int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT DPCFId_PSY,
HierarchyManagementId_PSY,
DepartmentName_PSY,
DepartmentCode_PSY,
Comments_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[DepartmentConfiguration_PSY] WITH (NOLOCK) where HierarchyManagementId_PSY = @HierarchyManagementId   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END