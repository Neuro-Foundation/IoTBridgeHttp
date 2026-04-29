AuthenticateSession(Request,"User");
Authorize(User,"Admin.Security.Users");

if Posted matches
{
	"Method": "Delete",
	"UserName": Required(String(PUserName))
}
then
(
	delete from Waher.Security.Users.User where UserName=PUserName;
	LogInformation("User deleted.",{"Object":PUserName,"Actor":User.UserName});
	true;
)
else
	BadRequest("Invalid payload.");
