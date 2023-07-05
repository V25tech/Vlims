  CREATE PROCEDURE [dbo].[USP_HierarchyManagement_PSY_UPDATE] @HMId_PSY int, @AdminManagerId_PSY NVarChar(50),
@DepartmentConfiguration_PSY NVarChar(50),
@RoleConfiguration_PSY NVarChar(50),
@SetFunctionalProfile_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[HierarchyManagement_PSY] SET AdminManagerId_PSY=@AdminManagerId_PSY,
DepartmentConfiguration_PSY=@DepartmentConfiguration_PSY,
RoleConfiguration_PSY=@RoleConfiguration_PSY,
SetFunctionalProfile_PSY=@SetFunctionalProfile_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [HMId_PSY] = @HMId_PSY ;  select @HMId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END