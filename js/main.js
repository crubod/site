"use strict";
/* ==============================================
jQuery
=============================================== */
$(document).ready(function () {
	
	// load tweets
	//$(".follow .load-tweets").load("php/twitter.php");
	
	$("[href='#']").click(function(e){
		e.preventDefault();
	});
	
	// show, hide navbar
	$(".tile").click(function(){
		$(".navbar").animate({bottom:0},"slow");
	}); 
	$(".home-link").click(function(){
		$(".navbar").animate({bottom:-50},"slow");
	}); 

	// navbar-callapse close on click
	$('.navbar li a').on('click',function(){
		if ( $('.navbar-collapse').hasClass("in") ) {
			$('.navbar-collapse').collapse('hide');
		}
	})
	
	$("#about-carousel").carousel({interval: 2000});
	
	// portfolio
	$("#grid").mixitup();
	
	// portfolio hover
	$("#grid li a ").each(function() { 
		$(this).hoverdir(); 
	});

	// center box
	function centerBox(){
		var wHeight = $(window).height() ;
		$(".section .center-box").each(function() {
			var paddingTop =  $(this).height() ;
			if ( paddingTop < wHeight ) {
				paddingTop = ( wHeight - paddingTop ) / 2;
				$(this).css("padding-top",paddingTop);
			} else {
				$(this).css("padding-top","0");
			}
		});
	};
	
	$(window).resize(function(){
		centerBox();
	}).resize();

	// contact form
	$('input, textarea').placeholder();
	
	$('#contactform').submit(function(){
	
		var action = $(this).attr('action');
		
		$("#state-message").slideUp(750,function() {
			$('#state-message').hide();
			
			// fire base 
			var formRef = new Firebase('https://crubod.firebaseio.com/contactform'),
			commentPushRef = formRef.push();
			//comments = $firebase(ref.child('comments'));
			commentPushRef.set({
				"name": $('#name').val(),
				"email": $('#email').val(),
				"message": $('#message').val()
			});
			
			document.getElementById('state-message').innerHTML = "Successfully Submitted";
			$('#state-message').slideDown('slow');
			$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
			$('#submit').removeAttr('disabled'); 
			$('#contactform').slideUp('slow');
		});
		return false; 
	});
});

/* ==============================================
Testimonials
=============================================== */

jQuery(function( $ ){
	
	var randomnumber, quoteclass, author, timeout;
	
	startTestimonials();
	
	$('.client .photos ul li').hover( function(){

		window.clearTimeout(timeout);
		
		$('.client .photos ul li.active').removeClass('active');
		
		quoteclass = $(this).attr('class');
		
		author = $(this).find('img').attr('alt');
		author = author.split('-');
		//author = author[0] + '<span> - ' + author[1] + '</span>';
		author = author[0];
		
		$('.client .quotes ul li.active').fadeOut('slow', function(){
			$(this).removeClass('active');
			$('.client .quotes ul li.' + quoteclass).fadeIn().addClass('active');
			$('.client .photos .author').html(author);
		});
		
		$(this).addClass('active');
		
	}, function(){
		timeout = window.setTimeout( startTestimonials, 5000 );
		return false;
	});
	
	function startTestimonials() {
		
		$('.client .photos ul li.active').removeClass('active');
		
		randomnumber = Math.floor( (Math.random()*2) + 1 );
		
		author = $('.client .photos ul li.quote-' + randomnumber).find('img').attr('alt');
		author = author.split('-');
		//author = author[0] + '<span> - ' + author[1] + '</span>';
		author = author[0];
		
		$('.client .quotes ul li.active').fadeOut('slow', function(){
			$(this).removeClass('active');
			$('.client .quotes ul li.quote-' + randomnumber).fadeIn().addClass('active');
			$('.client .photos .author').html(author);
		});
		
		$('.client .photos ul li.quote-' + randomnumber).addClass('active');
		
		timeout = window.setTimeout( startTestimonials, 5000 );
	}
	
});


/* ==============================================
Loading
=============================================== */
$(window).load(function(){
	jQuery('#loading').fadeOut(1000);
});

/* ==============================================
Firebase
=============================================== */

    function addComment() {
    	var dataRef = new Firebase("https://crubod.firebaseio.com");
       // dataRef.set("I am now writing data into Firebase!");



    }