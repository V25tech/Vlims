  CREATE PROCEDURE [dbo].[USP_PlantManagement_PSY_UPDATE] @PMId_PSY int, @AdminManagerId_PSY NVarChar(50),
@PlantName_PSY NVarChar(50),
@PlantCode_PSY NVarChar(50),
@PlantAddress_PSY NVarChar(50),
@Comments_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[PlantManagement_PSY] SET AdminManagerId_PSY=@AdminManagerId_PSY,
PlantName_PSY=@PlantName_PSY,
PlantCode_PSY=@PlantCode_PSY,
PlantAddress_PSY=@PlantAddress_PSY,
Comments_PSY=@Comments_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [PMId_PSY] = @PMId_PSY ;  select @PMId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END