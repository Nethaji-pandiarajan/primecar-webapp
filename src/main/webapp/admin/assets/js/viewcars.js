var limit = 6;
$(function() {
	$.ajax({
		url: "viewcars",
		method: "POST",
		success: function(data) {
			$('#bootstrap-data-table-export').DataTable({
				data: JSON.parse(data),
				sort: true,
				searching: true,
				paging: true,
				scrollX: true,
				columns: [{
					'data': 'id'
				}, {
					'data': 'carName'
				}, {
					'data': 'brand'
				}, {
					'data': 'model'
				}, {
					'data': 'price'
				}, {
					'data': 'transmissionType'
				}, {
					'data': 'fuelType'
				}, {
					'data': 'year'
				}, {
					'data': 'distanceTravel'
				}, {
					'data': 'exteriorColour'
				}, {
					'data': 'interiorColour'
				}, {
					'data': 'seatingCapacity'
				}, {
					'data': 'isSolded'

				}, {
					'data': null,
					className: "dt-center editor-edit",
					defaultContent: '<i class="fa fa-pencil"/>',
					orderable: false
				},
				{
					'data': null,
					className: "dt-center editor-delete",
					defaultContent: '<i class="fa fa-trash"/>',
					orderable: false
				},
				{
					'data': null,
					//type: "checkbox",
					//className: "select-checkbox",
					//defaultContent: '<input type="checkbox" class="single-checkbox">',
					//orderable: false,

				}
				],
				"rowCallback": function(row, data, index) {
					if (data.isSolded) {
						$('td:eq(12)', row).css('background-color', 'Green');
						$('td:eq(12)', row).html('Sold');
					} else {
						$('td:eq(12)', row).css('background-color', 'Red');
						$('td:eq(12)', row).html('Unsold');
					}
					$('td:eq(12)', row).css('color', 'White');
					if (data.isUsed) {
						$('td:eq(15)', row).html('<input type="checkbox" id="'+data['id']+'" class="single-checkbox" checked>');
					} else {
						$('td:eq(15)', row).html('<input type="checkbox" class="single-checkbox">');
					}
				}
			});
			$('#bootstrap-data-table-export tbody').on('click', '.editor-delete', function(e) {
				e.preventDefault();
				var currentRow = $(this).closest("tr");
				var data = $('#bootstrap-data-table-export').DataTable().row(currentRow).data();
				var table = $('#bootstrap-data-table-export').DataTable();
				var tableRow = $(this).parents('tr');
				$.ajax({
					url: "deletecar",
					method: "POST",
					data: {
						dt: data['id']
					},
					success: function(data) {
						table.row(tableRow).remove().draw();
					}
				});

			});
			$('#bootstrap-data-table-export tbody').on('click', '.editor-edit', function(e) {
				e.preventDefault();
				var currentRow = $(this).closest("tr");
				var data = $('#bootstrap-data-table-export').DataTable().row(currentRow).data();
				localStorage.setItem('id', data['id']);
				window.location = "updateCars.html";
			});
			$('input.single-checkbox').on('click', function() {
				var currentRow = $(this).closest("tr");
				var data = $('#bootstrap-data-table-export').DataTable().row(currentRow).data();
				$(this).addClass("check");
				if ($('input.single-checkbox').filter(":checked").length > limit) {
					this.checked = false;
					$(this).removeClass("check")
					alert("Only 6 cars can be select");
				} else {
					if(data['isUsed'] && $(this).prop('checked')){
						data['isUsed'] = false;
					}
					$(this).attr('id', data['id']);
				}
			});
			$("button.saveDisplayCars").on('click', function(e) {
				e.preventDefault();
				let arr = [];
				let val;
				$("input.single-checkbox.check").each(function() {
					var currentRow = $(this).closest("tr");
					var data = $('#bootstrap-data-table-export').DataTable().row(currentRow).data();
					val = { id: $(this).attr('id'), isUsed: data['isUsed'] };
					arr.push(val);
				});
				if(arr.length != 0){
					$.ajax({
					url: "displaycars",
					method: "POST",
					data: {
						dt: JSON.stringify(arr)
					},
					success: function(data) {
						console.log(data);
					}, error: function(request) {
						alert(request.responseText);
					}
				});
				}
				console.log(arr);
			});

		}
	})

});

const sidebarWidth = document.getElementById('left-panel').clientWidth
const windowWidth = window.innerWidth
document.getElementById('bootstrap-data-table-export').style.width = `${windowWidth - (sidebarWidth + 1000)}px`

$(".addCars").click(function() {
	window.location = "addCars.html";
});