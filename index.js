//When DOM loaded we attach click event to button
$(document).ready(function() {

	//start ajax request "amazon-output.json.analyzed"
	$.ajax({
		url: "amazon-output.json.analyzed",
		//force to handle it as text
		dataType: "text",
		success: function(data) {

			//data downloaded so we call parseJSON function 
			//and pass downloaded data
			var json = $.parseJSON(data);

			//                //session information
			//                var os = "<b>System OS: </b>" + json.system.os
			//                var location = "<b>Location of use: </b>" + json.system.location
			//                var browser = "<b>Browser Used: </b>" + json.system.browser
			//                var service = "<b>Service Name: </b>" + json.services[0].name
			//                var category = "<b>Service Type: </b>" + json.services[0].category
			//                var hits = "<b>Hits on Service: </b>" + json.services[0].hits
			//                
			//                document.getElementById("other_info").innerHTML=os + "<br>" + location + "<br>" + browser +  "<br>" + service +  "<br>" + category + "<br>" + hits
			//                
			//                //personal information
			//                var email = "<b>Email:</b> " + json.email.email[0][2]
			//                document.getElementById("personal_info").innerHTML=email
			//                
			//queries                            
			var amazon_data = null;
			var i = 0;
			for (i; i < json.services.length; i++) {
				if (json.services[i]["name"] == "Amazon") {
					amazon_data = json.services[i];
					break;
				}
			}

			var queries = amazon_data.queries;
			var queries_length = queries.length

			queries.sort(function(a, b) {
				return parseFloat(a[1]) - parseFloat(b[1])
			});

			for (i = 0; i < queries_length + 1; i++) {
				query = queries[i]

				myRe = /^[^,]+/;
				query_output = myRe.exec(query);
				if (query_output != "undefined") {
					$("<li/>", {
						"class": "query-list-elem",
						text: query_output
					}).appendTo(".query-list");

				}
			}


			//Products
			var products = amazon_data.products
			var products_length = products.length
			products.sort(function(a, b) {
				return parseFloat(a[1]) - parseFloat(b[1])
			});
			for (var x = 0; x < products_length; x++) {
				product_output = ("<b>Vendor: </b>" + products[x][0].vendor + "<br><br><b>Price: </b> " + products[x][0].price)
				image = '<img src="' + products[x][0].image + '"/>';

				$("<div/>", {
					id: x,
					class: "card",
				}).appendTo(".cards_wrapper")
				document.getElementById(x).innerHTML = "<em>" + products[x][0].name + "</em><br><br>" + image + "<br>" + product_output

			}
		}
	})
});
