function changeModalHead(s){
	document.getElementById("signin-heading").innerHTML = s;
}

var student_login = document.getElementById("student-login");
student_login.onclick = function(e){
	changeModalHead(e.target.innerHTML);
}

var mentor_login = document.getElementById("mentor-login");
mentor_login.onclick = function(e){
	changeModalHead(e.target.innerHTML);
}