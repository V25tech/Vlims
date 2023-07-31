  CREATE PROCEDURE [dbo].[USP_UserGroupConfiguration_PSY_INSERT] @Usermanagementid_PSY NVarChar(50),
@Usergroupname_PSY NVarChar(50),
@Code_PSY NVarChar(50),
@Users_PSY NVarChar(50),
@Totalusers_PSY Int,
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100),
@document_PSY xml
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[UserGroupConfiguration_PSY] 
 (Usermanagementid_PSY,
Usergroupname_PSY,
Code_PSY,
Users_PSY,
Totalusers_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,document_PSY)
 VALUES 
(@Usermanagementid_PSY,
@Usergroupname_PSY,
@Code_PSY,
@Users_PSY,
@Totalusers_PSY,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate(),@document_PSY );
 SELECT @ID = @@IDENTITY; 
 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END