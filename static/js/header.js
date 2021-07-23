var navOpen = false;
$(".site-content-contain").click(function(){
   if ($("#body").hasClass("sidenav-active") && navOpen == true) {
      openNav();
   }
});

function openNav() {
   if (navOpen == true) {
      document.getElementById("sidenav").classList.remove('active');
      document.getElementById("body").classList.remove('sidenav-active');
      $('#mobile-menu-dynamic').attr('src','https://media-buca.s3.amazonaws.com/dev/homepage/hamburger-icon.png');
      $('#top-header').removeClass('isOpen');
      $('html').css('overflow', 'initial');
         $('body').css('overflow', 'initial');
      navOpen = false;
   } else {
      document.getElementById("sidenav").classList.add('active');
      document.getElementById("body").classList.add('sidenav-active');
      $('#mobile-menu-dynamic').attr('src','https://media-buca.s3.amazonaws.com/dev/homepage/x-mark-64.png');
      $('#top-header').addClass('isOpen');
      $('html').css('overflow', 'hidden');
      $('body').css('overflow', 'hidden');
      setTimeout(function(){ 
         navOpen = true;
      }, 100);
   }
 }

 if(window.location.pathname == '/trust-funds/') {
    var target = document.getElementById("trust-funds-menu-item");
      target.style.color = "#0C5A9C";
      target.style.borderBottom = "3px solid #0C5A9C";
}

if(window.location.pathname == '/find-a-lawyer/') {
   var target = document.getElementById("find-a-lawyer-menu-item");
     target.style.color = "#0C5A9C";
     target.style.borderBottom = "3px solid #0C5A9C";
}

if(window.location.pathname == '/case-value/') {
   var target = document.getElementById("case-value-menu-item");
     target.style.color = "#0C5A9C";
     target.style.borderBottom = "3px solid #0C5A9C";
}

if(window.location.pathname == '/settlements-lawsuits/') {
   var target = document.getElementById("settlements-lawsuits-menu-item");
     target.style.color = "#0C5A9C";
     target.style.borderBottom = "3px solid #0C5A9C";
}

// Store Locator App/Cookies

// Globals
var buca_location_data = null;
var ajaxurl = window.location.href+'/wp-admin/admin-ajax.php';

// Main Startup functions for all pages

$(function(){

	setMobileNavigationLinks();

});

$(document).ready(function($){

	positionContent();

	var buca_location_cookie = getLocationCookie();

	if( buca_location_cookie!=null && buca_location_cookie!="" ) {

// 		var check_cookie = JSON.parse(buca_location_cookie);
// 		if(check_cookie.hours==undefined || check_cookie.hours=='') {
// 			setLocationCookie(check_cookie.id,null);
// 			buca_location_cookie = getLocationCookie();
// 		}		
		if(buca_location_data==null){
			buca_location_data = JSON.parse(buca_location_cookie);
		}
		
		setStoreLocatorLink();
	}
	
	// Header Sub Navigation
	$('#header-bottom nav ul.main-nav li.toggle a').bind('click', function() {

		var toggle = $(this).find('span');

		if($('#header-bottom nav ul.secondary-nav').css('display')!='none') {
			//$('#header-bottom nav ul.secondary-nav').slideUp();
			$('#header-bottom nav ul.secondary-nav').animate({'left': -200}, function(){
				$(toggle).removeClass('fa-times');
				$('#header-bottom nav .overlay').fadeOut(function(){
					$('#header-bottom nav ul.secondary-nav').hide();
				});
			});					
		} else {
			$('#header-bottom nav .overlay').fadeIn(function(){
				$(toggle).addClass('fa-times');
				$('#header-bottom nav ul.secondary-nav').show().animate({'left': 0 });
			});
		}

	});	

	$('#store-locator .toggle, #store-locator-detail .toggle').bind('click', function(e){
		e.preventDefault();
		toggleStoreLocatorSearch();
	});


	$('#store-locator-search-form button.search').bind('click', function() {

		var search_terms = $('#store-locator-search-keywords').val();

		if(search_terms!='') {
			$('#store-locator-search-keywords').html('').removeClass('error');
			searchStoreLocations(search_terms);
		} else {
			$('#store-locator-search-keywords').html('Enter City, State or a Zip Code').addClass('error');
		}

	});

	$('#store-locator-search-form button.view-all-locations').bind('click', function() {
		window.location = 'https://www.bucadibeppo.com/restaurants/';
	});

	$('.toggle-location-detail, #store-locator-detail .close').bind('click', function(){

		if($('#store-locator-search').css('display')!='none') {
			$('#store-locator-search').slideUp('swing', function(){
				$('#header-overlay').fadeOut();
			});
		}

		if($('#store-locator-detail').css('display')!='none') {
			$('#store-locator-detail').slideUp('swing', function(){
				$('#header-overlay').fadeOut();
			});
		} else {

			// check/load location
			if( $('#store-locator-detail.location-detail').data('store-code')==NaN 
			   || $(this).data('store-code')!=$('#store-locator-detail.location-detail').data('store-code')) {
				setStoreLocationDetail()
			}

			positionStoreLocatonDetail();

			$('#header-overlay').fadeIn();
			$('#store-locator-detail').slideDown();
		}

	});

	$('#store-locator-search .close').bind('click', function(){

		if($('#store-locator-search').css('display')!='none') {
			$('#store-locator-search').fadeOut('swing', function(){
				$('#header-overlay').fadeOut('swing', function(){
					$('#store-locator-search-results-list').html('');
				});
			});	
		}

	});
	
	$('#header-overlay').on('click', function() {
		if($('#store-locator-search').css('display')!='none') {
			$('#store-locator-search').slideUp('swing', function(){
				$('#header-overlay').fadeOut();
			});
		}

		if($('#store-locator-detail').css('display')!='none') {
			$('#store-locator-detail').slideUp('swing', function(){
				$('#header-overlay').fadeOut();
			});
		}
	});
	
	$(window).resize(function(){

		if($('#store-locator-search').css('display')!='none') {
			setStoreLocatorSearchResultsHeight();
		}

	});
	
});

$(document).click(function(event) { 
	$target = $(event.target);
	if($target.closest('#store-locator-detail').length>0 && !$target.closest('#store-locator-detail div').length && $('#store-locator-detail').css('display')!='none') {
		$('#store-locator-detail').slideUp();
		$('#header-overlay').fadeOut();
	}        
});

var resizeTimer;
$(window).on('resize', function(e) {

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
	positionContent();
	setMobileNavigationLinks();
  }, 50);

});

function positionContent() {
	var header_height = $('#header').outerHeight();
	if( $('#wpadminbar')!=undefined && $('#wpadminbar').length>0 ) {
		header_height = header_height - $('#wpadminbar').outerHeight();
	}
	$('#page-content').css( 'padding-top', header_height );
}

function positionFooter() {

	var page_content_height = $('header').outerHeight();
		page_content_height + $('main').outerHeight();
		page_content_height + $('footer').outerHeight();

	if( page_content_height < $(window).height() ) {

		var page_content_min_height = $(window).height();
			page_content_min_height = page_content_min_height - $('footer').outerHeight();

		$('#page-content').css( 'height', page_content_min_height );
	}	

}

function toggleStoreLocatorSearch(){

	positionStoreLocatonSearch();

	if($('#store-locator-search').css('display')!='none') {	
		$('#store-locator-search').slideUp();
		$('#header-overlay').fadeOut();
	} else {
		if($('#store-locator-detail').css('display')!='none'){
			$('#store-locator-detail').slideUp();
			$('#header-overlay').fadeOut();
		}
		$('#header-overlay').fadeIn();
		$('#store-locator-search').fadeIn(function(){
			$(this).find('.row').first().slideDown();			
		});
	}
}

function positionStoreLocatonSearch(){
	$('#store-locator-search').css({
		'top': $('#header-top').outerHeight()
	});
}

function positionStoreLocatonDetail(){			
	var offset_top = $('#header').outerHeight();
	var container_height = $('#store-locator-detail').outerHeight() + offset_top;
	if( container_height > $(window).height() ) {
		container_height = $(window).height()-offset_top;
	} else {
		container_height = 'auto';
	}
	$('#store-locator-detail').css({
		'height': container_height,
		'top': offset_top,
		'overflow': 'scroll'
	});
}

function setStoreLocatorSearchResultsHeight() {
	var offset_top = $('#header-top').height();
	$('#store-locator-search').css({
		'height': $(window).height() - offset_top,
		'overflow': 'scroll'
	});
}

var store_location_search_results = [];
function searchStoreLocations(search_term) {

	var yext_location_search_url = 'https://liveapi.yext.com/v2/accounts/1323877/entities/geosearch';
	var v_timestamp = moment().format('YYYYMMDD');
	yext_location_search_url += '?api_key=3b1812e3409df5ad02c068e4ca43c36e&v='+v_timestamp+'&radius=100&filter=%7B%22name%22%3A%7B%22%24contains%22%3A%22Buca%22%7D%7D';
	yext_location_search_url += '&location='+search_term;

	$.getJSON(yext_location_search_url, function(result) {

		$('#store-locator-search-results-list').html('');

		var store_location_search_results = [];

		if(result.response.entities.length>0) {
			
			$.each(result.response.entities, function (key, val) {

				yext_location = val;

				if(!yext_location.closed) {

					var location_id = yext_location.meta.id.replace('\d{1,15}');

					var location_detail = '<div class="location-detail">';

					var location_name = yext_location.c_geomodifier;//'Buca di Beppo '+

					location_detail += '<label class="name" data-store-code="'+location_id+'">' + location_name + '</label>';

					location_detail += '<div class="row">';

					var google_maps_url = '#';
					//yext_location.displayCoordinate.latitude
					//yext_location.displayCoordinate.longitude

					var location_address = '<address><a href="'+google_maps_url+'">';
					location_address += yext_location.address.line1 + '</br>' + yext_location.address.city + ', ' + yext_location.address.region + ' ' + eval(yext_location.address.postalCode);
					location_address += '</a></address>';

					var location_phone = yext_location.mainPhone.replace(/\+1(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1)$2-$3");
					var location_phone_formated = yext_location.mainPhone;
					location_phone = '<a href="tel:' + location_phone_formated + '" class="phone">' + location_phone + '</a>';
					location_detail += '<div class="col-md-3 col-sm-12 address">' + location_address + '<p>' + location_phone 
						+ '</p><p><a href="javascript:void(0);" class="set-location" data-location="' + location_id + '">Set as my Location</a></p></div>';

					//var local_datetime = moment(moment().format('YYYY-MM-DD')+' '+moment( moment().utcOffset( yext_location.timeZoneUtcOffset ) ).hour()+':'+moment().minutes() );
					var local_datetime = moment().utcOffset( yext_location.timeZoneUtcOffset ).format('YYYY-MM-DD HH:mm')

					location_detail += '<div class="col-md-3 col-sm-12 store-hours" data-location-current-datetime="'+moment(local_datetime).format('YYYY-MM-DD H:mmA')+'""><p>';

					var dow = moment(local_datetime).format('dddd');
					var holiday_hours = null;
					if(yext_location.hours.holidayHours!=null && yext_location.hours.holidayHours!= undefined ) {
						holiday_hours = isHoliday(yext_location.hours.holidayHours, moment());
					}
					
					if( holiday_hours != null ) {
						
						location_detail += '<span class="open-status">'+holiday_hours+'</span> ';
						location_detail += '<p><a href="'+yext_location.c_pagesURL+'" title="View more store hours">More Hours</a><p> ';
						
					} else {
						
						if(yext_location.hours[ dow.toLowerCase() ]['openIntervals']) {

							var location_start_time = moment( moment(local_datetime).format('YYYY-MM-DD') + ' ' + yext_location.hours[ dow.toLowerCase() ]['openIntervals'][0].start);
							
							var location_end_time = moment(local_datetime).format('YYYY-MM-DD') + ' ' + yext_location.hours[ dow.toLowerCase() ]['openIntervals'][0].end;

							location_detail += moment(location_start_time).format('h:mm A')+ ' - ' + moment(location_end_time).format('h:mm A') ;
						} else {
							location_detail += '<span class="open-status">CLOSED</span> ';
						}		
					}			

					location_detail += '</p></div>';

					location_detail += '<div class="col-md-6 col-sm-12 options">';
					location_detail += '<a href="javascript:void(0);" data-target-url="/reservations/" class="btn btn-red set-location" data-location="'+location_id+'">Reservations</a>';
					location_detail += '<a href="javascript:void(0);" data-target-url="/menu/" class="btn btn-red set-location" data-location="'+location_id+'">View Menu</a>';

					var order_url = yext_location.c_orderButtonURL;
					if(order_url!=undefined){
						if(order_url.url!=undefined) {
							if(order_url.url.indexOf('?')!=-1) {
								order_url = order_url.url.substring(0, order_url.url.indexOf('?'));
							}
						} else {
							if(order_url.indexOf('?')!=-1) {
								order_url = order_url.substring(0, order_url.indexOf('?'));
							}
						}
						location_detail += '<a href="javascript:void(0);" data-target-url="'+order_url+'" class="btn btn-red set-location" target="_blank" data-location="'+location_id+'">Order Online</a>';
					}

					var catering_url = yext_location.c_pagesCateringURL;
					if(catering_url!=undefined){
						if(catering_url.url!=undefined){
							if(catering_url.url.indexOf('?')!=-1) {
								catering_url = catering_url.url.substring(0, catering_url.url.indexOf('?'));
							}	
						} else {
							if(catering_url.indexOf('?')!=-1) {
								catering_url = catering_url.substring(0, catering_url.indexOf('?'));
							}	
						}
						location_detail += '<a href="javascript:void(0);" data-target-url="'+catering_url+'" class="btn btn-red set-location" target="_blank" data-location="'+location_id+'">Order Catering</a>';
					}

					location_detail += '</div>'

					location_detail += '</div>';

					location_detail += '</div>';

					$('#store-locator-search-results-list').append(location_detail);

					var coords = getLocationCoordinates(yext_location);

					var location_data = {
						'id':location_id,
						'name':location_name,
						'address':yext_location.addres,
						'latitude':coords.latitude,
						'longitude':coords.longitude,
						'hours':yext_location.hours,
						'phone':location_phone,
						'phone_formatted':location_phone_formated,
						'order_url':order_url,
						'catering_url':catering_url,
						'pages_url':yext_location.c_pagesURL
					}

					store_location_search_results.push(location_data);	

				}


			});
			
			setStoreLocatorSearchResultsHeight();
			
			$('.set-location').bind('click', function(e) {

				e.preventDefault();

				var location_id = $(this).data('location');
				console.log('location_id:'+location_id);

				setLocationCookie($(this).data('location'),$(this).data('target-url'));

				// load buca_location_data
				for(i=0;i<store_location_search_results.length;i++) {

					if(store_location_search_results[i].id==$(this).data('location')) {

						buca_location_data = store_location_search_results[i];

						$('#store-locator-search').slideUp('fast', function(){								
							setStoreLocatorLink();
							$('#store-locator-search-form label').html('[Change]');
							$('#store-locator-search-results-list').html('');
							$('#store-locator-search-keywords').val('');
						});
						// force exit loop
						i == store_location_search_results.length;

					}
				}

				// if on a menu page, rget new location menu
				if(window.location.href.toLowerCase().indexOf('menu')) {
					if (typeof window.get_yext_location_menu !== "undefined") {						
						get_yext_location_menu($(this).data('location'));
					}
				}


			});

			$('#store-locator-search-form label').html('Results for \''+$('#store-locator-search-keywords').val()+'\'')
			$('#store-locator-search-results-list').fadeIn();


		} else {

			$('#store-locator-search-form label').html('No results for \''+$('#store-locator-search-keywords').val()+'\'')
			$('#store-locator-search-results-list').fadeIn();

		}

	})
		.success(function(data) { 
		//alert("second success"); 

	})
		.error(function() {
		//alert("error"); 
		return false;
	});

	return false;

}

function getLocationCookie() {		    
	var name = 'buca_location=';
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function setLocationCookie(location_id,redirect_url) {

	var yext_location_search_url = 'https://liveapi.yext.com/v2/accounts/1323877/entities/'+location_id;
	yext_location_search_url += '?api_key=3b1812e3409df5ad02c068e4ca43c36e&v='+moment().format('YYYYMMDD');

	$.getJSON(yext_location_search_url, function(result) {

		var buca_location = result.response;

		if(buca_location!=undefined) {

			var order_url = buca_location.c_orderButtonURL;
			var catering_url = buca_location.c_pagesCateringURL;

			// strip out UTM query string
			if(order_url.url!=undefined) {
				if(order_url.url.indexOf('?')!=-1) {
					order_url = order_url.url.substring(0, order_url.url.indexOf('?'));
				}				
			} else {
				if(order_url.indexOf('?')!=-1) {
					order_url = order_url.substring(0, order_url.indexOf('?'));
				}	
			}
			if(catering_url.url!=undefined) {
				if(catering_url.url.indexOf('?')!=-1) {
					catering_url = catering_url.url.substring(0, catering_url.url.indexOf('?'));
				}	
			} else {
				if(catering_url.indexOf('?')!=-1) {
					catering_url = catering_url.substring(0, catering_url.indexOf('?'));
				}				
			}

			var coords = getLocationCoordinates(buca_location)

			buca_location_data = {
				'id':location_id,
				'name':buca_location.c_geomodifier,
				'address':buca_location.address,
				'latitude':coords.latitude,
				'longitude':coords.longitude,
				'hours':buca_location.hours,
				'phone':buca_location.mainPhone.replace(/\+1(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1)$2-$3"),
				'phone_formatted':buca_location.mainPhone,
				'order_url':order_url,
				'catering_url':catering_url,
				'pages_url':buca_location.c_pagesURL
			};

			var expire = new Date((new Date()).getTime() + 24 * 3600000);			        
			var expires = expire.toGMTString();

			var domain = '';
			if(window.location.hostname.indexOf('bucadibeppo.com')!=-1){
				domain = " domain=.bucadibeppo.com";
			} else if (window.location.hostname.indexOf('wpengine.com')!=-1) {
				domain = " domain=.wpengine.com";
			} else {
				// somethign else maybe?
			}

			//document.cookie = "buca_location_cookie=" + escape(location_id) + expire + ";path=/;"+domain;
			//document.cookie = "buca_location=" + JSON.stringify(buca_location_data) + ";expires="+ expire + ";path=/;"+domain;
			setCookie("buca_location", JSON.stringify(buca_location_data), 30)

			if(redirect_url!='' && redirect_url!=undefined) {

				window.location = redirect_url;

			} else {

				setStoreLocationDetail(location_id);

				$('#header-overlay').fadeOut();
				$('#store-locator-search-results-list').html('');

			}

		}

	})
	.done(function() {
		console.log( "second success" );
	})
	.fail(function() {
		console.log( "error" );
	})
	.always(function() {
		console.log( "complete" );
	});

}


function setMobileNavigationLinks() {
	if($(window).width()<=340){
		$('#mobile-nav ul li a').each(function(){
			$(this).data('button-text',$(this).html())
			switch($(this).html().toLowerCase()){
				case 'order online':
					$(this).html('order');
					break;
				case 'reservations':
					$(this).html('reserve');
					break;
			}
		});
	} else {
		$('#mobile-nav ul li a').each(function(){
			if($(this).data('button-text')!=undefined) {
				$(this).html( $(this).data('button-text') );
			}
		});
	}
}

function setStoreLocationDetail(location_id){

	var buca_location = getLocationCookie();
	var location = JSON.parse(buca_location);

	$('.toggle-location-detail').html(location.name);//'Buca di Beppo '+

	$('#store-locator-detail.location-detail label.name').html(location.name);//'Buca di Beppo '+

	var google_maps_url = 'https://www.google.com/maps/place/';
	google_maps_url += encodeURI(location.address.line1 + ' ' + location.address.city + ', ' + location.address.region + ' ' + eval(location.address.postalCode));
	//google_maps_url += '/';
	//https://www.google.com/maps/place/250+Santa+Monica+Pier,+Santa+Monica,+CA+90401/@34.0099943,-118.4986972

	var location_address = '<a href="'+google_maps_url+'" target="_blank">';
	location_address += location.address.line1 + '</br>' + location.address.city + ', ' + location.address.region + ' ' + eval(location.address.postalCode);
	location_address += '</a>';

	$('#store-locator-detail.location-detail address').html(location_address);

	var location_phone = location.phone;
	var location_phone_formated = location.phone_formatted;

	$('#store-locator-detail.location-detail .phone').html('<a href="tel:' + location_phone_formated + '">' + location_phone + '</a>');

	var weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
	var store_hours = '';

	//var holiday_hours = isHoliday(location,moment());
	var holiday_hours = null;
	if(location.hours.holidayHours!=null && location.hours.holidayHours!= undefined ) {
		holiday_hours = isHoliday(location.hours.holidayHours, moment());
	}
	
	if( holiday_hours != null ) {

		store_hours += '<span class="open-status">'+holiday_hours+'</span> ';
		store_hours += '<p><a href="'+location.pages_url+'" title="View more hours">More Hours</a><p> ';

	} else {

		for(i=0; i<weekdays.length;i++) {
			if(location.hours[ weekdays[i].toLowerCase() ]) {
				if(location.hours[ weekdays[i].toLowerCase() ]['openIntervals']) {
					var weekday_name = weekdays[i].substring(0,3);
					var open_hours = location.hours[ weekdays[i].toLowerCase() ]['openIntervals'][0].start;
					var closed_hours = location.hours[ weekdays[i].toLowerCase() ]['openIntervals'][0].end;
					var weekday_hours = moment(moment().format('YYYY-MM-DD')+'T'+open_hours).format('LT');
					weekday_hours += ' - '+moment(moment().format('YYYY-MM-DD')+'T'+closed_hours).format('LT');
					store_hours += '<li><time><span class="dayofweek">'+weekday_name+'</span> ' + weekday_hours + '</time></li>';
				} else {
					if(location.hours[ weekdays[i].toLowerCase() ]['isClosed']) {
						store_hours += '<li><time><span class="dayofweek">CLOSED</time></li>';
					}
				}
			}
		}
		
	}

	if(store_hours!='') {
		store_hours = '<ul>'+store_hours+'</ul>';
		$('#store-locator-detail.location-detail .store-hours .open-status').html(store_hours);
	}		

	var order_url = location.order_url;
	if(order_url!=undefined){
		if(order_url.url!=undefined) {
			if(order_url.url.indexOf('?')!=-1) {
				order_url = order_url.url.substring(0, order_url.url.indexOf('?'));
			}
		} else {
			if(order_url.indexOf('?')!=-1) {
				order_url = order_url.substring(0, order_url.indexOf('?'));
			}			
		}

		$('#store-locator-detail.location-detail .options a[href*="order."]').attr('href',order_url);
	}

	var catering_url = location.catering_url;
	if(catering_url!=undefined){
		if(catering_url.url!=undefined){
			if(catering_url.url.indexOf('?')!=-1) {
				catering_url = catering_url.url.substring(0, catering_url.url.indexOf('?'));
			}
		} else {
			if(catering_url.indexOf('?')!=-1) {
				catering_url = catering_url.substring(0, catering_url.indexOf('?'));
			}			
		}
		$('#store-locator-detail.location-detail .options a[href*="catering."]').attr('href',catering_url);		
	}

}

function setStoreLocatorLink() {

	var buca_location = getLocationCookie();
	var location = JSON.parse(buca_location);

	var location_name = location.name;

	if(location_name.indexOf('-')!=-1) {
		location_name = location_name.replace(' - ','-');
		var split_location_name = location_name.split('-');
		location_name = split_location_name[0]+' - <span>'+split_location_name[1]+'</span>';
	}

	$('header #store-locator span.location .toggle-location-detail').html(location_name);
	$('header #store-locator span.location .toggle-location-detail').attr('data-store-code', buca_location_data.id);
	$('header #store-locator a.toggle').html('[Change]');
	$('header #store-locator span.location').show();

}

function getCustomFieldValue(fields, field_id) {      
	var field_value = '';
	$.each(yext_location.customFields, function(key,val) { 
		switch(key) {
			case '16114': field_value = val; break;
		}
	});
	return field_value;
}

function getLocationCoordinates(location_data) {

	var coords = {
		latitude : 0,
		longitude : 0
	};

	coords.latitude = 
		location_data.yextDisplayCoordinate.latitude ? location_data.yextDisplayCoordinate.latitude : 
	( location_data.displayCoordinate.latitude ? location_data.displayCoordinate.latitude : 
	 ( location_data.geo.coordinate.latitude ? location_data.geo.coordinate.latitude : 0)
	);

	coords.longitude = 
		location_data.yextDisplayCoordinate.longitude ? location_data.yextDisplayCoordinate.longitude : 
	( location_data.displayCoordinate.longitude ? location_data.displayCoordinate.longitude : 
	 ( location_data.geo.coordinate.longitude ? location_data.geo.coordinate.longitude : 0)
	);

	return coords;

}

function isHoliday(holidays, date) {

	for(i=0;i<holidays.length;i++) {
		if( holidays[i]['date'] == moment(date).format('YYYY-MM-DD') ) {	
			if( holidays[i]['openIntervals']!=undefined && holidays[i]['openIntervals'].length>0 ) {
				var location_start_time = moment( moment().format('YYYY-MM-DD')+' '+holidays[i]['openIntervals'][0].start ).format('h:mmA');
				var location_end_time = moment( moment().format('YYYY-MM-DD')+' '+holidays[i]['openIntervals'][0].end ).format('h:mmA');	
				var location_hours = location_start_time +' - '+ location_end_time;
			}
		}
	}
	return location_hours;
}

/* ============================================= */
/*		Common Functions - Move to own file
/* ============================================= */
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();

	var domain = '';
	if(window.location.hostname.indexOf('bucadibeppo.com')!=-1){
		domain = " domain=.bucadibeppo.com";
	} else if (window.location.hostname.indexOf('wpengine.com')!=-1) {
		domain = " domain=.wpengine.com";
	}
	
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;" + domain + ";";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}


function TouchEnabled() {
	if ("ontouchstart" in document.documentElement) {
		return true;
	} else {
		return false;
	}
}

function writeCookie(name, value, hours){ 
	var expire = ""; 
	if(hours != null) { 
		expire = new Date((new Date()).getTime() + hours * 3600000); 
		expire = "; expires=" + expire.toGMTString(); 
	} 
	document.cookie = name + "=" + escape(value) + expire + "; path=/"; 
}