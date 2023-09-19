  CREATE PROCEDURE [dbo].[USP_DocumentEffective_PSY_GET] @DEID_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT DE.*,DP.template_PSY,DP.document_PSY as document,DE.Workflow_PSY as wokflow_PSY,DE.Refrence_PSY
  FROM [dbo].[DocumentEffective_PSY] DE WITH (NOLOCK) 
  JOIN dbo.DocumentPreparation_PSY DP ON DP.Refrence_PSY=DE.Refrence_PSY
  where [DEID_PSY] = @DEID_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END