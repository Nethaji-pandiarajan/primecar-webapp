$(function() {
	let id = localStorage.getItem("id");
	$.ajax({
		url: "product",
		type: "POST",
		data: {
			dt: id
		},
		success: function(result) {
			let data = JSON.parse(result);
			$("#carname").html(data.carName);
			$("#prod-price").html("₹"+data.price);
			$("#brand").html(data.brand);
			$("#model").html(data.model);
			$("#transmission").html(data.transmissionType);
			$("#fuel").html(data.fuelType);
			$("#year").html(data.year);
			$("#distanceTraveled").html(data.distanceTravel+"km");
			$("#extColour").html(data.exteriorColour);
			$("#intColour").html(data.interiorColour);
			$("#seats").html(data.seatingCapacity);
			$("#prod-description").append(data.description);
			$("#prod-finance").append(data.finance);
			$("#prod-buyfromus").append(data.whyBuyFromUs);
			$("#prod-warrenty").append(data.warranty);
			$(".image_1").attr("src",data.imageBash64_1);
			$(".image_2").attr("src",data.imageBash64_2);
			$(".image_3").attr("src",data.imageBash64_3);
			$(".image_4").attr("src",data.imageBash64_4);
			$(".image_5").attr("src",data.imageBash64_5);
		}
	});
})