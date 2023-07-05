  CREATE PROCEDURE [dbo].[USP_HierarchyManagement_PSY_INSERT] @AdminManagerId_PSY NVarChar(50),
@DepartmentConfiguration_PSY NVarChar(50),
@RoleConfiguration_PSY NVarChar(50),
@SetFunctionalProfile_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[HierarchyManagement_PSY] 
 (AdminManagerId_PSY,
DepartmentConfiguration_PSY,
RoleConfiguration_PSY,
SetFunctionalProfile_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY)
 VALUES 
(@AdminManagerId_PSY,
@DepartmentConfiguration_PSY,
@RoleConfiguration_PSY,
@SetFunctionalProfile_PSY,
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