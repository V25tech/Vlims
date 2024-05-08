--Exec  [dbo].[USP_UserConfiguration_PSY_UPDATE_PWD]  'sagarteja','rst@456','rst@1234'
  CREATE PROCEDURE [dbo].[USP_UserConfiguration_PSY_UPDATE_PWD] 
@UserID_PSY NVarChar(50),
@Password_PSY NVarchar(500),
@Oldpassword NVarchar(100)
 AS 
 BEGIN 
  BEGIN TRY 
  
  IF((SELECT COUNT(*) FROM [UserConfiguration_PSY] WHERE UserID_PSY=@UserID_PSY and Password_PSY=@Oldpassword) > 0)
	BEGIN
	
	UPDATE [dbo].[UserConfiguration_PSY] SET 
UserID_PSY=@UserID_PSY,
Password_PSY=@Password_PSY, ModifiedDate_PSY=GETDATE()
WHERE  UserID_PSY = @UserID_PSY ;  select 'Success';

	END
	ELSE
	BEGIN
	Select 'Old Password Incorrect'
	END
	
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END