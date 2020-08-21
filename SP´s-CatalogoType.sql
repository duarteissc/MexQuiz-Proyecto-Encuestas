---------------------------------------------ADMIN------------------------------------------
USE MxQuiz
GO
-----GETBYNAME
-----Verificar si existe el tipo de Encuesta-----ADMIN----POST
CREATE PROCEDURE dbo.sp_vte
@Nombre nvarchaR(100)
AS
Select *from cType  Where Nombre=@Nombre
Go
-----GETBYID
-----Obtener el tipo x id
CREATE PROCEDURE dbo.sp_getTipobyid
@id int
AS
Select *from cType  Where Id=@id
Go
------GETALL
------Obtener todos los tipos de Encuestas con EStado=1 -----ADMIN--------------USERS CATEGORIAS LISTA
CREATE PROCEDURE dbo.sp_getAll
AS
Select *from cType  Where Estado=1
Go
----POST
-----Nuevo tipo de Encuesta-----ADMIN
CREATE PROCEDURE sp_nuevoTipoEncuesta
@Nombre nvarchaR(100)
AS
BEGIN TRY
BEGIN TRANSACTION
INSERT INTO cType(Nombre)VALUES(@Nombre)
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----PUT
-----Actalizar Tipo de Encuesta------ADMIN
CREATE PROCEDURE sp_actualizarTipoEncuesta
@Id int,
@Nombre nvarchaR(100)
AS
BEGIN TRY
BEGIN TRANSACTION
update cType set Nombre=@Nombre where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----DELETE
-----Borrar Tipo de Encuesta----------ADMIN
CREATE PROCEDURE sp_borrarTipoEncuesta
@Id int
AS
BEGIN TRY
BEGIN TRANSACTION
update cType set Estado=0 where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO

EXEC sp_nuevoTipoEncuesta 'Politica'
EXEC sp_nuevoTipoEncuesta 'Economia'
EXEC sp_nuevoTipoEncuesta 'Social'

SELECT *FROM cType
