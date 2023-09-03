  CREATE PROCEDURE [dbo].[USP_DocumentPrint_PSY_GET] @DRId_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT DRId_PSY,
DP.documenttitle_PSY,
printtype_PSY,
DP.documentno_PSY,
noofcopies_PSY,
workflow_PSY,
reason_PSY,
DP.CreatedBy_PSY,
DP.CreatedDate_PSY,
DP.ModifiedBy_PSY,
DP.ModifiedDate_PSY,DP.Status_PSY,DSP.template_PSY 
  FROM [dbo].[DocumentPrint_PSY] DP WITH (NOLOCK)
  JOIN dbo.DocumentEffective_PSY DE ON DE.Refrence_PSY=DP.Refrence_PSY
 JOIN dbo.DocumentPreparation_PSY DSP ON DSP.Refrence_PSY=DE.Refrence_PSY
  where [DRId_PSY] = @DRId_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END