var price;
var price2;
var price3;


   
		
	!function ($) {
    function buildWidget(rate, changed, currents) {
        var color = changed < 0? "#d14836" : "#093" ;
        var valPrice = rate ? "<td>"+c(rate, currents)+" "+currents+"</td>" : "<td>? "+currents+"</td>", 
		valPercentHTML = changed ? '<td style="color:' + color + '">(' + changed + "%)</td>" : "<td></td>";
        return  valPrice + valPercentHTML;
    }
	
	function buildWidget2(rate, changed, currents) {
        var color = changed < 0? "#d14836" : "#093" ;
        var valPrice = rate ? "<td>"+c(rate, currents)+""+currents+"</td>" : "<td>?"+currents+"</td>", 
		valPercentHTML = changed ? '<td style="color:' + color + '">(' + changed + "%)</td>" : "<td></td>";
        return  valPrice + valPercentHTML;
    }
	
    function c(a, b) {
        return "credits" == b ? d(a) : e(a)
    }
    function d(a) {
        return a = a >= 1e3 ? Math.round(a).toLocaleString() : a >= 1 ? a.toFixed(8) : a < 1e-8 ? a.toPrecision(4) : a.toFixed(8)
    }
    function e(a) {
        return a = a >= 1 ? a >= 1e5 ? Math.round(a).toLocaleString() : a.toFixed(2) : a < 1e-6 ? a.toPrecision(2) : a.toFixed(6)
    }

    $(document).ready(function (a) {
		function Get_Status(a){
			a.get({
				url: "https://api.coinmarketcap.com/v1/ticker/credits/?ref=widget&convert=ETH",
				success: function (m) {
					
					if(m[0] == undefined){
						$('.main table').html("<tr><td></td></tr><tr><td>Waiting...</td></tr><tr><td></td></tr>")
					}else{
						// get 2 Numbers from API
					   price = parseFloat(m[0].price_usd),
							percent_change = Number(m[0].percent_change_24h).toFixed(2);
							price1 = parseFloat(m[0].price_eur),
							percent_change = Number(m[0].percent_change_24h).toFixed(2);
						price2 = parseFloat(m[0].price_eth),
						percent_change = Number(m[0].percent_change_24h).toFixed(2);
						price3 = parseFloat(m[0].price_btc),
						percent_change = Number(m[0].percent_change_24h).toFixed(2);
						
						
						
						// build Widget
						a('#target').html(buildWidget(price, percent_change,"USD"));
						a('#target1').html(buildWidget(price, undefined,"EUR"));
						a('#target2').html(buildWidget(price2, undefined,"ETH"));
						a('#target3').html(buildWidget(price3, undefined,"BTC"));
						var Pric = (price-0.167)/0.167*100;
						a('#target4').html(buildWidget2(Pric, undefined,"%"));
						a('#target4').css('color', (Pric > 0? "#093" : "#d14836" ));
						a('#target4').text("("+a('#target4').text()+")")
						
						
						var Pric = (price2-0.0002)/0.0002*100;
						a('#target5').html(buildWidget2(Pric, undefined,"%"));
						a('#target5').css('color', (Pric > 0? "#093" : "#d14836" ));
						//a('#target5').html(buildWidget2(price2/0.0002*100, undefined,"%"));
						a('#target5').text("("+a('#target5').text()+")")
						
						
						var Pric = (price3-0.00001754)/0.00001754*100;
						a('#target6').html(buildWidget2(Pric, undefined,"%"));
						a('#target6').css('color', (Pric > 0? "#093" : "#d14836" ));
						//a('#target6').html(buildWidget2(price3/0.00001754*100, undefined,"%"));
						a('#target6').text("("+a('#target6').text()+")")
						
					}
				}
			})
		};
		Get_Status(a);
        setInterval(function(){
				Get_Status(a)
			},
			20000
		);
		
		 //document.getElementById('output').style.visibility = 'hidden';
      document.getElementById('csInput').addEventListener('input', function(e){
   
		});
		
		
		$("#csInput").on("change click keyup input paste", function(e){
		
		if ($(this).val().toString().length === 18){
			return;
		}
		if (parseInt($(this).val()) > parseInt($(this).attr("max"))){
			$(this).val($(this).attr("max"));
		}
		
		   document.getElementById('output').style.visibility = 'visible';
		  let cs = e.target.value;
		  document.getElementById('usdOutput').innerHTML = cs*price + " USD";
		  document.getElementById('ethOutput').innerHTML = cs*price2  + " ETH";
		  document.getElementById('btcOutput').innerHTML = cs*price3  + " BTC";
		
		})
		
		document.getElementById('HiddenText').addEventListener('click', function(e){
			VisHid(e);
		});
    });
	
	
	
	
		function visibility (closeText, openText) {
    document.getElementById(closeText).style.display='none';
    document.getElementById(openText).style.display='';
}
function VisHid(el){
	var child = document.getElementsByClassName(el.target.attributes.number.value);
	if(child[0].style.display == ""){
	document.getElementById('HiddenText').src="../img/on.png";
	child[0].style.display = "none";}
	else if(child[0].style.display == "none"){
		child[0].style.display = "";
	document.getElementById('HiddenText').src="../img/off.png";}
		
}
}(jQuery);
  