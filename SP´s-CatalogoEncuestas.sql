---------------------------------------------ADMIN------------------------------------------
USE MxQuiz
GO
-----GET
-----Verificar si la encuesta ya Existe-----ADMIN
CREATE PROCEDURE dbo.sp_ve
@nombre nvarchaR(100)
AS
Select *from eCatalogo Where Nombre=@nombre
Go
------GETALLBYId
------Obtener todas las de Encuestas x id con EStado=1 ----ADMIN
ALTER PROCEDURE dbo.sp_getbyId
@Id int
AS
Select *from eCatalogo  Where Id=@Id and Estado=1
Go
EXEC dbo.sp_getbyId 1
------GETALLBYTipo
------Obtener todas las de Encuestas x tipo con EStado=1 -----ADMIN
CREATE PROCEDURE dbo.sp_getbyTipo
@tipo int
AS
Select *from eCatalogo  Where Tipo=@tipo and Estado=1
Go
------GETALLBYTipoandPrioridad=1 este sp ayudaa en cada categoria html----------------MOSTRAR AL USUARIO Y PARA Q EL ADMIN VERIFIQUE CUALES SON LAS TENDENCIAS Y CAMBIARLOS
------Obtener todas las de Encuestas x tipo y  1prioridad con EStado=1 
CREATE PROCEDURE dbo.sp_getAllbyTipoPrioridad
@tipo int
AS
Select *from eCatalogo  Where Tipo=@tipo and Estado=1 and  Prioridad=1
Go
------GETSearch----para user
------Obtener todas las de Encuestas by name x categoria
CREATE PROCEDURE dbo.sp_getbyname
@name NVARCHAR(100),
@tipo int
AS
Select *from eCatalogo WHERE Nombre LIKE '%' +@name+ '%' and Estado=1 and Tipo=@tipo
Go
----POST
-----Nueva Encuesta
ALTER PROCEDURE sp_nuevaEncuesta
@Nombre nvarchaR(100),
@Descripcion nvarchaR(500),
@URL_Documento nvarchar(500),
@URL_Imagen nvarchar(500),
@Tipo nvarchaR(100)
AS
BEGIN TRY
BEGIN TRANSACTION
DECLARE @IDtipo int
SELECT @IDtipo=Id From  cType WHERE Nombre=@Tipo
INSERT INTO eCatalogo(Nombre,Descripcion,URL_Documento,URL_Imagen,Tipo)VALUES(@Nombre,@Descripcion,@URL_Documento,@URL_Imagen,@IDtipo)
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----PUT
-----Quitar Prioridad de Encuesta
EXEC sp_quitarPioridad 7
go
SELECT *FROM eCatalogo 
go
CREATE PROCEDURE sp_quitarPioridad
@Id int
AS
BEGIN TRY
BEGIN TRANSACTION
update eCatalogo set Prioridad=0 where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----PUT
-----Dar Prioridad de Encuesta
CREATE PROCEDURE sp_darPioridad
@Id int
AS
BEGIN TRY
BEGIN TRANSACTION
update eCatalogo set Prioridad=1 where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----PUT
-----Actualizar Nombre de Encuesta
CREATE PROCEDURE sp_actualizarNombre
@Id int,
@Nombre nvarchaR(100)
AS
BEGIN TRY
BEGIN TRANSACTION
update eCatalogo set Nombre=@Nombre where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----PUT
-----Actualizar la Descripcion de una Encuesta
CREATE PROCEDURE sp_actualizarDescripcion
@Id int,
@Descripcion nvarchaR(500)
AS
BEGIN TRY
BEGIN TRANSACTION
update eCatalogo set Descripcion=@Descripcion where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
EXEC sp_actualizarDescripcion 1,'Tras el resultado de la consulta nacional que concluyó el pasado 28 de octubre sobre el Nuevo Aeropuerto Internacional de la Ciudad de México (NAICM), el presidente electo Andrés Manuel López Obrador anunció que la obra de infraestructura que se realiza actualmente en Texcoco será cancelada, y en su lugar se procederá con la creación de un sistema aeroportuario para el Valle de México que atenderá entre 60 y 70 millones de pasajeros al año.'
----PUT
-----Actualizar la URL del Documento de una Encuesta
ALTER PROCEDURE sp_actualizarURLDocumento
@Id int,
@URLDocumento nvarchaR(500)
AS
BEGIN TRY
BEGIN TRANSACTION
update eCatalogo set URL_Documento=@URLDocumento where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----PUT
-----Actualizar la URL del Documento de una Encuesta
ALTER PROCEDURE sp_actualizarURLImagen
@Id int,
@URLImagen nvarchaR(500)
AS
BEGIN TRY
BEGIN TRANSACTION
update eCatalogo set URL_Imagen=@URLImagen where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----DELETE
-----Actualizar Estado de una Encuesta
CREATE PROCEDURE sp_borrarEncuesta
@Id int
AS
BEGIN TRY
BEGIN TRANSACTION
update eCatalogo set Estado=0 where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO



EXEC sp_nuevaEncuesta 'NAICM','Tras el resultado de la consulta nacional que concluyó el pasado 28 de octubre sobre el Nuevo Aeropuerto Internacional de la Ciudad de México (NAICM), el presidente electo Andrés Manuel López Obrador anunció que la obra de infraestructura que se realiza actualmente en Texcoco será cancelada, y en su lugar se procederá con la creación de un sistema aeroportuario para el Valle de México que atenderá entre 60 y 70 millones de pasajeros al año.','https://drive.google.com/file/d/1PKgyRO5RCrJK9SEvkrBjQvCsUhYufsZG/view?usp=sharing','https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1G5e_kCboDOkELb55DL8__Ic0rDkyLEds',
'Politica'


EXEC sp_nuevaEncuesta 'La legalización de la marihuana en México ','Producir, comprar y consumir marihuana en México será legal en poco tiempo. Morena, el partido de Andrés Manuel López Obrador, presidente electo, presentó este jueves una iniciativa de ley en el Senado que regula la producción, la venta y el consumo de cannabis. Fuerza mayoritaria en el Congreso, Morena no debería tener demasiados problemas para aprobarla','https://drive.google.com/file/d/1WKqpyK7IWKVRnGz7vESqg-Rbc7o8dPTn/view?usp=sharing','https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1N2BnE-FzUOPRenRsR-dYJ6f6I6O9CuUW',
'Social'
update eCatalogo set Tipo=1 where Id=1

EXEC sp_actualizarURLDocumento 2,'https://drive.google.com/file/d/10w0U9CnibEhCS-oFK7Tw9gyeJ7qdGqjR/view?usp=sharing'
SELECT *FROM cType
SELECT *FROM eCatalogo
DROP eCatalogo
https://drive.google.com/file/d/1YBv7y4Tt1iVXM2jh1FU9cMOVIo9iik7u/view?usp=sharing
https://drive.google.com/file/d//view?usp=sharing

