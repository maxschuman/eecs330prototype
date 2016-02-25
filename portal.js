var btn;

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
