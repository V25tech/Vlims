

 
 CREATE PROCEDURE [dbo].[USP_DocumentPrint_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1    
 AS   
 BEGIN   
 BEGIN TRY   
 SELECT DISTINCT DRId_PSY,  
DP.documenttitle_PSY,  
printtype_PSY,  
DP.documentno_PSY,  
noofcopies_PSY,  
DP.workflow_PSY,  
reason_PSY,  
DP.CreatedBy_PSY,  
DP.CreatedDate_PSY,  
DP.ModifiedBy_PSY,  
DP.ModifiedDate_PSY,  
DP.Status_PSY,DSP.template_PSY,DP.Refrence_PSY,DP.PrintCopy_PSY,
 count(*) over() as TotalRows   
 FROM [dbo].[DocumentPrint_PSY] DP WITH (NOLOCK)  
 JOIN dbo.DocumentPreparation_PSY DSP ON DSP.GUID_DP=DP.ReferenceGuid_PSY
 JOIN dbo.DocumentEffective_PSY DE ON DE.ReferenceGuid_PSY=DSP.GUID_DP
 Order by DP.CreatedDate_PSY desc    
 OFFSET @PageSize * (@PageNumber - 1) ROWS   
  FETCH NEXT @PageSize ROWS ONLY;   
  END TRY   
 BEGIN CATCH   
  SELECT ERROR_MESSAGE();   
 END CATCH   
 END