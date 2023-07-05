  CREATE PROCEDURE [dbo].[USP_AdditionalTask_PSY_UPDATE] @ATID_PSY int, @Documentmanagerid_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[AdditionalTask_PSY] SET Documentmanagerid_PSY=@Documentmanagerid_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [ATID_PSY] = @ATID_PSY ;  select @ATID_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END