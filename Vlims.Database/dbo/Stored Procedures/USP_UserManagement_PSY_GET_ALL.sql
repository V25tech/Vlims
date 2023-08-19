

 CREATE PROCEDURE [dbo].[USP_UserManagement_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
 AS 
 BEGIN 
 BEGIN TRY 
 SELECT UMId_PSY,
AdminManagerId_PSY,
UserConfiguration_PSY,
Status_PSY,
UserGroupConfiguration_PSY,
AuditLogs_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY  
 ,count(*) over() as TotalRows 
 FROM [dbo].[UserManagement_PSY] WITH (NOLOCK) 
 Order by CreatedDate_PSY desc  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END