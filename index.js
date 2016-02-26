function changeModalHead(s){
	document.getElementById("signin-heading").innerHTML = s;
}

function changeLink(s){
	$("#signer").attr("href", s);
}

var student_login = document.getElementById("student-login");
student_login.onclick = function(e){
	changeModalHead(e.target.innerHTML);
	changeLink("student_portal.html");
}

var mentor_login = document.getElementById("mentor-login");
mentor_login.onclick = function(e){
	changeModalHead(e.target.innerHTML);
	changeLink("mentor_portal.html");
}