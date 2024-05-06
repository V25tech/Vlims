


 CREATE PROCEDURE [dbo].[USP_DocumentPreparation_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
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
ModifiedDate_PSY,
Status_PSY,IsRevision,Reason,
ISNULL((SELECT top(1) CASE WHEN Status_PSY = 'Approved' THEN 1 ELSE 0 END
FROM [dbo].[DocumentEffective_PSY]
WHERE ReferenceGuid_PSY = DE.GUID_DP), 0) AS IsEffApprvd,
Refrence_PSY
 ,count(*) over() as TotalRows 
 FROM [dbo].[DocumentPreparation_PSY] DE WITH (NOLOCK) 
 Order by CreatedDate_PSY DESC  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END