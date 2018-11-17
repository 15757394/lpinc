EC.Index = (function(){

	var _controller = {
		init : function(){

			EC.setMenu();
			EC.setFooter();
			this.swiper();

		}, swiper : function(){
			new Swiper(EC.ePage.find('.swiper-container'), {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				spaceBetween: 30,
				centeredSlides: true,
				autoplay: 2500,
				autoHeight: true,
				loop: true,
				autoplayDisableOnInteraction: false
			});
		}
	};

	return {
		init : function(){
			_controller.init();
		}
	};

}());

$(function(){ EC.Index.init() });