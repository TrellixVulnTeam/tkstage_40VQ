/*====================================================
  TABLE OF CONTENT
  1. function declearetion
  2. Initialization
====================================================*/
(function($) {
    /*===========================
    1. function declearetion
    ===========================*/
	var themeApp = {
        fixedNavbar: function() {
            var body = $('body');
            var navbar = $(".site-navbar-wrap");
            var navOffset = navbar.offset();
            var fixedNav = $(".fixed-nav-wrap");
            $(window).scroll(function(){
                scroll= $(window).scrollTop();
                if(scroll > navOffset.top + 112) {
                    fixedNav.addClass("show");
                }else {
                    fixedNav.removeClass("show");
                }
            })
        },
        responsiveIframe: function() {
    		$('.single-post-wrap').fitVids();
    	},
        highlighter: function() {
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        },
        mobileMenu:function() {
            $('.menu-open').on('click', function(e){
                e.preventDefault();
                $('body').toggleClass('mobile-menu-opened');
            });
            $('#backdrop').on('click', function(){
                $('body').toggleClass('mobile-menu-opened');
            });
        },
        SearchProcess: function() {
            $('.search-open').on('click', function(){
                $('.search-popup').addClass('visible');
                $('#search-input').css('visibility', 'visible').focus();
            });
            $('.close-button').on('click', function(e) {
                e.preventDefault();
                $('.search-popup').removeClass('visible');
                $('#search-input').val("");
                $("#search-results").empty();
            });
            var searchinGhost = new SearchinGhost({
                key: apiKey,
                inputId: ['search-input'],
                outputId: ['search-results'],
                outputChildsType: false,
                limit: 50,
                postsFields: ['title', 'url', 'excerpt', 'custom_excerpt', 'published_at'],
                postsExtraFields: ['tags'],
                
                template: function(post) {
                    var o = '';
                    o += '<div class="result-item"><a href="' + post.url + '">';
                    o += '<div class="title">' + post.title + '</div>';
                    o += '<div class="date">' + post.published_at + '</div></a></div>';
                    return o;
                }
            });
        },
        gallery: function() {
            var images = document.querySelectorAll('.kg-gallery-image img');
            images.forEach(function (image) {
                var container = image.closest('.kg-gallery-image');
                var width = image.attributes.width.value;
                var height = image.attributes.height.value;
                var ratio = width / height;
                container.style.flex = ratio + ' 1 0%';
            });
            mediumZoom('.kg-gallery-image img', {
                margin: 30
            });
        },
        notification: function() {
            function getParameterByName(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, '\\$&');
                var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, ' '));
            }
        
            // Give the parameter a variable name
            var action = getParameterByName('action');
            var stripe = getParameterByName('stripe');
            var success = getParameterByName('success');
            
            if (action == 'subscribe') {
                document.body.classList.add('subscribe-success');
            }
            if (action == 'signup') {
                window.location = '/signup/?action=checkout';
            }
            if (action == 'checkout') {
                document.body.classList.add('signup-success');
            }
            if (action == 'signin' && success== 'true') {
                document.body.classList.add('signin-success');
            }
            if (action == 'signin' && success== 'false') {
                document.body.classList.add('signin-failure');
            }
            if (stripe == 'success') {
                document.body.classList.add('checkout-success');
            }
            if (stripe == 'cancel') {
                document.body.classList.add('checkout-cancel');
            }
            if(stripe == 'billing-update-success') {
                document.body.classList.add('billing-update-success');
            }
            if(stripe == 'billing-update-cancel') {
                document.body.classList.add('billing-update-cancel');
            }
        
            var notifications = document.querySelectorAll('.notification');
            notifications.forEach(function(item) {
                var closelink = item.querySelector('.notification-close');
                closelink.addEventListener('click', function(e) {
                    e.preventDefault();
                    item.classList.add('closed');
                    var uri = window.location.toString();
                    if (uri.indexOf("?") > 0) {
                        var clean_uri = uri.substring(0, uri.indexOf("?"));
                        window.history.replaceState({}, document.title, clean_uri);
                    }
                })
        
            });
        },
		init:function(){
            themeApp.fixedNavbar();
            themeApp.responsiveIframe();
    		themeApp.highlighter();
            themeApp.mobileMenu();
            themeApp.SearchProcess();
            themeApp.gallery();
            themeApp.notification();
    	}
	}
    /*===========================
    2. Initialization
    ===========================*/
    $(document).ready(function(){
    	themeApp.init();
    });
}(jQuery));
