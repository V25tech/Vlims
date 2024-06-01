CREATE PROCEDURE [dbo].[USP_DocumentTemplateConfiguration_TEMPLATE_GET_1] @TemplateName_PSY Varchar(200),@PrepId int=0 
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
ModifiedDate_PSY ,
Status_PSY,IsClone,PreparationId,
(SELECT Templatename_PSY FROM DocumentTemplateConfiguration_PSY WHERE PreparationId=@PrepId and IsClone=1) as CloneTemplate,
(SELECT document_PSY FROM DocumentTemplateConfiguration_PSY WHERE PreparationId=@PrepId and IsClone=1) as CloneDoc
  FROM [dbo].[DocumentTemplateConfiguration_PSY] WITH (NOLOCK) where Templatename_PSY = @TemplateName_PSY  
  
  -- PLANT NAME AND PLANT ADDRESS INFO
  SELECT TOP(1) PlantName_PSY, PlantAddress_PSY FROM dbo.PlantManagement_PSY Order by ModifiedDate_PSY DESC
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END