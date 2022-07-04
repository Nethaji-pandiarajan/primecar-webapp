let image1;
let image2;
let image3;
let image4;
let image5;
$(function(e) {
	let id = localStorage.getItem("id");
	$("#prod-id").val(id);
	localStorage.clear();
	$.ajax({
		url: "UpdateCars",
		type: "POST",
		data: {
			dt: id
		},
		success: function(result) {
			let data = JSON.parse(result);
			$("#carname").val(data.carName);
			$("#prod-price").val(data.price);
			$("#brand").val(data.brand);
			$("#brand").trigger("change");
			$("#model").val(data.model);
			$("#transmission").val(data.transmissionType);
			$("#fuel").val(data.fuelType);
			$("#year").val(data.year);
			$("#distanceTraveled").val(data.distanceTravel+"km");
			$("#extColour").val(data.exteriorColour);
			$("#intColour").val(data.interiorColour);
			$("#seats").val(data.seatingCapacity);
			$("#prod-description").val(data.description);
			$("#prod-finance").val(data.finance);
			$("#prod-buyfromus").val(data.whyBuyFromUs);
			$("#prod-warrenty").val(data.warranty);
			$(".image_1").attr("src",data.imageBash64_1);
			$(".image_2").attr("src",data.imageBash64_2);
			$(".image_3").attr("src",data.imageBash64_3);
			$(".image_4").attr("src",data.imageBash64_4);
			$(".image_5").attr("src",data.imageBash64_5);
		}
	});
	bindEvents();
})
function bindEvents() {
	$("#brand").on('change', function() {
		let brand = $("#brand").val();
		let model = document.getElementById("model");
		model.innerHTML = "";
		let optionArr;
		if (brand == "AUDI") {
			optionArr = ['null|---Select model---', "A3 | A3", "A3 CONVERTIBLE | A3 CONVERTIBLE", "A5 | A5", "A6 | A6", "A8 | A8", "RS5 | RS5", "Q5 | Q5", "Q3 | Q3", "Q7 | Q7", "TT | TT", "R8 | R8"];
		} else if (brand == "BMW") {
			optionArr = ['null|---Select model---', "3 SERIES | 3 SERIES", "X5 | X5", "118D | 118D", "530I | 530I", "X3 | X3", "X5 | X5", "5 SERIES | 5 SERIES", "X1 | X1", "X4 | X4", '6GT | 6GT', '330LI | 330LI', '320D | 320D', '320I | 320I', '520D | 520D', '530D | 530D']
		} else if (brand == "MERCEDES BENZ") {
			optionArr = ['null|---Select model---', 'GLA|GLA', 'GLE|GLE', 'S400|S400', 'S400|S400', 'B200|B200', 'GLE 250d|GLE 250D', 'GLE 350d|GLE 350D', 'C220D|C220D', 'E250D|E250D', 'GLS350D|GLS350D', 'C200|C200'];
		} else if (brand == "SKODA") {
			optionArr = ['null|---Select model---', 'SUPERB | SUPERB', 'OCTAVIA | RAPID', 'RAPID | RAPID'];
		} else if (brand == "LAND ROVER") {
			optionArr = ['null|---Select model---', 'DISCOVARY|DISCOVARY'];
		} else if (brand == "MINI") {
			optionArr = ['null|---Select model---', 'COOPER S|COOPER S'];
		} else if (brand == "PORSCHE") {
			optionArr = ['null|---Select model---', 'MACAN|MACAN', 'CAYENNE|CAYENNE', 'CAYMAN|CAYMAN', 'PANAMERA|PANAMERA'];
		} else if (brand == "JAGUAR") {
			optionArr = ['null|---Select model---', 'F PEACE|F PEACE', 'XF|XF'];
		} else if (brand == "RANGE ROVER") {
			optionArr = ['null|---Select model---', 'EVOQUE|EVOQUE', 'VELAR|VELAR'];
		} else if (brand == "VOLVO") {
			optionArr = ['null|---Select model---', 'V40|V40', 'XC90|XC90', 'XC60|XC60', 'XC40|XC40'];
		} else if (brand == "Jeep") {
			optionArr = ['null|---Select model---', 'COMPASS LIMITED|COMPASS LIMITED'];
		} else if (brand == "KIA") {
			optionArr = ['null|---Select model---', 'SELTOS|SELTOS'];
		} else if (brand == "HYUNDAI") {
			optionArr = ['null|---Select model---', 'CRETA|CRETA'];
		} else if (brand == "TOYOTA") {
			optionArr = ['null|---Select model---', 'INNOVA CRYSTA|INNOVA CRYSTA', 'CAMBRY HYBRID|CAMBRY HYBRID'];
		} else if (brand == "LEXUS") {
			optionArr = ['null|---Select model---', 'NH300X|NH300X'];
		} else if (brand == "MAHINDRA") {
			optionArr = ['null|---Select model---', 'XUV500|XUV500'];
		} else if (brand == "FORD") {
			optionArr = ['null|---Select model---', 'ENDEACOUR|ENDEACOUR'];
		}
		for (let option in optionArr) {
			let pair = optionArr[option].split("|");
			var newOption = document.createElement("option");
			newOption.value = pair[0].trim();
			newOption.innerHTML = pair[1];
			model.options.add(newOption);
		}
	});
	$("button.updateclick").on("click",function(){
		let data = {
			carName:$("#carname").val(),
			brand:$("#brand").val(),
			model:$("#model").val(),
			fuelType:$("#transmission").val(),
			transmissionType:$("#fuel").val(),
			year:$("#year").val(),
			price:$("#prod-price").val(),
			distanceTravel:$("#distanceTraveled").val(),
			exteriorColour:$("#extColour").val(),
			interiorColour:$("#intColour").val(),
			seatingCapacity:$("#seats").val(),
			description:$("#prod-description").val(),
			finance:$("#prod-finance").val(),
			whyBuyFromUs:$("#prod-buyfromus").val(),
			warranty:$("#prod-warrenty").val(),
			imageBash64_1:image1,
			imageBash64_2:image2,
			imageBash64_3:image3,
			imageBash64_4:image4,
			imageBash64_5:image5
		}
		let value = {id:id,data:data,page:"update"};
		updateCars(JSON.stringify(value));
	});
}
function encodeImageFileAsURL(element) {
	var file = element.files[0];
	var reader = new FileReader();
	reader.onloadend = function(e) {
		e.preventDefault();
		if (element.id == 'image1') {
			image1 = reader.result;
		}
		if (element.id == 'image2') {
			image2 = reader.result;
		}
		if (element.id == 'image3') {
			image3 = reader.result;
		}
		if (element.id == 'image4') {
			image4 = reader.result;
		}
		if (element.id == 'image5') {
			image5 = reader.result;
		}
	}
	reader.readAsDataURL(file);
}
function updateCars(value) {
			$.ajax({
				url : "addProduct",
				type : "POST",
				data:{
					dt:value
				},
				success : function(result) {
					let data = JSON.parse(result);
					
				}
		});
		}