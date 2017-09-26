(function ($) {

	new WOW().init();
	emailjs.init("user_Pe1oXx2KVkb6usMNRiPKT");
	
	//jQuery to collapse the navbar on scroll
	$(window).scroll(function() {
		if ($(".navbar").offset().top > 50) {
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
	});

	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$('.navbar-nav li a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
		$('.page-scroll a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});

	});

})(jQuery);

const ERRORS = {
    required: 'This field is required.',
    invalidEmail: 'This is not a valid email address.'
}


new Vue({
	el: "#app",
	data:  {
	   name: '',
	   email: '',
	   subject: '',
	   message: '',
	   emailFeedback: '',
	   sendMessage: false,
	   attemptSubmit: false
	},
	computed: {
		missingName() { return this.name === '' },
		missingSubject() { return this.subject === ''},
		wrongEmail() {
			if(this.email === '') {
                this.emailFeedback = ERRORS.required
                return true
            } else if(!this.isEmail(this.email)) {
                this.emailFeedback = ERRORS.invalidEmail
                return true
            }
            return false
		}
	},
	methods: {
        isEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email)
        },
        validateForm(event) {
			this.attemptSubmit = true;
			if (this.missingName || this.wrongEmail || this.missingSubject) {
				return;
			}else{
				let self = this;
				emailjs.send("gmail","template_L1S7jmpY",{
					"from_name":this.email,
					"name":this.name,
					"message_html":this.subject + "//" + this.message
				})
				.then(function(response) {
				   console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
				   self.sendMessage = true;			   
				   self.attemptSubmit = false;
				   self.name = '';
				   self.email = '';
				   self.subject = '';
				   self.message = '';
				}, function(err) {
				   console.log("FAILED. error=", err);
				});			
				
			}
			
		},
		clearSendMessage () {
			this.sendMessage = false;
		}
    }
});
