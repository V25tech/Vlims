
 
 CREATE PROCEDURE [dbo].[USP_DocumentPrint_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1    
 AS   
 BEGIN   
 BEGIN TRY   
 SELECT DRId_PSY,  
documenttitle_PSY,  
printtype_PSY,  
documentno_PSY,  
noofcopies_PSY,  
workflow_PSY,  
reason_PSY,  
CreatedBy_PSY,  
CreatedDate_PSY,  
ModifiedBy_PSY,  
ModifiedDate_PSY,  
Status_PSY,
 count(*) over() as TotalRows   
 FROM [dbo].[DocumentPrint_PSY] WITH (NOLOCK)   
 Order by [DRId_PSY]    
 OFFSET @PageSize * (@PageNumber - 1) ROWS   
  FETCH NEXT @PageSize ROWS ONLY;   
  END TRY   
 BEGIN CATCH   
  SELECT ERROR_MESSAGE();   
 END CATCH   
 END