function Base64Encode(Data)
{
	const Base64Alphabet =
		[
			"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
			"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
			"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
			"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
			"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"
		];

	var Result = "";
	var i;
	var c = Data.length;

	for (i = 2; i < c; i += 3)
	{
		Result += Base64Alphabet[Data[i - 2] >> 2];
		Result += Base64Alphabet[((Data[i - 2] & 0x03) << 4) | (Data[i - 1] >> 4)];
		Result += Base64Alphabet[((Data[i - 1] & 0x0F) << 2) | (Data[i] >> 6)];
		Result += Base64Alphabet[Data[i] & 0x3F];
	}

	if (i === c)
	{
		Result += Base64Alphabet[Data[i - 2] >> 2];
		Result += Base64Alphabet[((Data[i - 2] & 0x03) << 4) | (Data[i - 1] >> 4)];
		Result += Base64Alphabet[(Data[i - 1] & 0x0F) << 2];
		Result += "=";
	}
	else if (i === c + 1)
	{
		Result += Base64Alphabet[Data[i - 2] >> 2];
		Result += Base64Alphabet[(Data[i - 2] & 0x03) << 4];
		Result += "==";
	}

	return Result;
}

async function CheckEnter(e)
{
	if (e.keyCode === 13)
	{
		e.preventDefault();
		document.getElementById("LoginButton").click();
	}
}

async function CalcPasswordHash(UserName, Domain, Password, Nonce)
{
	var Utf8 = new TextEncoder("utf-8");
	var H1 = sha3_256.arrayBuffer(Utf8.encode(UserName + ":" + Domain + ":" + Password));

	var Algorithm = await window.crypto.subtle.importKey("raw", Utf8.encode(Nonce),
		{
			"name": "HMAC",
			"hash": "SHA-256"
		}, false, ["sign"]);

	var H2 = await window.crypto.subtle.sign("HMAC", Algorithm, H1);

	return this.Base64Encode(new Uint8Array(H2));
}

async function DoLogin(From, Domain)
{
	var UserName = document.getElementById("UserName").value;
	var Password = document.getElementById("Password").value;
	var Nonce = document.getElementById("Nonce").value;

	var Result = await CallServer("/Login",
		{
			"UserName": UserName,
			"PasswordHash": await CalcPasswordHash(UserName, Domain, Password, Nonce),
			"Nonce": Nonce
		});

	if (Result.Ok)
		OpenUrl(From);
	else
		window.alert(Result.Message);
}
