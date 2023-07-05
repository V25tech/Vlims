  CREATE PROCEDURE [dbo].[USP_AdimManagement_PSY_INSERT] @SecurityManagement_PSY NVarChar(50),
@HierarchyManagement_PSY NVarChar(50),
@PlantManagement_PSY NVarChar(50),
@UserManagement_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[AdimManagement_PSY] 
 (SecurityManagement_PSY,
HierarchyManagement_PSY,
PlantManagement_PSY,
UserManagement_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY)
 VALUES 
(@SecurityManagement_PSY,
@HierarchyManagement_PSY,
@PlantManagement_PSY,
@UserManagement_PSY,
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