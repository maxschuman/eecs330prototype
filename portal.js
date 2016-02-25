var btn;

for(i = 1; i <= 5; i++){
	btn = document.getElementById("portal-nav-btn-" + i);
	btn.onclick = function(e){

		for(i = 1; i <= 5; i++){
			if(document.getElementById("portal-nav-btn-" + i).classList.contains("active")){
				document.getElementById("portal-nav-btn-" + i).classList.remove("active");
			}
		}

		e.target.classList.add("active");
	};
}
