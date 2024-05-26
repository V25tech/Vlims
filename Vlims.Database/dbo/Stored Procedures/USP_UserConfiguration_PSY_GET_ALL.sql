

 CREATE PROCEDURE [dbo].[USP_UserConfiguration_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
 AS 
 BEGIN 
 BEGIN TRY 
 SELECT UCFId_PSY,
UserManagementID_PSY,
FirstName_PSY,
LastName_PSY,
UserID_PSY,
InvAttemt_PSY,
Department_PSY,
Role_PSY,
Doj_PSY,
Empid_PSY,
EmailId_PSY,
Activedirectory_PSY,
Standarduser_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,
Status_PSY,Password_PSY
 ,count(*) over() as TotalRows 
 FROM [dbo].[UserConfiguration_PSY] WITH (NOLOCK) 
 Order by ModifiedDate_PSY DESC  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END
GO


