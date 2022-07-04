$(function() {
	
	if(localStorage.getItem("filterData") == null){
		fetchCarDetails(null);
	}else{
		fetchCarDetails(localStorage.getItem("filterData"));
		localStorage.removeItem("filterData");
	}
	bindEvents();
});
function bindEvents() {
	$("#brand").on('change', function() {
		let brand = $("#brand").val();
		let model = document.getElementById("models");
		model.innerHTML = "";
		let optionArr;
		if (brand == "Audi") {
			optionArr = ['null|---Select model---', "A3 | A3", "A3 Convertible | A3 Convertible", "A5 | A5", "A6 | A6", "A8 | A8", "RS5 | RS5", "Q5 | Q5", "Q3 | Q3", "Q7 | Q7", "TT | TT", "R8 | R8"];
		} else if (brand == "BMW") {
			optionArr = ['null|---Select model---', "3 Series | 3 Series", "X5 | X5", "118D | 118D", "530I | 530I", "X3 | X3", "X5 | X5", "5 Series | 5 Series", "X1 | X1", "X4 | X4", '6GT | 6GT', '330LI | 330LI', '320D | 320D', '320I | 320I', '520D | 520D', '530D | 530D']
		} else if (brand == "Mercedes") {
			optionArr = ['null|---Select model---', 'GLA|GLA', 'GLE|GLE', 'S400|S400', 'S400|S400', 'B200|B200', 'GLE 250d|GLE 250D', 'GLE 350d|GLE 350D', 'C220D|C220D', 'E250D|E250D', 'GLS350D|GLS350D', 'C200|C200'];
		} else if (brand == "Skoda") {
			optionArr = ['null|---Select model---', 'Superb | Superb', 'Octavia | Rapid', 'rapid | Rapid'];
		} else if (brand == "Land Rover") {
			optionArr = ['null|---Select model---', 'Discovary|Discovary'];
		} else if (brand == "Mini") {
			optionArr = ['null|---Select model---', 'Cooper s|Cooper s'];
		} else if (brand == "Porsche") {
			optionArr = ['null|---Select model---', 'Macan|Macan', 'Cayenne|Cayenne', 'Cayman|Cayman', 'Panamera|Panamera'];
		} else if (brand == "Jaguar") {
			optionArr = ['null|---Select model---', 'F peace|F peace', 'XF|XF'];
		} else if (brand == "Range Rover") {
			optionArr = ['null|---Select model---', 'Evoque|Evoque', 'Velar|Velar'];
		} else if (brand == "Volvo") {
			optionArr = ['null|---Select model---', 'v40|V40', 'xc90|Xc90', 'xc60|Xc60', 'xc40|Xc40'];
		} else if (brand == "Jeep") {
			optionArr = ['null|---Select model---', 'Compass limited|Compass limited'];
		} else if (brand == "KIA") {
			optionArr = ['null|---Select model---', 'Seltos|Seltos'];
		} else if (brand == "Hyundai") {
			optionArr = ['null|---Select model---', 'creta|Creta'];
		} else if (brand == "Toyota") {
			optionArr = ['null|---Select model---', 'Innova crysta|Innova crysta', 'Cambry hybrid|Cambry hybrid'];
		} else if (brand == "LEXUS") {
			optionArr = ['null|---Select model---', 'Nh300x|Nh300x'];
		} else if (brand == "Mahindra") {
			optionArr = ['null|---Select model---', 'XUV500|XUV500'];
		} else if (brand == "Ford") {
			optionArr = ['null|---Select model---', 'Endeacour|Endeacour'];
		}
		for (let option in optionArr) {
			let pair = optionArr[option].split("|");
			var newOption = document.createElement("option");
			newOption.value = pair[0];
			newOption.innerHTML = pair[1];
			model.options.add(newOption);
		}
		//$(model).niceSelect();
		
	});
	
	$(document).on('click',".product-full-info",function(){
		localStorage.setItem("id",$(this).attr("data-id"));
		window.location = 'productsPage.html';
	});
	
	$(document).on('click',"button.viewDetails", function() {
		let data = JSON.parse($(this).attr("data-object"));
		let popup ='<div class="modal-dialog modal-dialog-centered" role="document">'
			+ '<div class="modal-content">'
			+ '<button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">'
			+ '<span aria-hidden="true"><i class="bx bx-x"></i></span>'
			+ '</button>'
			+ '<div class="row align-items-center">'
			+ '<div class="col-lg-6 col-md-6">'
			+ '<div class="products-image">'
			+ '<img src="'+data.imageBash64_1+'" alt="image">'
			+ '</div>'
			+ '</div>'
			+ '<div class="col-lg-6 col-md-6">'
			+ '<div class="products-content">'
			+ '<h3><a href="#">'+data.carName+'</a></h3>'
			+ '<div class="price">'
			+ '<span class="new-price">₹'+data.price+'</span>'
			+ '</div>'
			+ '<ul class="products-info">'
			+ '<li><span>Brand:</span> <a href="#">'+data.brand+'</a></li>'
			+ '<li><span>Model:</span> <a href="#">'+data.model+'</a></li>'
			+ '<li><span>Transmission :</span> <a href="#">'+data.transmissionType+'</a></li>'
			+ '<li><span>Fuel :</span> <a href="#">'+data.fuelType+'</a></li>'
			+ '<li><span>Year :</span> <a href="#">'+data.year+'</a></li>'
			+ '<li><span>Mileage :</span> <a href="#">'+data.distanceTravel+' KMs</a></li>'
			+ '<li><span>Exterior Colour :</span> <a href="#">'+data.exteriorColour+'</a></li>'
			+ '<li><span>Interior Colour :</span> <a href="#">'+data.interiorColour+'</a></li>'
			+ '<li><span>Seating Capacity :</span> <a href="#">'+data.seatingCapacity+'</a></li>'
			+ '</ul>'
			+ '<div class="products-add-to-cart mt-2">'
			+ '<a href="#" class="default-btn"><i class="fa-brands fa-whatsapp"></i> Send Enquiry</a>'
			+ '</div>'
			+ '<a href="#" data-id="'+data.id+'" class="view-full-info product-full-info">View Full Info</a>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
			+ '</div>';
			$("div.appendPopup").attr('aria-hidden','');
			$("div.appendPopup").attr('aria-modal','true');
			$("div.appendPopup").css('display','block');
			$("div.appendPopup").addClass('show');
			$("div.appendPopup").html(popup);
	});

	$(document).on('click',"button.close",function(){
		$("div.appendPopup").attr('aria-hidden','true');
		$("div.appendPopup").attr('aria-modal','');
		$("div.appendPopup").css('display','none');
		$("div.appendPopup").removeClass('show');
		$("div.appendPopup").html('');
	});
	$(document).on('click',".searchFilter",function(){
		let brand = $("#brand").val().trim();
		let model = $("#models").val().trim();
		let fuelType = $("#fueltype").val().trim();
		let transmissionType = $("#transmissiontype").val().trim();
		let fromYear = $("span.irs-from").text();
		let toYear = $("span.irs-to").text();
		let priceChoice = $("#selectPrice").val().trim();
		let value = {brand:brand,
					model:model,fuelType:fuelType,
					transmissionType:transmissionType,
					fromYear:fromYear.replace(" ",""),toYear:toYear.replace(" ",""),
					priceChoice:priceChoice
					};
		fetchCarDetails(JSON.stringify(value));
	});
}

function fetchCarDetails(value) {
	$.ajax({
		url: "buying",
		type: "POST",
		data:{
			dt:value
		},
		success: function(result) {
			let carDetails;
			let data = JSON.parse(result);
			$("div.appendCars").html('');
			data.forEach(element => {
				carDetails = +'<div class="row justify-content-center mb-3">'
					+ '<div class="col-md-12 col-xl-10 ">'
					+ '<div class="card shadow-0 border rounded-3">'
					+ '<div class="card-body">'
					+ '<div class="row">'
					+ '<div class="col-md-12 col-lg-3 col-xl-4 mb-4 mb-lg-0">'
					+ '<div class="bg-image hover-zoom ripple rounded ripple-surface">'
					+ '<img src="'+element.imageBash64_1+'"'
					+ 'class="w-100" style="height:200px;" />'
					+ '<a href="#!">'
					+ '<div class="hover-overlay">'
					+ '<div class="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>'
					+ '</div>'
					+ '</a>'
					+ '</div>'
					+ '</div>'
					+ '<div class="col-md-6 col-lg-6 col-xl-5">'
					+ '<h5>' + element.carName + '</h5>'//carname
					+ '<ul class="mt-3" style="flex-wrap: wrap;display: flex;">'
					+ '<li class="product-content-list"><i class="fa-solid fa-road"></i> &nbsp;' + element.distanceTravel + ' Km</li>'//km
					+ '<li class="product-content-list"><i class="fa-solid fa-gear"></i> &nbsp;' + element.transmissionType + '</li>'//transmission
					+ '<li class="product-content-list"><i class="fa-solid fa-calendar"></i> &nbsp;' + element.year + '</li>'//year
					+ '<li class="product-content-list"><i class="fa-solid fa-gas-pump"></i> &nbsp;' + element.fuelType + '</li>'//fuel
					+ '<li class="product-content-list"><i class="fa-solid fa-car"></i> &nbsp;' + element.model + '</li>'//model
					+ '<li class="product-content-list"><i class="fa-solid fa-palette"></i> &nbsp;' + element.exteriorColour + '</li>'//ext_color
					+ '</ul>'
					+ '</div>'
					+ '<div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">'
					+ '<div class="d-flex flex-row align-items-center mb-1">'
					+ '<h4 class="mb-3 me-1 fs-3">₹' + element.price + '</h4>'//price
					+ '</div>'
					+ '<div class="d-flex flex-column mt-4">'
					+ "<button data-object='" + JSON.stringify(element) + "' class='btn btn-primary btn-sm w-100 viewDetails' type='button'> <i class='bx bx - search - alt'></i>View</button>"
					+ '<button data-id="'+element.id+'" class="btn btn-primary btn-sm mt-2 product-full-info" type="button">Enquire now ! </button>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</div>';
				$("div.appendCars").append(carDetails);
			});
		}
	});
}