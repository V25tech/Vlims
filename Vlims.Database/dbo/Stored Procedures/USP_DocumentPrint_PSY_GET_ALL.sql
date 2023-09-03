

 
 CREATE PROCEDURE [dbo].[USP_DocumentPrint_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1    
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
DP.ModifiedDate_PSY,  
DP.Status_PSY,DSP.template_PSY,
 count(*) over() as TotalRows   
 FROM [dbo].[DocumentPrint_PSY] DP WITH (NOLOCK)  
 JOIN dbo.DocumentEffective_PSY DE ON DE.Documentmanagerid_PSY=DP.Refrence_PSY
 JOIN dbo.DocumentPreparation_PSY DSP ON DSP.DPNID_PSY=DE.Documentmanagerid_PSY
 Order by DP.CreatedDate_PSY desc    
 OFFSET @PageSize * (@PageNumber - 1) ROWS   
  FETCH NEXT @PageSize ROWS ONLY;   
  END TRY   
 BEGIN CATCH   
  SELECT ERROR_MESSAGE();   
 END CATCH   
 END