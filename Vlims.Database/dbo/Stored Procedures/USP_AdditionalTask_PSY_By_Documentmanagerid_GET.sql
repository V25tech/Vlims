  CREATE PROCEDURE [dbo].[USP_AdditionalTask_PSY_By_Documentmanagerid_GET] @Documentmanagerid int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT ATID_PSY,
DocumentEffective_Id,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[AdditionalTask_PSY] WITH (NOLOCK) where DocumentEffective_Id = @Documentmanagerid   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END