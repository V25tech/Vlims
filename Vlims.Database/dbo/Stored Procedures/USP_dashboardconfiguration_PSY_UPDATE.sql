  CREATE PROCEDURE [dbo].[USP_dashboardconfiguration_PSY_UPDATE] @DCId_PSY int, @DocumentMasterId NVarChar(50),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[dashboardconfiguration_PSY] SET DocumentMasterId=@DocumentMasterId,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [DCId_PSY] = @DCId_PSY ;  select @DCId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END