  CREATE PROCEDURE [dbo].[USP_DepartmentConfiguration_PSY_INSERT] @HierarchyManagementId_PSY NVarChar(50),
@DepartmentName_PSY NVarChar(50),
@DepartmentCode_PSY NVarChar(50),
@Comments_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[DepartmentConfiguration_PSY] 
 (HierarchyManagementId_PSY,
DepartmentName_PSY,
DepartmentCode_PSY,
Comments_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY)
 VALUES 
(@HierarchyManagementId_PSY,
@DepartmentName_PSY,
@DepartmentCode_PSY,
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