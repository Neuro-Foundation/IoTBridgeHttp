Title: Roles
Description: Displays available roles
Date: 2026-04-29
Author: Peter Waher
Master: /Master.md
JavaScript: Roles.js
UserVariable: User
Privilege: Admin.Security.Roles
Login: /Login.md

========================================================================

Roles
===================

Following table displays available roles, and the corresponding privileges they provide.

<table>
<thead>
<tr>
<th>Role</th>
<th>Description</th>
<th>Privileges</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{{
Roles:=select * from Waher.Security.Users.Role order by Id;
foreach Role in Roles do
(
	]]<tr><td><a target="_blank" href="Role.md?RoleId=((Role.Id))">`((Role.Id))`</a></td><td>

((Role.Description))

</td><td>

[[;

	foreach Privilege in Role.Privileges do
	(
		if Privilege.Include then ]]+[[ else ]]-[[;
		]]`((Privilege.Expression))`  
[[
	);

	]]

</td><td>
<button type="button" class="negButtonSm" onclick="DeleteRole('((Role.Id))')">Delete</button>
</td></tr>
[[;
)
}}
</tbody>
</table>

<button type="button" class="posButton" onclick="OpenUrl('Role.md?Add=1')">Add</button>
<button type="button" class="posButton" onclick="OpenUrl('/Index.md')">Cancel</button>
