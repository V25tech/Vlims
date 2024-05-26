

 CREATE PROCEDURE [dbo].[USP_DepartmentConfiguration_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
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
 ,count(*) over() as TotalRows 
 FROM [dbo].[DepartmentConfiguration_PSY] WITH (NOLOCK) 
 Order by ModifiedDate_PSY desc  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END