async function DeleteUser(UserName)
{
    if (window.confirm("Are you sure you want to delete the user " + UserName + "?"))
    {
        await CallServer("/Admin/Users.ws", { "Method": "Delete", "UserName": UserName });
        ReloadPage();
    }
}