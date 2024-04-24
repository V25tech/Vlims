  CREATE PROCEDURE [dbo].[USP_DocumentPreparation_PSY_GET] @DPNID_PSY int 
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
Status_PSY,Refrence_PSY,IsRevision,
ISNULL((SELECT top(1) CASE WHEN Status_PSY = 'Approved' THEN 1 ELSE 0 END
FROM [dbo].[DocumentEffective_PSY]
WHERE ReferenceGuid_PSY = GUID_DP), 0) AS IsEffApprvd
  FROM [dbo].[DocumentPreparation_PSY] WITH (NOLOCK) where [DPNID_PSY] = @DPNID_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END