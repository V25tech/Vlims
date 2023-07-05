  CREATE PROCEDURE [dbo].[USP_Documentrequest_PSY_UPDATE] @DRID_PSY int, @documentmanagerid_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@Purpose_PSY NVarChar(50),
@ApprovalsCount_PSY Int,
@AssigntoGroup_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[Documentrequest_PSY] SET documentmanagerid_PSY=@documentmanagerid_PSY,
documenttype_PSY=@documenttype_PSY,
department_PSY=@department_PSY,
Purpose_PSY=@Purpose_PSY,
ApprovalsCount_PSY=@ApprovalsCount_PSY,
AssigntoGroup_PSY=@AssigntoGroup_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [DRID_PSY] = @DRID_PSY ;  select @DRID_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END