const sideBarInit = ()=>{
	const sideNav = document.querySelector('.sidenav');
	M.Sidenav.init(sideNav, {});
}

const sliderInit = ()=>{
	const slider = document.querySelector('.slider');
	M.Slider.init(slider, {
		indicators: true,
		height: 500,
		transition: 500,
		interval: 7000
	});	
}

const collapsibleInit = ()=>{
	var elem = document.querySelector('.collapsible');
	var instance = M.Collapsible.init(elem,{accordion:true});
}

$(document).ready(function(){
	// $('.sidenav').sidenav();
	$('.parallax').parallax();
	sideBarInit();
	sliderInit();
	collapsibleInit();
	$('#comment').characterCounter();
	const ss = document.querySelectorAll('.scrollspy');
	M.ScrollSpy.init(ss, {});
	$('.slick-carousel').slick({
		slidesToShow: 3,
		prevArrow: '<i class="material-icons slick-prev-custom-prev">keyboard_arrow_left</i>',
		nextArrow: '<i class="material-icons slick-prev-custom-next">keyboard_arrow_right</i>',
		draggable: true,
		slidesToScroll: 1,
		// autoplay: true,
		// autoplaySpeed: 6000,
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
			}
		},{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
			}
		}],
	});

	window.sr = ScrollReveal();
	sr.reveal('.revealThis',{reset:false,duration:500});
});