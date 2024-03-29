USE [javis]
GO
/****** Object:  StoredProcedure [dbo].[pcAccountUpdate]    Script Date: 2015-08-25 오후 7:35:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[pcAccountUpdate]
	@AccountNo	INT = 0,
	@MODE	CHAR(1) = 'I',	-- I : Insert, U : Update, D : delete
	@DATA	XML
ASUpd
	IF @MODE = 'I'
	BEGIN
		
		INSERT INTO dbo.Accounts (
			Account,
			AccountName,
			Salt,
			EncPw
		)
		SELECT
			DATA.X.value('id[1]','varchar(32)'),
			DATA.X.value('name[1]','varchar(32)'),
			DATA.X.value('salt[1]','varchar(16)'),
			HASHBYTES('SHA2_256',
				LEFT(DATA.X.value('salt[1]','varchar(16)'),8) +
				DATA.X.value('pw[1]','varchar(32)') +
				RIGHT(DATA.X.value('salt[1]','varchar(16)'),8)
			)
		FROM
			@DATA.nodes('/ROOT/ACCOUNT') DATA(X);
		RETURN @@ROWCOUNT;
	END