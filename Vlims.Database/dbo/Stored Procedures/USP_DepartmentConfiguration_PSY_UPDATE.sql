  CREATE PROCEDURE [dbo].[USP_DepartmentConfiguration_PSY_UPDATE] @DPCFId_PSY int, @HierarchyManagementId_PSY NVarChar(50),
@DepartmentName_PSY NVarChar(50),
@DepartmentCode_PSY NVarChar(50),
@Comments_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[DepartmentConfiguration_PSY] SET HierarchyManagementId_PSY=@HierarchyManagementId_PSY,
DepartmentName_PSY=@DepartmentName_PSY,
DepartmentCode_PSY=@DepartmentCode_PSY,
Comments_PSY=@Comments_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY,ModifiedDate_PSY = GETDATE() WHERE  [DPCFId_PSY] = @DPCFId_PSY ;  select @DPCFId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END