  CREATE PROCEDURE [dbo].[USP_workflowconiguration_PSY_GET] @WFCId_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT WFCId_PSY,
DocumentMasterId_PSY,
documentstage_PSY,
documenttype_PSY,
department_PSY,
reviewsCount_PSY,
approvalsCount_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY ,
Status_PSY
  FROM [dbo].[workflowconiguration_PSY] WITH (NOLOCK) where [WFCId_PSY] = @WFCId_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END