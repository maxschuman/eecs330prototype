var btn;
var questions_asked = [];
message_chain1 = [];
message_chain2 = [];
message_chain3 = [];
message_chain1.push({
	text: "What is the best school in America for human-computer interaction?",
	sender: "You",
	timestamp: new Date("2016-02-21 12:55:33")
});
message_chain1.push({
	text: "Trump University, of course.",
	sender: "Mentor",
	timestamp: new Date("2016-02-21 12:58:38")
});
message_chain2.push({
	text: "Will I get a state scholarship in Nevada to go to college?",
	sender: "You",
	timestamp: new Date("2016-02-14 12:55:33")
});
message_chain2.push({
	text: "If I become president, you will.",
	sender: "Mentor",
	timestamp: new Date("2016-02-14 12:58:38")
});
message_chain3.push({
	text: "What major makes the most money out of college?",
	sender: "You",
	timestamp: new Date("2016-02-18 12:55:33")
});
message_chain3.push({
	text: "Econ/finance, followed by theatre and gender studies.",
	sender: "Mentor",
	timestamp: new Date("2016-02-18 12:58:38")
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
	messages: message_chain2
});
questions_asked.push(
{
	name: "What major makes the most money out of college?",
	date_posted: new Date("2016-02-18"),
	status: "closed",
	respondent_name: "Hillary Clinton",
	category: "General Majors",
	messages: message_chain3
});

function daydiff(one, two){
	var daylength = 24 * 60 * 60 * 1000;
	return Math.floor(Math.abs(one.getTime() - two.getTime())/daylength);
}

questions_asked.sort(function(a,b){return b.date_posted.getTime() - a.date_posted.getTime()});
var days_since = document.getElementById("days-since");
days_since.innerHTML = "Last question posted " + daydiff((new Date()), questions_asked[0].date_posted) + " day(s) ago"

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
		status_statement = "Question resolved";
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

	days_ago = daydiff((new Date()), question.date_posted);


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

	days_since.innerHTML = "Last question posted " + daydiff((new Date()), questions_asked[0].date_posted) + " day(s) ago"
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
			messages: [{text: document.forms["question-form"]["question"].value, sender: "You", timestamp: new Date()}]
		});
		fill_question_panel(questions_asked);
		fill_chat_sidebar(questions_asked);
		bind_profile_to_chat();
		e.target.reset();
		$(".tag").remove();
		if(!document.getElementById("question-alert").classList.contains("hide")){
			document.getElementById("question-alert").classList.add("hide");
		}
		$("#QuestionModal").modal();
	}
	
}


//implementing redirect from portal homepage to chat page
function render_chat(number){
	$(".messages").empty();
	var current_question = questions_asked[Number(number)];

	var message;
	var header_div;

	current_question.messages.sort(function(a,b){return a.timestamp.getTime() - b.timestamp.getTime()});
	for(var i = 0; i < current_question.messages.length; i++){
		message = current_question.messages[i];
		
		message_div = $(document.createElement("div")).addClass("message").addClass("message-user");
		message_div.text(message.text);

		header_div = $(document.createElement("h5")).text(message.timestamp.toTimeString().substr(0,5));

		if(message.sender == "You"){
			message_div.addClass("message-user");
		}
		else{
			message_div.addClass("message-other");
			header_div.append("&#09<b>" + current_question.respondent_name + "</b>");
		}
		header_div.prependTo(message_div);

		$(".messages").append(message_div);
		$(".messages").scrollTop($(".messages")[0].scrollHeight);
	}
}

function find_current_question(){
	for(var j = 0; j < questions_asked.length; j++){
		if($("#chat-sidenav-" + j).hasClass("current-chat")){
			return j;
		}
	}
	return null;
}

function switch_to_chat(number){
	for(var j = 0; j < questions_asked.length; j++){
		if($("#chat-sidenav-" + j).hasClass("current-chat")){
			$("#chat-sidenav-" + j).removeClass("current-chat");
		}
	}

	$("#chat-sidenav-" + number).addClass("current-chat");
	render_chat(number);
}


function bind_profile_to_chat(){
	for(var i = 0; i < questions_asked.length; i++){
		$("#question-" + i).on('click', function(e){
			$("#portal-nav-btn-3").click();
			var number = ($(this).closest(".panel").attr("id"))[($(this).closest(".panel").attr("id")).length-1];
			switch_to_chat(number);
		});

		$("#chat-sidenav-" + i).on('click', function(e){
			var number = ($(this).closest(".panel").attr("id"))[($(this).closest(".panel").attr("id")).length-1];
			switch_to_chat(number);
		});

	}
	switch_to_chat(0);
}

function message_post(question, text){
	var new_message = {
		text: text,
		sender: "You",
		timestamp: new Date()
	};
	question.messages.push(new_message);

}

document.forms["message-form"].onsubmit = function(e){
	e.preventDefault();
	var current_question_index = find_current_question();
	if(current_question_index == null){
		return;
	}
	message_post(questions_asked[current_question_index], document.forms["message-form"]["message-input"].value);
	document.forms["message-form"].reset();
	render_chat(current_question_index);
}