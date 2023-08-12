

 CREATE PROCEDURE [dbo].[USP_UserGroupConfiguration_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
 AS 
 BEGIN 
 BEGIN TRY 
 SELECT Ugcid_PSY,
Usermanagementid_PSY,
Usergroupname_PSY,
Code_PSY,
Users_PSY,
Totalusers_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,
document_PSY
 ,count(*) over() as TotalRows 
 FROM [dbo].[UserGroupConfiguration_PSY] WITH (NOLOCK) 
 Order by [Ugcid_PSY]  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END