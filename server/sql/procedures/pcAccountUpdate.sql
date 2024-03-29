USE [javis]
GO
/****** Object:  StoredProcedure [dbo].[pcAccountSelect]    Script Date: 2015-08-25 오후 9:15:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[pcAccountLogin]
	@Account	VARCHAR(32),
	@PSWD		VARCHAR(32),
	@MODE		INT		= 0, --  0 : web 1 : api
	@KEY		VARCHAR(255) = NULL
AS
	
	SELECT
		AccountNo,
		AccountName,
		[Level]
	FROM
		dbo.Accounts
	WHERE
		Account = @Account
		AND HASHBYTES('SHA2_256',LEFT(Salt,8) + @PSWD + RIGHT(Salt,8)) = EncPw;
	RETURN @@ROWCOUNT;
