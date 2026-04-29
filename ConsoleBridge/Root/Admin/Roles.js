async function DeleteRole(RoleId)
{
    if (window.confirm("Are you sure you want to delete the role " + RoleId + "?"))
    {
        await CallServer("/Admin/Roles.ws", { "Method": "Delete", "RoleId": RoleId });
        ReloadPage();
    }
}