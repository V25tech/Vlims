  CREATE PROCEDURE [dbo].[USP_DocumentPrint_PSY_GET] @DRId_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT DRId_PSY,
documenttitle_PSY,
printtype_PSY,
documentno_PSY,
noofcopies_PSY,
workflow_PSY,
reason_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[DocumentPrint_PSY] WITH (NOLOCK) where [DRId_PSY] = @DRId_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END