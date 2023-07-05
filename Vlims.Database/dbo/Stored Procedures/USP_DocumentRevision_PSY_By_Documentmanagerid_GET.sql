  CREATE PROCEDURE [dbo].[USP_DocumentRevision_PSY_By_Documentmanagerid_GET] @Documentmanagerid int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT DRId_PSY,
Documentmanagerid_PSY,
documenttitle_PSY,
documentno_PSY,
documenttype_PSY,
department_PSY,
document_PSY,
EffectiveDate_PSY,
Reviewdate_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[DocumentRevision_PSY] WITH (NOLOCK) where Documentmanagerid_PSY = @Documentmanagerid   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END