﻿  CREATE PROCEDURE [dbo].[USP_SetFunctionalProfile_PSY_DELETE] @SFPID_PSY int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[SetFunctionalProfile_PSY]  WHERE [SFPID_PSY] IN (@SFPID_PSY) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END