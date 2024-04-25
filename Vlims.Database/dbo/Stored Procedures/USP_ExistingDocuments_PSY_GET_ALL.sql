CREATE PROCEDURE [dbo].[USP_ExistingDocuments_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1, @UserName varchar(50) = null
 AS 
 BEGIN 
 BEGIN TRY 
 
  SELECT ATID_PSY as ID_PSY,
AT.DocumentEffective_ID,
AT.CreatedBy_PSY,
AT.CreatedDate_PSY,
AT.ModifiedBy_PSY,
AT.ModifiedDate_PSY,
--AT.Status_PSY,
DP.template_PSY,
AT.GUID_AD AS document_PSY,
'New Document' as TableName_PSY,

Version,AT.Refrence_PSY,DP.DPNID_PSY,
 count(*) over() as TotalRows  ,
 de.document_PSY,de.department_PSY,de.documentno_PSY,de.documenttitle_PSY,de.documenttype_PSY,de.EffectiveDate_PSY,de.Reviewdate_PSY,DP.wokflow_PSY

 FROM [dbo].[AdditionalTask_PSY] AT WITH (NOLOCK) inner join DocumentEffective_PSY de on AT.DocumentEffective_ID=de.DEID_PSY
 INNER JOIN DocumentPreparation_PSY DP ON DP.DPNID_PSY=DE.Documentmanagerid_PSY AND DP.Status_PSY='APPROVED' --where AT.CreatedBy_PSY = @UserName
 
 Order by AT.CreatedDate_PSY DESC  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 


 SELECT EDRId_PSY as ID_PSY,
documentno_PSY,
documenttitle_PSY,
documenttype_PSY,
department_PSY,
document_PSY,
Effectivedate_PSY,
Reviewdate_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,
'Existing Document' as TableName_PSY

 ,count(*) over() as TotalRows 
 FROM [dbo].ExistingDocumentRequest_PSY WITH (NOLOCK) --where CreatedBy_PSY = @UserName
 Order by EDRId_PSY DESC
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END