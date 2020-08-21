USE MxQuiz
GO
----View
SELECT *FROM eR
SELECT *FROM eCatalogo
SELECT *FROM Users
SELECT *FROM cType

ALTER VIEW View_view
AS
SELECT er.Id AS Id,us.Nombre AS Nombre,us.Apellidop AS Paterno,us.Apellidom AS Materno,us.fdn AS FechaNacimiento,us.sexo AS Sexo,us.Estado AS Estado,us.Municipio AS Municipio,er.Afavor AS Afavor,er.Encontra AS Encontra,er.Nulo AS Nulo,ec.Id AS IdEncuesta,ec.Nombre AS NombreEncuesta,ct.Nombre AS Tipo
FROM eR er
INNER JOIN eCatalogo ec ON ec.Id=er.IdeC
INNER JOIN Users us ON us.Id=er.IdUser
INNER JOIN cType ct ON ct.Id=ec.Tipo 
GO
SELECT *FROM View_view
SELECT COUNT(I.Id) AS IdH FROM View_view I WHERE IdEncuesta=1 AND Sexo='H'
UNION ALL
SELECT COUNT(I.Id) AS IdM FROM View_view I WHERE IdEncuesta=1 AND Sexo='M'


SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=1 AND Sexo='H'
UNION ALL
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=1 AND Sexo='M'

-----------------------------------------------------------------------------------------------------------------------------------------
------TOTAL DE PERSONAS Q VOTARON EN ESA ENCUESTAS
SELECT COUNT(I.Id) AS Id FROM View_view I WHERE IdEncuesta=@Idencuesta
-----------------------------------------------------------------------------------------------------------------------------------------
----------X IDENCUESTA
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta
----------X IDENCUESTA Y ESTADO
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Estado=@Estado
----------X IDENCUESTA Y ESTADO Y MUNICIPIO
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Estado=@Estado AND Municipio=@Municipio
----------X IDENCUESTA Y ESTADO Y MUNICIPIO Y GENERO M Y H
-----------------------------------------------------------------------------------------------------------------------------------------
---Cantidad de Hombres y Mujeres que votaron por esa encuesta------------En General (Mexico)
SELECT COUNT(I.Id) AS Id FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo=@Mujer
SELECT COUNT(I.Id) AS Id FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo=@Hombre
---Cantidad de Hombres y Mujeres que votaron por esa encuesta------------x Estado
SELECT COUNT(I.Id) AS Id FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo=@Mujer AND Estado=@Estado
SELECT COUNT(I.Id) AS Id FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo=@Hombre AND Estado=@Estado
---Cantidad de Hombres y Mujeres que votaron por esa encuesta------------x Estado Y Municipio
SELECT COUNT(I.Id) AS Id FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo=@Mujer AND Estado=@Estado AND Municipio=@Municipio
SELECT COUNT(I.Id) AS Id FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo=@Hombre AND Estado=@Estado AND Municipio=@Municipio
------------------------------------------------------------------------------------------------------------------------------------------------
---Cantidad de AFAVOR,ENCONTRA,NULO X SEXO(H,M) que votaron por esa encuesta------------En General (Mexico)
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo=@Mujer
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo=@Hombre
---Cantidad de AFAVOR,ENCONTRA,NULO X SEXO(H,M) que votaron por esa encuesta------------x Estado
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo=@Mujer AND Estado=@Estado
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo=@Hombre AND Estado=@Estado
---Cantidad de AFAVOR,ENCONTRA,NULO X SEXO(H,M) que votaron por esa encuesta------------x Estado Y Municipio
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo=@Mujer AND Estado=@Estado AND Municipio=@Municipio
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo=@Hombre AND Estado=@Estado AND Municipio=@Municipio
go

CREATE PROCEDURE dbo.sp_Cantidad_XC
@Idencuesta int
AS
BEGIN TRY
BEGIN TRANSACTION
SELECT COUNT(I.Id) AS Id FROM View_view I WHERE IdEncuesta=@Idencuesta
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO

CREATE PROCEDURE dbo.sp_S_AEN_XC
@Idencuesta int
AS
BEGIN TRY
BEGIN TRANSACTION
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
CREATE PROCEDURE dbo.sp_S_AEN_XE
@Idencuesta int,
@Estado nvarchar(100)
AS
BEGIN TRY
BEGIN TRANSACTION
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Estado=@Estado
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
CREATE PROCEDURE dbo.sp_S_AEN_XEM
@Idencuesta int,
@Estado nvarchar(100),
@Municipio nvarchar(100)
AS
BEGIN TRY
BEGIN TRANSACTION
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Estado=@Estado AND Municipio=@Municipio
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO

CREATE PROCEDURE dbo.sp_Cantidad_H_M_XC
@Idencuesta int
AS
BEGIN TRY
BEGIN TRANSACTION
SELECT COUNT(I.Id) AS Id FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo='H'
UNION ALL
SELECT COUNT(I.Id) AS Id FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo='M'
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
CREATE PROCEDURE dbo.sp_Cantidad_H_M_XC_E
@Idencuesta int,
@Estado nvarchar(100)
AS
BEGIN TRY
BEGIN TRANSACTION
SELECT COUNT(I.Id) AS Id FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo='H' AND Estado=@Estado
UNION ALL
SELECT COUNT(I.Id) AS Id FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo='M' AND Estado=@Estado
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
CREATE PROCEDURE dbo.sp_Cantidad_H_M_XC_EM
@Idencuesta int,
@Estado nvarchar(100),
@Municipio nvarchar(100)
AS
BEGIN TRY
BEGIN TRANSACTION
SELECT COUNT(I.Id) AS Id FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo='H' AND Estado=@Estado AND Municipio=@Municipio
UNION ALL
SELECT COUNT(I.Id) AS Id FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo='M' AND Estado=@Estado AND Municipio=@Municipio
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO

CREATE PROCEDURE dbo.sp_S_AEN_H_M_XC
@Idencuesta int
AS
BEGIN TRY
BEGIN TRANSACTION
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo='H'
UNION ALL
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo='M'
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
EXEC dbo.sp_S_AEN_H_M_XC 1

CREATE PROCEDURE dbo.sp_S_AEN_H_M_XE
@Idencuesta int,
@Estado NVARCHAR(100)
AS
BEGIN TRY
BEGIN TRANSACTION
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo='H' AND Estado=@Estado
UNION ALL
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo='M' AND Estado=@Estado
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO

CREATE PROCEDURE dbo.sp_S_AEN_H_M_XEM
@Idencuesta int,
@Estado NVARCHAR(100),
@Municipio NVARCHAR(100)
AS
BEGIN TRY
BEGIN TRANSACTION
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo='H' AND Estado=@Estado AND Municipio=@Municipio
UNION ALL
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM View_view I WHERE IdEncuesta=@Idencuesta AND Sexo='M' AND Estado=@Estado AND Municipio=@Municipio
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO

DROP PROCEDURE dbo.sp_AENxEM
GO