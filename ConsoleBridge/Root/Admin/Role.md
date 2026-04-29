Title: {{RoleId}}
Description: Allows editing of a role.
Date: 2026-04-29
Author: Peter Waher
Master: /Master.md
UserVariable: User
Privilege: Admin.Security.Roles
Login: /Login.md
Parameter: RoleId
Parameter: Add

========================================================================

{{
Role:=select top 1 * from Waher.Security.Users.Role where Id=RoleId;
if !exists(Role) then 
(
	if Add then
		Role:=Create(Waher.Security.Users.Role)
	else
		NotFound("Role not found: "+RoleId)
);

if exists(Posted) then
(
	Privileges:=Create(System.Collections.Generic.List,Waher.Security.Users.PrivilegePattern);
	if !empty(Posted.Privileges) then
	(
		foreach Privilege in Posted.Privileges.Split(Waher.Content.CommonTypes.CRLF,System.StringSplitOptions.RemoveEmptyEntries) do
		(
			if Privilege.StartsWith("+") then
				Privileges.Add(Create(Waher.Security.Users.PrivilegePattern, Privilege.Substring(1), true))
			else if Privilege.StartsWith("-") then
				Privileges.Add(Create(Waher.Security.Users.PrivilegePattern, Privilege.Substring(1), false))
			else
				Privileges.Add(Create(Waher.Security.Users.PrivilegePattern, Privilege, true));
		)
	);

	if exists(Posted.Id) then
	(
		if empty(Posted.Id) then BadRequest("ID must not be empty.");
		Role.Id:=Posted.Id;
	);
	
	Role.Description:=Posted.Description ??? "";
	Role.Privileges:=Privileges.ToArray();

	if empty(Role.ObjectId) then
	(
		SaveNewObject(Role);
		LogInformation("Role created.",{"Object":Role.Id,"Actor":User.UserName});
	)
	else
	(
		UpdateObject(Role);
		LogInformation("Role updated.",{"Object":Role.Id,"Actor":User.UserName});
	);

	Waher.Security.Users.Roles.ClearCache();
	SeeOther("Roles.md");
);

empty(Role.Id) ? "Add new role" : Role.Id
}}
===================

<form action="Role.md" method="post" enctype="multipart/form-data">
<fieldset>
<legend>Role definition</legend>

{{if Add then ]]
<p>
<label for="Id">ID:</label>  
<input type="text" id="Id" name="Id" value='((Role.Id))' autofocus required/>
</p>
[[}}

<p>
<label for="Description">Description:</label>  
<textarea id="Description" name="Description">{{Role.Description}}</textarea>
</p>

<p>
<label for="Privileges">Privileges:</label>  
<textarea id="Privileges" name="Privileges">{{
if exists(Role.Privileges) then
(
	foreach Privilege in Role.Privileges do
	(
		if Privilege.Include then ]]+[[ else ]]-[[;
		]]((Privilege.Expression))
[[
	)
)}}</textarea>
<small>Privileges are defined as a set of [regular expressions](https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference), 
each row an expression. The first character in each row defines if the expression adds a privilege (`+`) or removes a privilege (`-`). When determining if a role has a
privilege, the list is processed from top to bottom.</small>
</p>

<button type="submit" class="posButton">{{Add?"Add":"Apply"}}</button>
<button type="button" class="negButton" onclick="OpenUrl('/Admin/Roles.md')">Cancel</button>

<small>**Note**: Any changes made to a role will be available to users once they log out, and back in again.</small>

</fieldset>
</form>
