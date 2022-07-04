function validator(){
	debugger;
	$.ajax({
			url : "SessionValidator",
			type : "POST",
			data:{
				dt :localStorage.getItem("id")
			},
			success : function(result) {			
				let data = JSON.parse(result);
				if(!data){
					window.location = "index.html";
				}				
			},
			error: function (xhr, ajaxOptions, thrownError) {
		        alert("Invalid user");
		        window.location = "index.html";
		      }
		});
}