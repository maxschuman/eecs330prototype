var btn;
var questions_asked = [];
questions_asked.push(
{
	name: "What is the best school in America for human-computer interaction?",
	date_posted: new Date("2016-02-21"),
	status: "closed",
	respondent_name: "Donald Trump",
	category: "Computer Science Programs"
});
questions_asked.push(
{
	name: "Will I get a state scholarship in Nevada to go to college?",
	date_posted: new Date("2016-02-14"),
	status: "closed",
	respondent_name: "Bernie Sanders",
	category: "Scholarships, Nevada"
});
questions_asked.push(
{
	name: "What major makes the most money out of college?",
	date_posted: new Date("2016-02-18"),
	status: "closed",
	respondent_name: "Hillary Clinton",
	category: "General Majors"
});

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

function panelize_question(question){
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
	var panel_string = "<div class='panel panel-default'><div class='panel-heading'><span class='" + glyphicon_class + "''></span>" + status_statement + ", posted " + days_ago + " day(s) ago</div><div class='panel-body'>" + question.name + "</div><div class='panel-footer'>Category: " + question.category;
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
		panel_holder.innerHTML += panelize_question(questions[i]);
	}
}

function validateForm() {
    var x = document.forms["question-form"]["question"].value;
    if (x == null || x == "") {
        alert("Please enter a question.");
        return false;
    }

    var y = document.forms["question-form"]["tags"].value;
    if (x == null || x == "") {
        alert("Please add at least one tag to your question.");
        return false;
    }

    return true;
}

var submitQuestion = document.getElementById("question-submit");
submitQuestion.onsubmit = function(e){
	if(validateForm()){
		var cat_string = document.forms["question-form"]["tags"].value.replace(",", ", ");

		questions_asked.push({
			name:document.forms["question-form"]["question"].value,
			date_posted: new Date(),
			status: "waiting",
			respondent_name: null,
			category: cat_string
		});
		fill_question_panel(questions_asked);
	}
	return validateForm();
}