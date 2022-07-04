$(function() {
	bindEvents();
	//$("#form2").hide(1000);
	//$("#form3").hide(1000);
	$("#form2").fadeOut(1000);
	$("#form3").fadeOut(1000);
})
function bindEvents() {
	$("a.next1").on("click", function() {
		//$("#form1").hide(1000);
		//$("#form2").show(1000);
		$('#form2').fadeIn(500);
		$('#form1').fadeOut(500);
	});
	$("a.next2").on("click", function() {
		//$("#form2").hide(1000);
		//$("#form3").show(1000);
		$('#form3').fadeIn(500);
		$('#form2').fadeOut(500);
	});
	$("a.previous2").on("click", function() {
		//$("#form2").hide(1000);
		//$("#form1").show(1000);
		$('#form1').fadeIn(500);
		$('#form2').fadeOut(500);
	});
	$("a.previous3").on("click", function() {
		//$("#form3").hide(1000);
		//$("#form2").show(1000);
		$('#form2').fadeIn(500);
		$('#form3').fadeOut(500);
	});
}