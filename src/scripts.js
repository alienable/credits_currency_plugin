$(document).ready(function(){
	Request();
	setInterval(Request,5000);
	$(".Button_Currency").on("click",function(){
		var el = $(".Currency");
		if(el.css("display") == "none"){
			el.removeAttr("style");
			$(this).find("img").attr("src","../img/converterGreen.svg");
		}else{
			el.css("display","none");
			$(this).find("img").attr("src","../img/converterBlack.svg");
		}
	});
	$(".Currency input").on("input",Currency);
});

function Request(){
	$.ajax({
	  url: 'https://api.coinmarketcap.com/v1/ticker/credits/?ref=widget&convert=ETH',
	  success: CoinMarkeResult
	});
}

function Currency(){
	var Val = $(".Currency input").val();
	if(Val.toString().length > 8){
		$(".Currency input").val(Val.substr(0,8));
		Currency();
		return;
	}
	$(".Currency .output .Usd").html((Number(Val) * Number($("#UsdNumber").html())).toFixed(6) + " USD");
	$(".Currency .output .Eth").html((Number(Val) * Number($("#EthNumber").html())).toFixed(6) + " ETH");
	$(".Currency .output .Btc").html((Number(Val) * Number($("#BtcNumber").html())).toFixed(6) + " BTC");
}

function CoinMarkeResult(res){
	if(res == undefined)
		return;
	if(res.length > 0){
		var Data = res[0];
		if(Data.rank != undefined)
			document.getElementById("Rank").innerText = "RANK " + Data.rank;
		
		if(Data.price_usd != undefined){
			document.getElementById("UsdNumber").innerText = Number(Data.price_usd).toFixed(6);
			var Pros = (Data.price_usd - 0.167) / 0.167 * 100;
			$("#UsdInterest").html("("+ Pros.toFixed(2) + " %)");
			$("#UsdInterest").css("color", Pros > 0? "#6aef6e" : "#f15454");
		}
		
		if(Data.price_btc != undefined){
			document.getElementById("BtcNumber").innerText = Number(Data.price_btc).toFixed(6);
			var Pros = (Data.price_btc - 0.00001754) / 0.00001754 * 100;
			$("#BtcInterest").html("("+ Pros.toFixed(2) + " %)");
			$("#BtcInterest").css("color", Pros > 0? "#6aef6e" : "#f15454");
		}
		
		if(Data.price_eth != undefined){
			document.getElementById("EthNumber").innerText = Number(Data.price_eth).toFixed(6);
			var Pros = (Data.price_eth - 0.0002)/0.0002*100;
			$("#EthInterest").html("("+ Pros.toFixed(2) + " %)");
			$("#EthInterest").css("color", Pros > 0 ? "#6aef6e" : "#f15454");
		}
		
		if(Data['24h_volume_usd'] != undefined){
			var Volume = Number(Data['24h_volume_usd']).toFixed(0);
			document.getElementById("VolumeUSD").innerText = "$" + Sres(Volume) + " USD";
		}
		
		if(Data.total_supply != undefined){
			var Total = Number(Data.total_supply).toFixed(0);
			document.getElementById("TotalSupply").innerText = Sres(Total) + " CS";
		}
		
		if(Data.available_supply != undefined){
			var Supply = Number(Data.available_supply).toFixed(0);
			document.getElementById("AvailableSupply").innerText = Sres(Supply) + " CS";
		}
		
		if(Data.market_cap_usd != undefined){
			var Cap = Number(Data.market_cap_usd).toFixed(0);
			document.getElementById("MarketCap").innerText = "$" + Sres(Cap) + " CS";
		}
		
		if(Data.percent_change_24h != undefined){
			var Val = Number(Data.percent_change_24h);
			var Str;
			var color;
			switch(true){
				case Val < 0:
					Str = Val + " %";
					color = "#f15454";
				break;
				case Val == 0:
					Str = Val + " %";
				break;
				default:
					Str = Val + " %";
					color = "#6aef6e";
				break;
			}
			$(".ContUsdInterest").css("background-color", color);
			$(".CurUsdInterest").html(Str);
		}
		
		Currency();
	}
}

function Sres(Val){
	return String(Val).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
}