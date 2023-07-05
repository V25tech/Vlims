  CREATE PROCEDURE [dbo].[USP_DepartmentConfiguration_PSY_GET] @DPCFId_PSY int 
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
  FROM [dbo].[DepartmentConfiguration_PSY] WITH (NOLOCK) where [DPCFId_PSY] = @DPCFId_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END