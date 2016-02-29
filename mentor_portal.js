var btn;
var questions_responded = [];
message_chain1 = [];
message_chain2 = [];
message_chain3 = [];
message_chain1.push({
	text: "Should I mention my many entrepreneurial exploits when I apply to college?",
	sender: "Student",
	timestamp: new Date("2016-02-21 12:55:33")
});
message_chain1.push({
	text: "Sure. Also if you've written any books or made a large amount of money, mention that too!",
	sender: "You",
	timestamp: new Date("2016-02-21 12:58:38")
});
message_chain2.push({
	text: "Will I get a state scholarship in Nevada to go to college?",
	sender: "Student",
	timestamp: new Date("2016-02-14 12:55:33")
});
message_chain2.push({
	text: "That's kind of your thing, Bernie.",
	sender: "You",
	timestamp: new Date("2016-02-14 12:58:38")
});
message_chain3.push({
	text: "What college has produced the most presidents?",
	sender: "Student",
	timestamp: new Date("2016-02-18 12:55:33")
});
message_chain3.push({
	text: "Harvard claims six presidents, plus four VPs.",
	sender: "You",
	timestamp: new Date("2016-02-18 12:58:38")
});
questions_responded.push(
{
	name: "Should I mention my many entrepreneurial exploits when I apply to college?",
	date_posted: new Date("2016-02-21"),
	status: "closed",
	respondent_name: "Donald Trump",
	category: "Application, Self-Presentation",
	messages: message_chain1
});
questions_responded.push(
{
	name: "Will I get a state scholarship in Nevada to go to college?",
	date_posted: new Date("2016-02-14"),
	status: "closed",
	respondent_name: "Bernie Sanders",
	category: "Scholarships, Nevada",
	messages: message_chain2
});
questions_responded.push(
{
	name: "What college has produced the most presidents?",
	date_posted: new Date("2016-02-18"),
	status: "closed",
	respondent_name: "Hillary Clinton",
	category: "Fun Facts",
	messages: message_chain3
});






var questions_available = [];

questions_available.push({
	name: "What scholarships do the Naval Academy offer?",
	date_posted: new Date(),
	status: "waiting",
	respondent_name: "Ben Carson",
	category: "Scholarships",
	messages: [{text: "What scholarships do the Naval Academy offer?",
	sender: "Student",
	timestamp: new Date()}]

});
questions_available.push({
	name: "What schools in Texas are religiously-affiliated?",
	date_posted: new Date(),
	status: "waiting",
	respondent_name: "Ted Cruz",
	category: "Religious Universities",
	messages: [{text: "What schools in Texas are religiously-affiliated?",
	sender: "Student",
	timestamp: new Date()}]

});
questions_available.push({
	name: "How important is legacy at Ivy League schools?",
	date_posted: new Date(),
	status: "waiting",
	respondent_name: "Jeb Bush",
	category: "Ivy League",
	messages: [{text: "How important is legacy at Ivy League schools?",
	sender: "Student",
	timestamp: new Date()}]

});
questions_available.push({
	name: "Which Ivy League school is the third-best?",
	date_posted: new Date(),
	status: "waiting",
	respondent_name: "Martin O'Malley",
	category: "Ivy League",
	messages: [{text: "Which Ivy League school is the third-best?",
	sender: "Student",
	timestamp: new Date()}]

});

function daydiff(one, two){
	var daylength = 24 * 60 * 60 * 1000;
	return Math.floor(Math.abs(one.getTime() - two.getTime())/daylength);
}

function panelize_available_question(question, i){
	var days_ago;

	days_ago = (new Date()).getUTCDate() - question.date_posted.getDate();


	//Writing panel div for a question
	var panel_string = "<div class='panel panel-default' id='available-question-" + i + "'><div class='panel-heading'>Posted " + days_ago + " day(s) ago by " + question.respondent_name + "</div><div class='panel-body panel-body-homepage'>" + question.name + "</div><div class='panel-footer'>Tags: " + question.category;

	return panel_string;
}

var selected_question;

function fill_available_questions(){
	var current_question;
	$("#available-questions").empty();
	for(var i = 0; i < questions_available.length; i++){
		current_question = questions_available[i];
		$("#available-questions").append(panelize_available_question(current_question, i));

		$("#available-question-" + i).on('click', function(e){
			selected_question = questions_available[Number(($(this).closest(".panel").attr("id"))[($(this).closest(".panel").attr("id")).length-1])];
			$("#QuestionModal").modal();
		});
	}


}


$("#answer-button").on('click', function(e){
	$("#QuestionModal").modal("hide");
	selected_question.status = "in progress";
	var index = questions_available.indexOf(selected_question);
	questions_available.splice(index, 1);
	questions_responded.push(selected_question);
	questions_responded.sort(function(a,b){return b.date_posted.getTime() - a.date_posted.getTime()});
	selected_question = null;

	fill_question_panel(questions_responded);
	fill_chat_sidebar(questions_responded);
	fill_available_questions(questions_available);
	bind_profile_to_chat();

	switch_to_chat(0);

	$("#portal-page-2").addClass("hide");
	$("#portal-nav-btn-2").removeClass("active");
	$("#portal-page-3").removeClass("hide");
	$("#portal-nav-btn-3").addClass("active");
})


questions_responded.sort(function(a,b){return b.date_posted.getTime() - a.date_posted.getTime()});
var days_since = document.getElementById("days-since");
days_since.innerHTML = "Last question answered " + daydiff((new Date()), questions_responded[0].date_posted) + " day(s) ago"

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
		panel_string += ", asked by " + question.respondent_name + "</div></div>";
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

	days_since.innerHTML = "Last question answered " + daydiff((new Date()), questions_responded[0].date_posted) + " day(s) ago"
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

fill_chat_sidebar(questions_responded);


//implementing redirect from portal homepage to chat page
function render_chat(number){
	$(".messages").empty();
	var current_question = questions_responded[Number(number)];

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
	for(var j = 0; j < questions_responded.length; j++){
		if($("#chat-sidenav-" + j).hasClass("current-chat")){
			return j;
		}
	}
	return null;
}

function switch_to_chat(number){
	for(var j = 0; j < questions_responded.length; j++){
		if($("#chat-sidenav-" + j).hasClass("current-chat")){
			$("#chat-sidenav-" + j).removeClass("current-chat");
		}
	}

	$("#chat-sidenav-" + number).addClass("current-chat");
	render_chat(number);
}


function bind_profile_to_chat(){
	for(var i = 0; i < questions_responded.length; i++){
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
	message_post(questions_responded[current_question_index], document.forms["message-form"]["message-input"].value);
	document.forms["message-form"].reset();
	render_chat(current_question_index);
}