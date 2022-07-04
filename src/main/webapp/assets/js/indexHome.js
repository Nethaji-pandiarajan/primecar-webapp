$(function() {
	displayImages();
	bindEvents();
});
function displayImages() {
	$.ajax({
		url: "homedispalyCars",
		type: "POST",
		success: function(result) {
			let data = JSON.parse(result);
			data.forEach(element => {
				recentCars = '<div class="col-lg-4 col-md-6 col-sm-6">'
					+ '<div class="single-products-box">'
					+ '<div class="single-categories-box imagecontiner">'
					+ '<a href="">'
					+ '<img src="' + element.imageBash64_1 + '" class="main-image stocksimg" alt="image">'
					+ '</a>'
					+ '</div>'
					+ '<div class="products-content">'
					+ '<h3><a href="">' + element.carName + '</a></h3>'
					+ '<div class="price">'
					+ '<span style="padding:5px;background-color:#fcb600;color:white;border-radius:10px">₹' + element.price + '</span>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</div>';
				$("div.appendCars").append(recentCars);
				if (element.isSolded) {
					$("div.imagecontiner").append('<div class="sale-tag">Sale!</div>');
				}
				
			});
		}
	});

}
function bindEvents() {
	$("#brand").on('change', function() {
		let brand = $("#brand").val();
		let model = document.getElementById("models");
		model.innerHTML = "";
		let optionArr;
		if (brand == "AUDI") {
			optionArr = ['null|---Select model---', "A3 | A3", "A3 CONVERTIBLE | A3 CONVERTIBLE", "A5 | A5", "A6 | A6", "A8 | A8", "RS5 | RS5", "Q5 | Q5", "Q3 | Q3", "Q7 | Q7", "TT | TT", "R8 | R8"];
		} else if (brand == "BMW") {
			optionArr = ['null|---Select model---', "3 SERIES | 3 SERIES", "X5 | X5", "118D | 118D", "530I | 530I", "X3 | X3", "X5 | X5", "5 SERIES | 5 SERIES", "X1 | X1", "X4 | X4", '6GT | 6GT', '330LI | 330LI', '320D | 320D', '320I | 320I', '520D | 520D', '530D | 530D']
		} else if (brand == "Mercedes Benz") {
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
		} else if (brand == "JEEP") {
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
			newOption.value = pair[0];
			newOption.innerHTML = pair[1];
			model.options.add(newOption);
		}
	});
	$(document).on('click', ".searchFilter", function() {
		let brand = $("#brand").val();
		let model = $("#models").val();
		let fuelType = $("#fueltype").val();
		let transmissionType = $("#transmissiontype").val();
		let fromYear = $("span.irs-from").text();
		let toYear = $("span.irs-to").text();
		let priceChoice = $("#selectPrice").val().trim();

		let value = {
			brand: brand,
			model: model, fuelType: fuelType,
			transmissionType: transmissionType,
			fromYear: fromYear.replace(" ", ""), toYear: toYear.replace(" ", ""),
			priceChoice: priceChoice
		};
		localStorage.setItem("filterData", JSON.stringify(value));
		window.location = "buying.html"
	});
}