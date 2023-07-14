

  CREATE PROCEDURE [dbo].[USP_Documentrequest_PSY_INSERT] @documentmanagerid_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@Purpose_PSY NVarChar(50),
@ApprovalsCount_PSY Int,
@AssigntoGroup_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100),
@Status_PSY NVarChar(100)
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[Documentrequest_PSY] 
 (documentmanagerid_PSY,
documenttype_PSY,
department_PSY,
Purpose_PSY,
ApprovalsCount_PSY,
AssigntoGroup_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,
Status_PSY)
 VALUES 
(@documentmanagerid_PSY,
@documenttype_PSY,
@department_PSY,
@Purpose_PSY,
@ApprovalsCount_PSY,
@AssigntoGroup_PSY,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate(),
 @Status_PSY);
 SELECT @ID = @@IDENTITY; 
 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END 
 

GO


