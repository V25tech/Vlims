  CREATE PROCEDURE [dbo].[USP_DocumentPreparation_PSY_By_Documentmanagerid_GET] @Documentmanagerid int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT DPNID_PSY,
Documentmanagerid_PSY,
documenttitle_PSY,
documentno_PSY,
documenttype_PSY,
department_PSY,
document_PSY,
template_PSY,
wokflow_PSY,
details_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[DocumentPreparation_PSY] WITH (NOLOCK) where Documentmanagerid_PSY = @Documentmanagerid   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END