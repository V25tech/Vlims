  CREATE PROCEDURE [dbo].[USP_DocumentEffective_PSY_GET] @DEID_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT DEID_PSY,
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
  FROM [dbo].[DocumentEffective_PSY] WITH (NOLOCK) where [DEID_PSY] = @DEID_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END