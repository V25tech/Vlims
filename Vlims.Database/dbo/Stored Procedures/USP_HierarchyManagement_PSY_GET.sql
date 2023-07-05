  CREATE PROCEDURE [dbo].[USP_HierarchyManagement_PSY_GET] @HMId_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT HMId_PSY,
AdminManagerId_PSY,
DepartmentConfiguration_PSY,
RoleConfiguration_PSY,
SetFunctionalProfile_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[HierarchyManagement_PSY] WITH (NOLOCK) where [HMId_PSY] = @HMId_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END