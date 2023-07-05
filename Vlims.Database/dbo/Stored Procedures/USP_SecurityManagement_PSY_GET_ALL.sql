 CREATE PROCEDURE [dbo].[USP_SecurityManagement_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
 AS 
 BEGIN 
 BEGIN TRY 
 SELECT SMId_PSY,
AdminManagerId_PSY,
MinimumUserIdLength_PSY,
MinimumPasswordLength_PSY,
PasswordComplexity_PSY,
InvalidAttempts_PSY,
SessionTimeOut_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY  
 ,count(*) over() as TotalRows 
 FROM [dbo].[SecurityManagement_PSY] WITH (NOLOCK) 
 Order by [SMId_PSY]  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END