

  CREATE PROCEDURE [dbo].[USP_AUDIT_LOG_PSY_INSERT] @EntityName NVarChar(150),
@UserName NVarChar(150),
@Message NVarChar(500),
@Type NVarChar(100),
@Action NVarChar(100),
@CreatedDate NVarChar(50),
@state NVarChar(50)

 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[AUDIT_LOG_PSY]
           ([UserName]
           ,[EntityName]
           ,[Message]
           ,[Type]
           ,[Action]
           ,[CreatedDate]
           ,[State]
		   )
     VALUES
           (@UserName ,
			@EntityName ,
			@Message ,
			@Type ,
			@Action ,
			@CreatedDate ,
			@state )
 SELECT @ID = @@IDENTITY; 
 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END