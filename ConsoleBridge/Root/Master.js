async function CallServer(Resource, RequestPayload, Language)
{
	var Request = new Promise((SetResult, SetException) =>
	{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function ()
		{
			if (xhttp.readyState == 4)
			{
				var Response = xhttp.responseText;

				if (xhttp.status === 200)
				{
					Response = JSON.parse(Response);
					SetResult(Response);
				}
				else
				{
					var Error =
					{
						"message": Response,
						"statusCode": xhttp.status,
						"statusMessage": xhttp.statusText
					};

					SetException(Error);
				}

				delete xhttp;
			}
		};

		if (RequestPayload)
		{
			xhttp.open("POST", Resource, true);

			if (!(RequestPayload instanceof FormData))
				xhttp.setRequestHeader("Content-Type", "application/json");
		}
		else
			xhttp.open("GET", Resource, true);

		xhttp.setRequestHeader("Accept", "application/json");

		if (Language)
			xhttp.setRequestHeader("Accept-Language", Language);

		if (RequestPayload instanceof FormData)
			xhttp.send(RequestPayload);
		else
			xhttp.send(JSON.stringify(RequestPayload));
	});

	return await Request;
}

function OpenUrl(Url)
{
	window.location.href = Url;
}
