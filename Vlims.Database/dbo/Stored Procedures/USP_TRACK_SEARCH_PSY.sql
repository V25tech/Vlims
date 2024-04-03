CREATE PROCEDURE [dbo].[USP_TRACK_SEARCH_PSY] (@SearchTerm NVARCHAR(50), @UserName NVARCHAR(50)) AS
BEGIN
   DECLARE @SQLQuery NVARCHAR(MAX);

SET @SQLQuery = '';

-- Constructing the dynamic query to search each table
SELECT @SQLQuery = @SQLQuery +
    'SELECT * FROM 
    (SELECT ''Preparation'' AS Stage, documenttitle_PSY AS DocumentNo_PSY, documenttitle_PSY AS DocumentName_PSY, Status_PSY AS Status_PSY FROM [dbo].[DocumentPreparation_PSY] WHERE Status_PSY = ''In-Progress'' OR  Status_PSY = ''InProgress'' UNION ALL
     SELECT ''Effective'', documentno_PSY, documenttitle_PSY, Status_PSY FROM [dbo].[DocumentEffective_PSY] UNION ALL
     SELECT ''Print'', documentno_PSY, documenttitle_PSY, Status_PSY FROM [dbo].[DocumentPrint_PSY]	
     ) AS TrackTable
     WHERE DocumentNo_PSY LIKE ''%' + @SearchTerm + '%'' UNION ALL '
;

SET @SQLQuery = LEFT(@SQLQuery, LEN(@SQLQuery) - LEN(' UNION ALL '));

-- Execute the dynamic SQL query
    EXEC sp_executesql @SQLQuery;
END;
--