USE [javis]
GO
/****** Object:  StoredProcedure [dbo].[pcAccountSelect]    Script Date: 2015-08-25 오후 9:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[pcAccountSelect]
	@Account	VARCHAR(32),
	@PSWD	VARCHAR(32)
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
