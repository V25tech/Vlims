  CREATE PROCEDURE [dbo].[USP_UserGroupConfiguration_PSY_UPDATE] @Ugcid_PSY int, @Usermanagementid_PSY NVarChar(50),
@Usergroupname_PSY NVarChar(50),
@Code_PSY NVarChar(50),
@Users_PSY NVarChar(50),
@Totalusers_PSY Int,
@ModifiedBy_PSY NVarChar(100),
@document_PSY xml
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[UserGroupConfiguration_PSY] SET Usermanagementid_PSY=@Usermanagementid_PSY,
Usergroupname_PSY=@Usergroupname_PSY,
Code_PSY=@Code_PSY,
Users_PSY=@Users_PSY,
Totalusers_PSY=@Totalusers_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY,document_PSY=@document_PSY WHERE  [Ugcid_PSY] = @Ugcid_PSY ;  select @Ugcid_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END