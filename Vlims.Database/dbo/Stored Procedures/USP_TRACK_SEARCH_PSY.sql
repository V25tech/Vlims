CREATE PROCEDURE [dbo].[USP_TRACK_SEARCH_PSY] (@SearchTerm NVARCHAR(50) = null, @UserName NVARCHAR(50)=null) AS
BEGIN
   DECLARE @SQLQuery NVARCHAR(MAX);


SET @SQLQuery = '';

-- Constructing the dynamic query to search each table
SELECT @SQLQuery = @SQLQuery +
    'SELECT * FROM 
    (SELECT ''Preparation'' AS Stage, documentno_PSY AS DocumentNo_PSY, documenttitle_PSY AS DocumentName_PSY, Status_PSY AS Status_PSY, ReferenceGuid_PSY AS ReferenceId  FROM [dbo].[DocumentPreparation_PSY] UNION ALL
     SELECT ''Effective'', documentno_PSY, documenttitle_PSY, Status_PSY, ReferenceGuid_PSY FROM [dbo].[DocumentEffective_PSY] UNION ALL
     SELECT ''Print'', documentno_PSY, documenttitle_PSY, Status_PSY,ReferenceGuid_PSY FROM [dbo].[DocumentPrint_PSY]	
     ) AS TrackTable  Inner join dbo.workitems_PSY W on W.RefrenceGuid_PSY = TrackTable.ReferenceId
     WHERE DocumentNo_PSY LIKE ''%' + @SearchTerm + '%'' UNION ALL '
;

SET @SQLQuery = LEFT(@SQLQuery, LEN(@SQLQuery) - LEN(' UNION ALL '));

SET @SQLQuery = @SQLQuery + '';


-- Execute the dynamic SQL query
    EXEC sp_executesql @SQLQuery;
END;
--