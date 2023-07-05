  CREATE PROCEDURE [dbo].[USP_noticationconfiguration_PSY_UPDATE] @NCId_PSY int, @DocumentMasterId_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[noticationconfiguration_PSY] SET DocumentMasterId_PSY=@DocumentMasterId_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [NCId_PSY] = @NCId_PSY ;  select @NCId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END