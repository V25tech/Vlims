 CREATE PROCEDURE [dbo].[USP_HierarchyManagement_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
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
 ,count(*) over() as TotalRows 
 FROM [dbo].[HierarchyManagement_PSY] WITH (NOLOCK) 
 Order by [HMId_PSY]  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END