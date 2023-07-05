  CREATE PROCEDURE [dbo].[USP_HierarchyManagement_PSY_By_AdminManagerId_GET] @AdminManagerId int 
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
  FROM [dbo].[HierarchyManagement_PSY] WITH (NOLOCK) where AdminManagerId_PSY = @AdminManagerId   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END