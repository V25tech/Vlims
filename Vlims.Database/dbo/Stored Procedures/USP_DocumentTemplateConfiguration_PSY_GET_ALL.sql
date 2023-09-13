

 CREATE PROCEDURE [dbo].[USP_DocumentTemplateConfiguration_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
 AS 
 BEGIN 
 BEGIN TRY 
 SELECT DTID_PSY,
DocumentMasterId_PSY,
Templatename_PSY,
Uniquecode_PSY,
documenttype_PSY,
description_PSY,
header_PSY,
rows_PSY,
columns_PSY,
footer_PSY,
rows_PSY,
footer_rows_PSY,
footer_columns_PSY,
columns_PSY,
document_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,
Status_PSY,
(SELECT DBO.USP_DOCUMENT_TEMPLATE_WHEREUSED (Templatename_PSY)) AS IsParent
 ,count(*) over() as TotalRows 
 FROM [dbo].[DocumentTemplateConfiguration_PSY] WITH (NOLOCK) 
 Order by DTID_PSY DESC
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END