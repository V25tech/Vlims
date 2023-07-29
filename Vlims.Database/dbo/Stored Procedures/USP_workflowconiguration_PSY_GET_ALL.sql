 CREATE PROCEDURE [dbo].[USP_workflowconiguration_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
 AS 
 BEGIN 
 BEGIN TRY 
 SELECT WFCId_PSY,
DocumentMasterId_PSY,
documentstage_PSY,
workflowName_PSY,
code_PSY,
documenttype_PSY,
department_PSY,
reviewsCount_PSY,
approvalsCount_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,
Status_PSY
 ,count(*) over() as TotalRows 
 FROM [dbo].[workflowconiguration_PSY] WITH (NOLOCK) 
 Order by [WFCId_PSY]  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END