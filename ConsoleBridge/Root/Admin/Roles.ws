AuthenticateSession(Request,"User");
Authorize(User,"Admin.Security.Roles");

if Posted matches
{
	"Method": "Delete",
	"RoleId": Required(String(PRoleId))
}
then
(
	delete from Waher.Security.Users.Role where Id=PRoleId;
	LogInformation("Role deleted.",{"Object":PRoleId,"Actor":User.UserName});
	true;
)
else
	BadRequest("Invalid payload.");
