const sideBarInit = ()=>{
	const sideNav = document.querySelector('.sidenav');
	M.Sidenav.init(sideNav, {});
}

const sliderInit = ()=>{
	const slider = document.querySelector('.slider');
	M.Slider.init(slider, {
		indicators: false,
		height: 500,
		transition: 500,
		interval: 6000
	});	
}

const collapsibleInit = ()=>{
	var elem = document.querySelector('.collapsible');
	var instance = M.Collapsible.init(elem,{accordion:true});
}


$(document).ready(function(){
	// $('.sidenav').sidenav();
	sideBarInit();
	sliderInit();
	collapsibleInit();
	$('#comment').characterCounter();
});