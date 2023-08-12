
 CREATE PROCEDURE [dbo].[USP_DocumentEffective_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
 AS 
 BEGIN 
 BEGIN TRY 
 SELECT DE.*
 ,count(*) over() as TotalRows 
 FROM [dbo].[DocumentEffective_PSY] DE WITH (NOLOCK)
--INNER JOIN dbo.DocumentPreparation_PSY DP ON DE.Refrence_PSY=DP.Refrence_PSY AND DP.Status_PSY='APPROVED'
 Order by [DEID_PSY]  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END