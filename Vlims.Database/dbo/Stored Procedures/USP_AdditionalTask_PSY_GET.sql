
  CREATE PROCEDURE [dbo].[USP_AdditionalTask_PSY_GET] @ATID_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT ATID_PSY,
DocumentEffective_ID,
AT.CreatedBy_PSY,
AT.CreatedDate_PSY,
AT.ModifiedBy_PSY,
AT.ModifiedDate_PSY,
AT.Status_PSY,
DP.template_PSY,
Version,
 count(*) over() as TotalRows  ,
 de.document_PSY,de.department_PSY,de.documentno_PSY,de.documenttitle_PSY,de.documenttype_PSY,de.EffectiveDate_PSY,de.Reviewdate_PSY,dp.wokflow_PSY
 FROM [dbo].[AdditionalTask_PSY] AT WITH (NOLOCK) inner join DocumentEffective_PSY de on AT.DocumentEffective_ID=de.DEID_PSY 
 INNER JOIN DocumentPreparation_PSY DP ON DP.DPNID_PSY=DE.Documentmanagerid_PSY AND DP.Status_PSY='APPROVED'
 where [ATID_PSY] = @ATID_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END