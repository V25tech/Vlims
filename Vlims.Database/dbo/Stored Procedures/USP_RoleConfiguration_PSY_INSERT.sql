  CREATE PROCEDURE [dbo].[USP_RoleConfiguration_PSY_INSERT] @HierarchyManagementId_PSY NVarChar(50),
@Role_PSY NVarChar(50),
@Department_PSY NVarChar(50),
@Comments_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[RoleConfiguration_PSY] 
 (HierarchyManagementId_PSY,
Role_PSY,
Department_PSY,
Comments_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY)
 VALUES 
(@HierarchyManagementId_PSY,
@Role_PSY,
@Department_PSY,
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