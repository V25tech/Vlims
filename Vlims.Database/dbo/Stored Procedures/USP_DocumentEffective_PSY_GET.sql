  CREATE PROCEDURE [dbo].[USP_DocumentEffective_PSY_GET] @DEID_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT DE.*,DP.template_PSY,DP.document_PSY as document
  FROM [dbo].[DocumentEffective_PSY] DE WITH (NOLOCK) 
  JOIN dbo.DocumentPreparation_PSY DP ON DP.DPNID_PSY=DE.Documentmanagerid_PSY
  where [DEID_PSY] = @DEID_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END