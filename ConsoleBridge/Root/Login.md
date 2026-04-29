Title: Login
Description: Login page.
Date: 2026-04-29
Author: Peter Waher
Master: /Master.md
Javascript: Sha3.js
Javascript: Login.js
Parameter: from

===========================================================================

Login
=======

You need to login to proceed.

<form id="LoginForm">

<p>
<label for="UserName">User Name:</label>  
<input id="UserName" type="text" autofocus="autofocus" style="max-width:20em" 
       onkeydown="CheckEnter(event)" autocomplete="username" />
</p>

<p>
<label for="Password">Password:</label>  
<input id="Password" type="password" style="max-width:20em" onkeydown="CheckEnter(event)" 
       autocomplete="current-password"/>
</p>

<input id="Nonce" type="hidden" value="{{LoginNonce:=Program.CreateNonce()}}" />
<button id="LoginButton" type="button" onclick="DoLogin('{{exists(from)?from:"/"}}','{{Program.Domain}}')">Login</button>
</form>
