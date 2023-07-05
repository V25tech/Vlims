  CREATE PROCEDURE [dbo].[USP_PlantManagement_PSY_INSERT] @AdminManagerId_PSY NVarChar(50),
@PlantName_PSY NVarChar(50),
@PlantCode_PSY NVarChar(50),
@PlantAddress_PSY NVarChar(50),
@Comments_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[PlantManagement_PSY] 
 (AdminManagerId_PSY,
PlantName_PSY,
PlantCode_PSY,
PlantAddress_PSY,
Comments_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY)
 VALUES 
(@AdminManagerId_PSY,
@PlantName_PSY,
@PlantCode_PSY,
@PlantAddress_PSY,
@Comments_PSY,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate() );
 SELECT @ID = @@IDENTITY; 
 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END