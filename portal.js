var btn;
var questions_asked = [];
message_chain1 = [];
message_chain1.push({
	text: "What is the best school in America for human-computer interaction?",
	sender: "You",
	timestamp: new Date("2016-02-21 12:55:33")
});
questions_asked.push(
{
	name: "What is the best school in America for human-computer interaction?",
	date_posted: new Date("2016-02-21"),
	status: "closed",
	respondent_name: "Donald Trump",
	category: "Computer Science Programs",
	messages: message_chain1
});
questions_asked.push(
{
	name: "Will I get a state scholarship in Nevada to go to college?",
	date_posted: new Date("2016-02-14"),
	status: "closed",
	respondent_name: "Bernie Sanders",
	category: "Scholarships, Nevada",
	messages: null
});
questions_asked.push(
{
	name: "What major makes the most money out of college?",
	date_posted: new Date("2016-02-18"),
	status: "closed",
	respondent_name: "Hillary Clinton",
	category: "General Majors",
	messages: null
});

questions_asked.sort(function(a,b){return b.date_posted.getTime() - a.date_posted.getTime()});
var days_since = document.getElementById("days-since");
days_since.innerHTML = "Last question posted " + ((new Date()).getDate() - questions_asked[0].date_posted.getDate()) + " day(s) ago"

for(i = 1; i <= 5; i++){
	btn = document.getElementById("portal-nav-btn-" + i);
	btn.onclick = function(e){

		for(i = 1; i <= 5; i++){
			if(document.getElementById("portal-nav-btn-" + i).classList.contains("active")){
				document.getElementById("portal-nav-btn-" + i).classList.remove("active");
				document.getElementById("portal-page-" + i).classList.add("hide");
			}
		}

		e.target.classList.add("active");

		for(i = 1; i <= 5; i++){
			if(document.getElementById("portal-nav-btn-" + i).classList.contains("active")){
				document.getElementById("portal-page-" + i).classList.remove("hide");
			}
		}
	};
}

function panelize_question(question, i){
	var status_statement;
	var glyphicon_class = "glyphicon ";
	var days_ago;
	if(question.status == "closed"){
		status_statement = "Question closed";
		glyphicon_class += "glyphicon-ok";
	}
	else if(question.status == "in progress"){
		status_statement = "Mentoring in progress";
		glyphicon_class += "glyphicon-briefcase";
	}
	else{
		status_statement = "Waiting for mentor";
		glyphicon_class += "glyphicon-hourglass";
	}

	days_ago = (new Date()).getUTCDate() - question.date_posted.getDate();


	//Writing panel div for a question
	var panel_string = "<div class='panel panel-default' id='question-" + i + "'><div class='panel-heading'><span class='" + glyphicon_class + "''></span>" + status_statement + ", posted " + days_ago + " day(s) ago</div><div class='panel-body panel-body-homepage'>" + question.name + "</div><div class='panel-footer'>Tags: " + question.category;
	if(question.status == "waiting"){
		panel_string += "</div></div>";
	}
	else{
		panel_string += ", answered by " + question.respondent_name + "</div></div>";
	}

	return panel_string;
}

function fill_question_panel(questions){
	var panel_holder = document.getElementById("panel-holder");
	panel_holder.innerHTML = "";
	questions.sort(function(a,b){return b.date_posted.getTime() - a.date_posted.getTime()});
	for(var i = 0; i < questions.length; i++){
		panel_holder.innerHTML += panelize_question(questions[i], i);
	}

	days_since.innerHTML = "Last question posted " + ((new Date()).getDate() - questions[0].date_posted.getDate()) + " day(s) ago"
}

function chat_panelize_question(question, i){
	var status_statement;
	var glyphicon_class = "glyphicon ";
	if(question.status == "closed"){
		status_statement = "Question closed";
		glyphicon_class += "glyphicon-ok";
	}
	else if(question.status == "in progress"){
		status_statement = "Mentoring in progress";
		glyphicon_class += "glyphicon-briefcase";
	}
	else{
		status_statement = "Waiting for mentor";
		glyphicon_class += "glyphicon-hourglass";
	}


	//Writing panel div for a question
	var panel_string = "<div class='panel panel-default' id='chat-sidenav-" + i + "'><div class='panel-body panel-body-chat-sidebar'><span class='" + glyphicon_class + "''></span>" + question.name + "</div><div class='panel-footer'>";
	if(question.status == "waiting"){
		panel_string += "Waiting for mentor</div></div>";
	}
	else{
		panel_string += question.respondent_name + "</div></div>";
	}

	return panel_string;

}

function fill_chat_sidebar(questions){
	var chat_sidebar = document.getElementById("chat-thumbs");
	chat_sidebar.innerHTML = "";
	questions.sort(function(a,b){return b.date_posted.getTime() - a.date_posted.getTime()});
	for(var i = 0; i < questions.length; i++){
		chat_sidebar.innerHTML += chat_panelize_question(questions[i], i);
	}
}

fill_chat_sidebar(questions_asked);

function validateForm() {
    var x = document.forms["question-form"]["question"].value;
    var alert = document.getElementById("question-alert");
    var message = document.getElementById("question-alert-message");
    if (x == null || x == "") {
    	message.innerHTML = "Please enter a question.";
    	alert.classList.remove("hide");
        return false;
    }

    var y = document.forms["question-form"]["tags"].value;
    if (y == null || y == "") {
    	message.innerHTML = "Please add at least one tag to your question.";
    	alert.classList.remove("hide");
        return false;
    }

    return true;
}

var questionForm = document.getElementById("question-form");
questionForm.onsubmit = function(e){
	e.preventDefault();
	if(validateForm()){
		var cat_string = document.forms["question-form"]["tags"].value.replace(",", ", ");

		questions_asked.push({
			name:document.forms["question-form"]["question"].value,
			date_posted: new Date(),
			status: "waiting",
			respondent_name: null,
			category: cat_string,
			messages: null
		});
		fill_question_panel(questions_asked);
		fill_chat_sidebar(questions_asked);
		e.target.reset();
		$(".tag").remove();
		if(!document.getElementById("question-alert").classList.contains("hide")){
			document.getElementById("question-alert").classList.add("hide");
		}
		$("#QuestionModal").modal();
	}
	
}