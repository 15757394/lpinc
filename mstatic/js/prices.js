EC.prices = (function(){
	return {

		init : function(){

			EC.setMenu();
			EC.setFooter();
		}
	}
}());

$(function(){ EC.prices.init() });