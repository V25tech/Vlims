  CREATE PROCEDURE [dbo].[USP_UserGroupConfiguration_PSY_GET] @Ugcid_PSY int 
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
  FROM [dbo].[UserGroupConfiguration_PSY] WITH (NOLOCK) where [Ugcid_PSY] = @Ugcid_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END