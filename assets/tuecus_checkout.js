var shop = Shopify.shop;
//var	shopId = Shopify.shopId;
var	checkout_token = '';
//var baseurl = 'https://myaccounts.tuecus.com/';

var is_checkout_social_share_enabled = 0;
var redirect_page = '';
var sales_description = '';
var social_share_text = '';
var discount_code = '';

var is_social_share_enabled = 0;
var is_cart_social_share_enabled = 0;
var cart_share_greetings = '';
var cart_share_greetings_discount_message = '';
var cart_social_share_text = '';
var cart_discount_code = '';

var is_catalog_social_share_enabled = 0;
var catalog_share_greetings = '';
var catalog_share_greetings_discount_message = '';
var catalog_social_share_text = '';
var catalog_discount_code = '';





var sharewin;
/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));




function getParameterByName(name, url) {
	if (!url) {
	  url = window.location.href;
	}
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}  

// Once the DOM is ready...

function loadStyles(url) {
	var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');   
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.media = 'all';
    head.appendChild(link);
}


function openPopup(link, title, width, height) {
    const top = window.top.outerHeight / 2 + window.top.screenY - ( height / 2);
    const left = window.top.outerWidth / 2 + window.top.screenX - ( width / 2);
    sharewin = window.open(link, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+width+', height='+height+', top='+top+', left='+left);
	
	return sharewin;
}
/* 
function fbshare() {
	
	
	//alert("discount_code1"+discount_code);	
	//"Product Page","Home Page","Catalog Page"
	///var redirect_page = 'https://'+shop+'/collections/all';
	
	var redirect_link = redirect_page+'&cad_fb_clk=1';
	//alert('redirect_page'+redirect_page);
	
	if(Shopify.checkout && Shopify.checkout !== 'undefined' && Shopify.checkout.customer_id !== 'undefined') {
	
		redirect_link += '&cid='+Shopify.checkout.customer_id;
	}
	
	if(discount_code.length > 0) {
		redirect_link += '&discount_code='+discount_code;
	}
	//alert("redirect_page"+redirect_link); 
	
	var customer_discount_link  =  'https://'+shop+'/discount/'+discount_code+'?redirect='+redirect_link;
	var url = "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(customer_discount_link)+"&title=Get Descount&quote="+social_share_text;
	
	//alert('url'+url);
	openPopup(url,"Facebook Share",650, 650); 
		
	
	
	 var socialshareurl = 'https://'+shop+'/apps/tuecus/api/profile/socialshare/'+shopId;
	 var data = {'shop':shop,'discount_code':discount_code,'click_source':'facebook','type':1};
	 
	 if(Shopify.checkout && Shopify.checkout !== 'undefined') {
	
		data.customer_id = Shopify.checkout.customer_id;
	 }
	 
	 
	 const fbsharexhr = new XMLHttpRequest();
	 fbsharexhr.open('POST', socialshareurl, true);
	 fbsharexhr.onreadystatechange = () => {
		if (fbsharexhr.readyState > 3) { 
		 
			//var resdata = fbsharexhr.responseText;
			//console.log(resdata);
			//deleteCookie('tref');
		  //success(fbsharexhr);
		  
		}
	 };
	 fbsharexhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	 fbsharexhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	 fbsharexhr.send(JSON.stringify(data));
		 
	
	return true;
}	 */



function fbshare() {
	
	
	//alert("discount_code1"+discount_code);	
	//"Product Page","Home Page","Catalog Page"
	///var redirect_page = 'https://'+shop+'/collections/all';
	//alert('redirect_page'+redirect_page);
	var redirect_link = redirect_page+'?cad_fb_clk=1';
	//alert('redirect_page'+redirect_page);
	
	if(Shopify.checkout && Shopify.checkout !== 'undefined' && Shopify.checkout.customer_id !== 'undefined') {
	
		redirect_link += '&cid='+Shopify.checkout.customer_id;
	}
	
	if(discount_code.length > 0) {
		redirect_link += '&discount_code='+discount_code;
	}
	//alert("redirect_page"+redirect_link); 
	
	//var customer_discount_link  =  'https://'+shop+'/discount/'+discount_code+'?redirect='+redirect_link;
	var customer_discount_link  =  'https://'+shop+redirect_link;
	
	var url = "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(customer_discount_link)+"&title=Get Descount&quote="+social_share_text;
	
	//alert('url'+url);
	openPopup(url,"Facebook Share",650, 650); 
		
	
	
	 var socialshareurl = 'https://'+shop+'/apps/tuecus/api/profile/socialshare/'+shopId;
	 var data = {'shop':shop,'discount_code':discount_code,'click_source':'facebook','type':1};
	 
	 if(Shopify.checkout && Shopify.checkout !== 'undefined') {
	
		data.customer_id = Shopify.checkout.customer_id;
	 }
	 
	 
	 const fbsharexhr = new XMLHttpRequest();
	 fbsharexhr.open('POST', socialshareurl, true);
	 fbsharexhr.onreadystatechange = () => {
		if (fbsharexhr.readyState > 3) { 
		 
			//var resdata = fbsharexhr.responseText;
			//console.log(resdata);
			//deleteCookie('tref');
		  //success(fbsharexhr);
		  
		}
	 };
	 fbsharexhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	 fbsharexhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	 fbsharexhr.send(JSON.stringify(data));
	
	
	
	var loop = setInterval(function() {   
		if(sharewin.closed) {  
			clearInterval(loop);  
			 if(document.getElementById("tuecus-catalog-share-success-modal")) {
				 document.getElementById("tuecus-catalog-share-modal").style.display="none";	
				document.getElementById("tuecus-catalog-share-success-modal").style.display="block";	
				document.getElementById("tuecus-catalog-share-discount-code").innerHTML = discount_code;
			 } else if(document.getElementById("tuecus-cart-share-success-modal")) {
				  document.getElementById("tuecus-cart-share-modal").style.display="none";	
				document.getElementById("tuecus-cart-share-success-modal").style.display="block";	
				document.getElementById("tuecus-cart-share-discount-code").innerHTML = discount_code;
			 }
		}  
	}, 1000); 

	return true;
}	

function whatsappshare() {
	
	var redirect_link = redirect_page+'&cad_whatsapp_clk=1';;
	if(Shopify.checkout && Shopify.checkout !== 'undefined' && Shopify.checkout.customer_id !== 'undefined') {
	
		redirect_link += '&cid='+Shopify.checkout.customer_id;
	}
	if(discount_code.length > 0) {
		redirect_link += '&discount_code='+discount_code;
	}
	//alert("redirect_page"+redirect_link); 
	
	var customer_discount_link  =  'https://'+shop+'/discount/'+discount_code+'?redirect='+redirect_link;
	
	var message = social_share_text + ' ' +customer_discount_link;
	var url = "https://api.whatsapp.com/send?text="+encodeURIComponent(message);
	openPopup(url,"Whatsapp Share",650, 650); 	
	/* var url="/apps/trafficbooster/tfbclick";
	$.ajax({
		  type: "POST",
		  url: url,
		  data: {'shop':shop,'discount_code':discount_code,'click_source':'whatsapp','type':1},
		  success: function(response){
			  			  
		  }
	});	 */
	
	 var socialshareurl = 'https://'+shop+'/apps/tuecus/api/profile/socialshare/'+ shopId;
	 var data = {'shop':shop,'discount_code':discount_code,'click_source':'whatsapp','type':1};
	 
	 if(Shopify.checkout && Shopify.checkout !== 'undefined') {
	
		data.customer_id = Shopify.checkout.customer_id;
	 }
	 
	 
	 const fbsharexhr = new XMLHttpRequest();
	 fbsharexhr.open('POST', socialshareurl, true);
	 fbsharexhr.onreadystatechange = () => {
		if (fbsharexhr.readyState > 3) { 
		 
			//var resdata = fbsharexhr.responseText;
			//console.log(resdata);
			//deleteCookie('tref');
		  //success(fbsharexhr);
		  
		}
	 };
	 fbsharexhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	 fbsharexhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	 fbsharexhr.send(JSON.stringify(data));
	 
	 
	var loop = setInterval(function() {   
		if(sharewin.closed) {  
			clearInterval(loop);  
			 if(document.getElementById("tuecus-catalog-share-success-modal")) {
				 document.getElementById("tuecus-catalog-share-modal").style.display="none";	
				document.getElementById("tuecus-catalog-share-success-modal").style.display="block";	
				document.getElementById("tuecus-catalog-share-discount-code").innerHTML = discount_code;
			 } else if(document.getElementById("tuecus-cart-share-success-modal")) {
				  document.getElementById("tuecus-cart-share-modal").style.display="none";	
				document.getElementById("tuecus-cart-share-success-modal").style.display="block";	
				document.getElementById("tuecus-cart-share-discount-code").innerHTML = discount_code;
			 }
		}  
	}, 1000);  
	
	return true;
}

/*
https://www.facebook.com/dialog/send?app_id=146362340689552&link=https://tuecus.myshopify.com&redirect_uri=https://myaccounts.tuecus.com/social-login/auth/facebook?shop=tuecus.myshopify.com
*/


//<a href="https://twitter.com/intent/tweet?url=myUrl&text=myTitle" target="_blank"><img src="path_to_my_image"/></a>
function twittershare() {
	
	
	var redirect_link = redirect_page+'&cad_twitter_clk=1';;
	if(Shopify.checkout && Shopify.checkout !== 'undefined' && Shopify.checkout.customer_id !== 'undefined') {
	
		redirect_link += '&cid='+Shopify.checkout.customer_id;
	}
	if(discount_code.length > 0) {
		redirect_link += '&discount_code='+discount_code;
	}
//alert("redirect_page"+redirect_link); 
	
	var customer_discount_link  =  'https://'+shop+'/discount/'+discount_code+'?redirect='+redirect_link;
	
	//var trafficbooster_discount_link  =  'https://'+shop+'/discount/'+discount_code+'?redirect=/wtaget=tfb';
	var url = "https://twitter.com/intent/tweet?url="+encodeURIComponent(customer_discount_link)+"&title=Get Descount&text="+encodeURIComponent(social_share_text);
	openPopup(url,"Twitter Tweet",650, 650); 
	
	
	/* var url="/apps/trafficbooster/tfbclick";
	$.ajax({
		  type: "POST",
		  url: url,
		  data: {'shop':shop,'discount_code':discount_code,'click_source':'twitter','type':1},
		  success: function(response){
			  
			  
		  }
	}); */
	
	
	 var socialshareurl = 'https://'+shop+'/apps/tuecus/api/profile/socialshare/'+shopId;
	 var data = {'shop':shop,'discount_code':discount_code,'click_source':'twitter','type':1};
	
	 if(Shopify.checkout && Shopify.checkout !== 'undefined') {
	
		data.customer_id = Shopify.checkout.customer_id;
	 }
	 
	 const fbsharexhr = new XMLHttpRequest();
	 fbsharexhr.open('POST', socialshareurl, true);
	 fbsharexhr.onreadystatechange = () => {
		if (fbsharexhr.readyState > 3) { 
		 
			//var resdata = fbsharexhr.responseText;
			//console.log(resdata);
			//deleteCookie('tref');
		  //success(fbsharexhr);
		  
		}
	 };
	 fbsharexhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	 fbsharexhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	 fbsharexhr.send(JSON.stringify(data));
	 
	 
	var loop = setInterval(function() {   
		if(sharewin.closed) {  
			clearInterval(loop);  
			 if(document.getElementById("tuecus-catalog-share-success-modal")) {
				 document.getElementById("tuecus-catalog-share-modal").style.display="none";	
				document.getElementById("tuecus-catalog-share-success-modal").style.display="block";	
				document.getElementById("tuecus-catalog-share-discount-code").innerHTML = discount_code;
			 } else if(document.getElementById("tuecus-cart-share-success-modal")) {
				  document.getElementById("tuecus-cart-share-modal").style.display="none";	
				document.getElementById("tuecus-cart-share-success-modal").style.display="block";	
				document.getElementById("tuecus-cart-share-discount-code").innerHTML = discount_code;
			 }
		}  
	}, 1000); 
	
	 return true;
}	


(function(funcName, baseObj) {
    // The public function name defaults to window.docReady
    // but you can pass in your own object and own function name and those will be used
    // if you want to put them in a different namespace
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
	// https://stackoverflow.com/questions/9899372/pure-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-when-t
    baseObj[funcName] = function(callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);

docReady(function() {
	//alert("hello");
	if(Shopify && Shopify.Checkout && Shopify.Checkout.token) {
		checkout_token	= Shopify.Checkout.token;
	}
	if(location.href.indexOf('/checkouts/'+checkout_token+'/'+'thank_you') != -1  || location.href.indexOf(shopId+'/orders/')  != -1) {
		 loadStyles("https://myaccounts.tuecus.com/tuecus/css/socialshare.css");
		 loadStyles("http://myaccounts.tuecus.com/tuecus/assets/css/tuecus_carousel.css");



		 var socialsettingsurl = 'https://'+shop+'/apps/tuecus/api/profile/socialsettings/'+shopId;
		 var data = {'shop_id':shopId,'shop':shop};
		 const socialsettingsxhr = new XMLHttpRequest();					 
		 socialsettingsxhr.open('POST', socialsettingsurl, true);
		 socialsettingsxhr.onreadystatechange = () => {
			
			if (socialsettingsxhr.readyState == 4) { 
				console.log(socialsettingsxhr.status);
				var responseText = socialsettingsxhr.responseText;
				console.log(responseText);
				var response  = JSON.parse(responseText);
				//append share bttons
					
					
					
					
					if(response.socialshare_settings.hasOwnProperty('is_social_share_enabled')) {
						is_social_share_enabled = response.socialshare_settings.is_social_share_enabled;
					}
					
					if(response.socialshare_settings.hasOwnProperty('is_checkout_social_share_enabled')) {
						is_checkout_social_share_enabled = response.socialshare_settings.is_checkout_social_share_enabled;
					}
					
					if(response.socialshare_settings.hasOwnProperty('social_share_text')) {
						social_share_text = response.socialshare_settings.social_share_text;
					}

					if(response.socialshare_settings.hasOwnProperty('sales_description')) {
						sales_description = response.socialshare_settings.sales_description;
					}

					if(response.socialshare_settings.hasOwnProperty('discount_code')) {
						discount_code = response.socialshare_settings.discount_code;
					}
					if((is_social_share_enabled == 1 || is_social_share_enabled == '1') && (is_checkout_social_share_enabled == 1 ||   is_checkout_social_share_enabled == '1')) {
							
							if(document.querySelectorAll('div[data-step="thank_you"]').length > 0) {
							
								
								var content_box =	document.getElementsByClassName('content-box')[0];	
								var section__content =	document.getElementsByClassName('section__content')[0];	
								var socialdivelement = document.createElement('div');
								socialdivelement.innerHTML = '<div id="tuecus_checkout_social_share_section" style="border: solid 1px #cccccc;padding:13px 10px;background:#ffffff;border-radius:5px;"><p class="os-step__description" style="margin:0 0 15px 0;">'+response.socialshare_settings.sales_description+'</p><div class="tuecus-social-icons"><button type="button" class="tuecus-fb-icon" onclick="fbshare();"><svg width="20" height="20" fill="#fff" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/></svg>Facebook</button><button type="button" class="tuecus-twitter-icon" onclick="twittershare();"><svg width="20" height="20" fill="#fff" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg>Twitter</button><button type="button" class="tuecus-whatsapp-icon" onclick="whatsappshare();><svg width="20" height="20" fill="#fff" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>Whatsapp</button></div></div>';
								
								content_box.parentNode.insertBefore(socialdivelement,content_box);

								

								var cad_products = [];
								if(document.querySelectorAll("tr.product") && document.querySelectorAll("tr.product").length > 0) {
									
									var trelements = document.querySelectorAll("tr.product");
									
									for(var i=0;i<trelements.length;i++) {
										var cad_product = {};
										cad_product.product_id = trelements[i].getAttribute('data-product-id');
										cad_product.col_image_small = trelements[i].querySelectorAll('.product-thumbnail__image')[0].getAttribute('src');
										//console.log('col_image_small'+cad_product.col_image_small);
										cad_product.col_image = cad_product.col_image_small.replace("_small", "");
										cad_products.push(cad_product);
										//console.log( index + ": " + $( this ).text() );
									}

										
								}
								
								if(cad_products.length > 1 ) {

									var sectionelement = document.createElement('section');
									sectionelement.className='tb_section';

									var corousel_data = '';
									corousel_data = '<div class="tb_container"><div class="tb_carousel">';
									
									for(var i=0;i<cad_products.length;i++) {
										corousel_data += '<input type="radio" name="slides" checked="checked" id="slide-'+i+'">';
									}
									console.log(cad_products);
									corousel_data += '<ul class="tb_carousel__slides">';
									for(var i=0;i<cad_products.length;i++) {
										corousel_data += '<li class="carousel__slide"><figure><div><img src="https://'+cad_products[i].col_image+'" alt=""></div></figure></li>';
									}
									corousel_data += '</ul>';
									corousel_data += '<ul class="tb_carousel__thumbnails">';
									
									for(var i=0;i<cad_products.length;i++) {
										corousel_data += '<li class="tb_carousel__thumbnail_side" data-product-id="'+cad_products[i].product_id+'"><label for="slide-'+i+'"><img src="https://'+cad_products[i].col_image_small+'" alt=""></label></li>';
									}
									corousel_data += '</ul></div></div>';
									sectionelement.innerHTML = corousel_data;
									//$(corousel_data).insertBefore($(".content-box").first());
									content_box.parentNode.insertBefore(sectionelement,content_box);

									var tb_carousel__thumbnail_sides = document.getElementsByClassName('tb_carousel__thumbnail_side');
									
									for(var i=0;i<tb_carousel__thumbnail_sides.length; i++) {
										var tb_carousel__thumbnail_side = tb_carousel__thumbnail_sides[i];
										tb_carousel__thumbnail_side.addEventListener('click', function(e) {
											//e.preventDefault();	
											var product_id = this.getAttribute('data-product-id');

											  var producthandleurl = 'https://'+shop+'/apps/tuecus/api/profile/'+product_id+'/producthandle';
											 var data = {'product_id':product_id,'shop':shop};
											 const producthandlexhr = new XMLHttpRequest();					 
											 producthandlexhr.open('POST', producthandleurl, true);
											 producthandlexhr.onreadystatechange = () => {
												
												if (producthandlexhr.readyState == 4) { 
													console.log(producthandlexhr.status);
													var responseText = producthandlexhr.responseText;
													var response  = JSON.parse(responseText);
													 var handle = response.handle;
													 redirect_page = '/products/'+handle;
													 //+'&trbooster_whatsapp_clk=y';
												}
											 };
											 producthandlexhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
											 producthandlexhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
											 producthandlexhr.send(JSON.stringify(data));


											
										});
									}

								
							}
								


								
							}
							
					}	
			}
		 };
		 socialsettingsxhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		 socialsettingsxhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		 socialsettingsxhr.send(JSON.stringify(data));
		 
		 
		
		
		 var product_id = document.getElementsByClassName("product")[0].getAttribute('data-product-id');
		 //alert('product_id'+product_id);
		 //toLowerCase
		 //product_id = 'pillow-case';
		 var product_handle = document.getElementsByClassName("product__description__name")[0].innerHTML; 
		 product_handle = product_handle.toLowerCase().replace(' ','-');
		 var url='/products/' + product_handle + '.js';
		 const xhr = new XMLHttpRequest();
		 xhr.open('GET', url, true);
		 xhr.onreadystatechange = () => {
			
			if (xhr.readyState == 4) { 
				console.log(xhr.status);
				 if (xhr.status === 200) {
					 
					var resdata = xhr.responseText;
					console.log(resdata);

					 redirect_page = '/products/'+product_handle;
					 
				 } else if(xhr.status === 404) {
					//alert('not found');
					 
					 var producthandleurl = 'https://'+shop+'/apps/tuecus/api/profile/'+product_id+'/producthandle';
					 var data = {'product_id':product_id,'shop':shop};
					 const producthandlexhr = new XMLHttpRequest();					 
					 producthandlexhr.open('POST', producthandleurl, true);
					 producthandlexhr.onreadystatechange = () => {
						
						if (producthandlexhr.readyState == 4) { 
							console.log(producthandlexhr.status);
							var responseText = producthandlexhr.responseText;
							var response  = JSON.parse(responseText);
							 var handle = response.handle;
							 redirect_page = '/products/'+handle;
							 //+'&trbooster_whatsapp_clk=y';
						}
					 };
					 producthandlexhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
					 producthandlexhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
					 producthandlexhr.send(JSON.stringify(data));
		 
		 
					
					
				 }
			}
		 };
		 xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		 xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		 xhr.send();			 
		
		var social_share_by = Cookies.get('social_share_by');
        if (social_share_by !== null && typeof social_share_by !== 'undefined') {


			if(Shopify.checkout && Shopify.checkout !== 'undefined' && Shopify.checkout.order_id !== 'undefined') {

					var order_id = Shopify.checkout.order_id;
					var socialshareorderurl = 'https://'+shop+'/apps/tuecus/api/profile/socialshareorder/'+shopId;
					var data = {'shop':shop,'order_id':order_id,'social_share_by':social_share_by};
					
					var tref_by = Cookies.get('tref_by');
					if (tref_by !== null && typeof tref_by !== 'undefined') {
						data.tref_by = tref_by;
					}

			 
					 const newxhr = new XMLHttpRequest();
					 newxhr.open('POST', socialshareorderurl, true);
					 newxhr.onreadystatechange = () => {
						if (newxhr.readyState > 3) { 
						 
						  
						}
					 };
					 newxhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
					 newxhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
					 newxhr.send(JSON.stringify(data));
					
					
			}
	
		}

		var tref_by = Cookies.get('tref_by');
        if (tref_by !== null && typeof tref_by !== 'undefined') {


			if(Shopify.checkout && Shopify.checkout !== 'undefined' && Shopify.checkout.order_id !== 'undefined') {

					var order_id = Shopify.checkout.order_id;
					var socialshareorderurl = 'https://'+shop+'/apps/tuecus/api/profile/referfriendorder/'+shopId;
					var data = {'shop':shop,'order_id':order_id,'tref_by':tref_by};
				
			 
					 const newxhr = new XMLHttpRequest();
					 newxhr.open('POST', socialshareorderurl, true);
					 newxhr.onreadystatechange = () => {
						if (newxhr.readyState > 3) { 
						 
						  
						}
					 };
					 newxhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
					 newxhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
					 newxhr.send(JSON.stringify(data));
					
					
			}
		}
		

		
				 
	} else if(location.href.indexOf('/cart') != -1) {
			
		console.log('cart page');	
		var socialsettingsurl = 'https://myaccounts.tuecus.com/customer/api/profile/socialsettings/'+shopId+'?shop='+shop;
		 
		 
		var s = document.createElement("script");
		var callback = "socialsettingscallback";
		var url = 'https://myaccounts.tuecus.com/customer/api/profile/socialsettings/'+shopId+'?shop='+shop+'&callback='+callback;
		window[callback] = function (response) {
			// it worked!
			//console.log(response);
			if(response.status == 'success') {

		
				
				if(response.socialshare_settings.hasOwnProperty('is_social_share_enabled')) {
					is_social_share_enabled = response.socialshare_settings.is_social_share_enabled;
				}
				if(response.socialshare_settings.hasOwnProperty('is_cart_social_share_enabled')) {
					is_cart_social_share_enabled = response.socialshare_settings.is_cart_social_share_enabled;
				}
							
				if(response.socialshare_settings.hasOwnProperty('cart_share_greetings')) {
					cart_share_greetings = response.socialshare_settings.cart_share_greetings;
				}

				if(response.socialshare_settings.hasOwnProperty('cart_share_greetings_discount_message')) {
					cart_share_greetings_discount_message = response.socialshare_settings.cart_share_greetings_discount_message;
				}

				if(response.socialshare_settings.hasOwnProperty('catalog_social_share_text')) {
					catalog_social_share_text = response.socialshare_settings.catalog_social_share_text;
				}


				if(response.socialshare_settings.hasOwnProperty('catalog_discount_code')) {
					catalog_discount_code = response.socialshare_settings.catalog_discount_code;
					discount_code  = response.socialshare_settings.catalog_discount_code;
				}

				if((is_social_share_enabled == 1 || is_social_share_enabled == '1') && (is_cart_social_share_enabled == 1 ||   is_cart_social_share_enabled == '1')) {
						document.getElementById("tuecus-cart-share-modal").style.display="block";
						
						document.getElementById("cart_share_greetings").innerHTML=cart_share_greetings;
						document.getElementById("cart_share_greetings_discount_message").innerHTML=cart_share_greetings_discount_message;
						
						redirect_page = tuecus_product_handle;	
						/*if(redirect_page.indexOf('?') != -1) {
							redirect_page = redirect_page.split('?')[0];
						}*/
						//alert('redirect_page'+redirect_page);
						var tb_carousel__thumbnail_sides = document.getElementsByClassName('tb_carousel__thumbnail_side');
						
						for(var i=0;i<tb_carousel__thumbnail_sides.length; i++) {
							var tb_carousel__thumbnail_side = tb_carousel__thumbnail_sides[i];
							tb_carousel__thumbnail_side.addEventListener('click', function(e) {
								//e.preventDefault();	
								var product_id = this.getAttribute('data-product-id');

								  var producthandleurl = 'https://'+shop+'/apps/tuecus/api/profile/'+product_id+'/producthandle';
								 var data = {'product_id':product_id,'shop':shop};
								 const producthandlexhr = new XMLHttpRequest();					 
								 producthandlexhr.open('POST', producthandleurl, true);
								 producthandlexhr.onreadystatechange = () => {
									
									if (producthandlexhr.readyState == 4) { 
										console.log(producthandlexhr.status);
										var responseText = producthandlexhr.responseText;
										var response  = JSON.parse(responseText);
										 var handle = response.handle;
										 redirect_page = '/products/'+handle;
										 //+'&trbooster_whatsapp_clk=y';
									}
								 };
								 producthandlexhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
								 producthandlexhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
								 producthandlexhr.send(JSON.stringify(data));


								
							});
						}
				
				
		
			
					
					var closeelements = document.getElementsByClassName('tuecus-close');
					for(var i=0;i<closeelements.length; i++) {
						closeelement = closeelements[i];
						closeelement.addEventListener('click', function(e) {
							e.preventDefault();	
							var modelId = this.getAttribute('data-target');
							modelId = modelId.split('#')[1];
							document.getElementById(modelId).style.display ='none';
							
						});
					}
					
				}

					
			}
			
			
		};
		s.src = url;
		document.body.appendChild(s);
		
		/* 	//alert('cart page'+shopId+' and shop'+shop);
		 var socialsettingsurl = 'https://'+shop+'/apps/tuecus/api/profile/socialsettings/'+shopId;
		 
		 var socialsettingsurl = 'https://myaccounts.tuecus.com/customer/api/profile/socialsettings/'+shopId+'?shop='+shop;
		  
		 var data = {'shop_id':shopId,'shop':shop};
		 const socialsettingsxhr = new XMLHttpRequest();					 
		 socialsettingsxhr.open('GET', socialsettingsurl, true);
		 socialsettingsxhr.onreadystatechange = () => {
			
			if (socialsettingsxhr.readyState == 4) { 
				console.log(socialsettingsxhr.status);
				var responseText = socialsettingsxhr.responseText;
				console.log(responseText);
				var response  = JSON.parse(responseText);
				//append share bttons



					if(response.status == 'success') {


							if(response.socialshare_settings.hasOwnProperty('is_cart_social_share_enabled')) {
								is_cart_social_share_enabled = response.socialshare_settings.is_cart_social_share_enabled;
							}

							if(response.socialshare_settings.hasOwnProperty('cart_share_greetings')) {
								cart_share_greetings = response.socialshare_settings.cart_share_greetings;
							}

							if(response.socialshare_settings.hasOwnProperty('cart_share_greetings_discount_message')) {
								cart_share_greetings_discount_message = response.socialshare_settings.cart_share_greetings_discount_message;
							}

							if(response.socialshare_settings.hasOwnProperty('cart_social_share_text')) {
								cart_social_share_text = response.socialshare_settings.cart_social_share_text;
							}


							if(response.socialshare_settings.hasOwnProperty('cart_discount_code')) {
								cart_discount_code = response.socialshare_settings.cart_discount_code;
								discount_code  = response.socialshare_settings.cart_discount_code;
							}

							if(is_cart_social_share_enabled == 1 ||   is_cart_social_share_enabled == '1') {

								
								document.getElementById("tuecus-catalog-share-modal").style.display="block";
								document.getElementById("cart_share_greetings").innerHTML=cart_share_greetings;
								document.getElementById("cart_share_greetings_discount_message").innerHTML=cart_share_greetings_discount_message;
							
								
								var tb_carousel__thumbnail_sides = document.getElementsByClassName('tb_carousel__thumbnail_side');
								
								for(var i=0;i<tb_carousel__thumbnail_sides.length; i++) {
									var tb_carousel__thumbnail_side = tb_carousel__thumbnail_sides[i];
									tb_carousel__thumbnail_side.addEventListener('click', function(e) {
										//e.preventDefault();	
										var product_id = this.getAttribute('data-product-id');

										  var producthandleurl = 'https://'+shop+'/apps/tuecus/api/profile/'+product_id+'/producthandle';
										 var data = {'product_id':product_id,'shop':shop};
										 const producthandlexhr = new XMLHttpRequest();					 
										 producthandlexhr.open('POST', producthandleurl, true);
										 producthandlexhr.onreadystatechange = () => {
											
											if (producthandlexhr.readyState == 4) { 
												console.log(producthandlexhr.status);
												var responseText = producthandlexhr.responseText;
												var response  = JSON.parse(responseText);
												 var handle = response.handle;
												 redirect_page = '/products/'+handle;
												 //+'&trbooster_whatsapp_clk=y';
											}
										 };
										 producthandlexhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
										 producthandlexhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
										 producthandlexhr.send(JSON.stringify(data));


										
									});
								}
								
								
							
								
								var closeelements = document.getElementsByClassName('tuecus-close');
								for(var i=0;i<closeelements.length; i++) {
									closeelement = closeelements[i];
									closeelement.addEventListener('click', function(e) {
										e.preventDefault();	
										var modelId = this.getAttribute('data-target');
										modelId = modelId.split('#')[1];
										document.getElementById(modelId).style.display ='none';
										
									});
								}
								
							}
					
					}

			}

		};

		 socialsettingsxhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		 socialsettingsxhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		// socialsettingsxhr.send(JSON.stringify(data));
		 socialsettingsxhr.send(); */


	}  else if(location.href.indexOf('/products/')  != -1) {

			//alert('cart page'+shopId+' and shop'+shop);
		//var socialsettingsurl = 'https://'+shop+'/apps/tuecus/api/profile/socialsettings/'+shopId+'?shop='+shop;
		
		 var socialsettingsurl = 'https://myaccounts.tuecus.com/customer/api/profile/socialsettings/'+shopId+'?shop='+shop;
		 
		 
		var s = document.createElement("script");
		var callback = "socialsettingscallback";
		var url = 'https://myaccounts.tuecus.com/customer/api/profile/socialsettings/'+shopId+'?shop='+shop+'&callback='+callback;
		window[callback] = function (response) {
			// it worked!
			console.log(response);
			if(response.status == 'success') {

				
				if(response.socialshare_settings.hasOwnProperty('is_social_share_enabled')) {
					is_social_share_enabled = response.socialshare_settings.is_social_share_enabled;
				}
				
				if(response.socialshare_settings.hasOwnProperty('is_catalog_social_share_enabled')) {
					is_catalog_social_share_enabled = response.socialshare_settings.is_catalog_social_share_enabled;
				}

				if(response.socialshare_settings.hasOwnProperty('catalog_share_greetings')) {
					catalog_share_greetings = response.socialshare_settings.catalog_share_greetings;
				}

				if(response.socialshare_settings.hasOwnProperty('catalog_share_greetings_discount_message')) {
					catalog_share_greetings_discount_message = response.socialshare_settings.catalog_share_greetings_discount_message;
				}

				if(response.socialshare_settings.hasOwnProperty('catalog_social_share_text')) {
					catalog_social_share_text = response.socialshare_settings.catalog_social_share_text;
				}


				if(response.socialshare_settings.hasOwnProperty('catalog_discount_code')) {
					catalog_discount_code = response.socialshare_settings.catalog_discount_code;
					discount_code  = response.socialshare_settings.catalog_discount_code;
				}
				
				if((is_social_share_enabled == 1 || is_social_share_enabled == '1') && (is_catalog_social_share_enabled == 1 ||   is_catalog_social_share_enabled == '1')) {
						document.getElementById("tuecus-catalog-share-modal").style.display="block";
						document.getElementById("catalog_share_greetings").innerHTML=catalog_share_greetings;
						document.getElementById("catalog_share_greetings_discount_message").innerHTML=catalog_share_greetings_discount_message;
						
						if(typeof tuecus_product_handle == 'undefined') {
							
						} else {
							redirect_page = '/products/'+tuecus_product_handle;	
						}
						/*if(redirect_page.indexOf('?') != -1) {
							redirect_page = redirect_page.split('?')[0];
						}*/
						
						//alert('redirect_page'+redirect_page);
						var tb_carousel__thumbnail_sides = document.getElementsByClassName('tb_carousel__thumbnail_side');
						
						for(var i=0;i<tb_carousel__thumbnail_sides.length; i++) {
							var tb_carousel__thumbnail_side = tb_carousel__thumbnail_sides[i];
							tb_carousel__thumbnail_side.addEventListener('click', function(e) {
								//e.preventDefault();	
								var product_id = this.getAttribute('data-product-id');

								  var producthandleurl = 'https://'+shop+'/apps/tuecus/api/profile/'+product_id+'/producthandle';
								 var data = {'product_id':product_id,'shop':shop};
								 const producthandlexhr = new XMLHttpRequest();					 
								 producthandlexhr.open('POST', producthandleurl, true);
								 producthandlexhr.onreadystatechange = () => {
									
									if (producthandlexhr.readyState == 4) { 
										console.log(producthandlexhr.status);
										var responseText = producthandlexhr.responseText;
										var response  = JSON.parse(responseText);
										 var handle = response.handle;
										 redirect_page = '/products/'+handle;
										 //+'&trbooster_whatsapp_clk=y';
									}
								 };
								 producthandlexhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
								 producthandlexhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
								 producthandlexhr.send(JSON.stringify(data));


								
							});
						}
				
				
		
			
					
					var closeelements = document.getElementsByClassName('tuecus-close');
					for(var i=0;i<closeelements.length; i++) {
						closeelement = closeelements[i];
						closeelement.addEventListener('click', function(e) {
							e.preventDefault();	
							var modelId = this.getAttribute('data-target');
							modelId = modelId.split('#')[1];
							document.getElementById(modelId).style.display ='none';
							
						});
					}
					
				}

					
			}
			
			
		};
		s.src = url;
		document.body.appendChild(s);
		
	
		 //var data = {'shop_id':shopId,'shop':shop};
		/*  const socialsettingsxhr = new XMLHttpRequest();					 
		 socialsettingsxhr.open('GET', socialsettingsurl, true);
		 socialsettingsxhr.onreadystatechange = () => {
			
			if (socialsettingsxhr.readyState == 4) { 
				console.log(socialsettingsxhr.status);
				var responseText = socialsettingsxhr.responseText;
				console.log(responseText);
				if(responseText && typeof responseText !== 'undefined' && responseText !== 0 && typeof responseText !== '' ) {
				
				var response  = JSON.parse(responseText);
				//append share bttons
					if(response.status == 'success') {


							if(response.socialshare_settings.hasOwnProperty('is_catalog_social_share_enabled')) {
								is_catalog_social_share_enabled = response.socialshare_settings.is_catalog_social_share_enabled;
							}

							if(response.socialshare_settings.hasOwnProperty('catalog_share_greetings')) {
								catalog_share_greetings = response.socialshare_settings.catalog_share_greetings;
							}

							if(response.socialshare_settings.hasOwnProperty('catalog_share_greetings_discount_message')) {
								catalog_share_greetings_discount_message = response.socialshare_settings.catalog_share_greetings_discount_message;
							}

							if(response.socialshare_settings.hasOwnProperty('catalog_social_share_text')) {
								catalog_social_share_text = response.socialshare_settings.catalog_social_share_text;
							}


							if(response.socialshare_settings.hasOwnProperty('catalog_discount_code')) {
								catalog_discount_code = response.socialshare_settings.catalog_discount_code;
								discount_code  = response.socialshare_settings.catalog_discount_code;
							}

				//	setTimeout(function() {
					
							if(is_catalog_social_share_enabled == 1 ||   is_catalog_social_share_enabled == '1') {
									document.getElementById("tuecus-catalog-share-modal").style.display="block";
									document.getElementById("catalog_share_greetings").innerHTML=catalog_share_greetings;
									document.getElementById("catalog_share_greetings_discount_message").innerHTML=catalog_share_greetings_discount_message;
									
									
									
									var tb_carousel__thumbnail_sides = document.getElementsByClassName('tb_carousel__thumbnail_side');
									
									for(var i=0;i<tb_carousel__thumbnail_sides.length; i++) {
										var tb_carousel__thumbnail_side = tb_carousel__thumbnail_sides[i];
										tb_carousel__thumbnail_side.addEventListener('click', function(e) {
											//e.preventDefault();	
											var product_id = this.getAttribute('data-product-id');

											  var producthandleurl = 'https://'+shop+'/apps/tuecus/api/profile/'+product_id+'/producthandle';
											 var data = {'product_id':product_id,'shop':shop};
											 const producthandlexhr = new XMLHttpRequest();					 
											 producthandlexhr.open('POST', producthandleurl, true);
											 producthandlexhr.onreadystatechange = () => {
												
												if (producthandlexhr.readyState == 4) { 
													console.log(producthandlexhr.status);
													var responseText = producthandlexhr.responseText;
													var response  = JSON.parse(responseText);
													 var handle = response.handle;
													 redirect_page = '/products/'+handle;
													 //+'&trbooster_whatsapp_clk=y';
												}
											 };
											 producthandlexhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
											 producthandlexhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
											 producthandlexhr.send(JSON.stringify(data));


											
										});
									}
							
							
						//}, 2000);
						
								
								var closeelements = document.getElementsByClassName('tuecus-close');
								for(var i=0;i<closeelements.length; i++) {
									closeelement = closeelements[i];
									closeelement.addEventListener('click', function(e) {
										e.preventDefault();	
										var modelId = this.getAttribute('data-target');
										modelId = modelId.split('#')[1];
										document.getElementById(modelId).style.display ='none';
										
									});
								}
								
						}
		
					
					}
				}
			}

		};

		 socialsettingsxhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		 socialsettingsxhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		 socialsettingsxhr.send(); */
		 //socialsettingsxhr.send(JSON.stringify(data));


	}

			
	if(location.href.indexOf('cad_fb_clk=1') != -1) {
					
			 var socialshareurl = 'https://'+shop+'/apps/tuecus/api/profile/socialvisit/'+shopId;
			
			 var data = {'shop':shop,'click_source':'facebook','type':2};
			 
			 var cid = getParameterByName('cid',location.href);
			 
			 
			 if(cid !== 'undefined' && cid != '') {
				 
				data.customer_id =  cid;
				
				var configuration =  {
				   expires: 90,
				   path: '/',
				   domain: window.location.hostname
				};
				
				Cookies.set('social_share_by',cid , configuration);
			 }
			 
			 var discount_code1 = getParameterByName('discount_code',location.href);
			 
			 
			 if(discount_code1 !== 'undefined') {
				 
				data.discount_code =  discount_code1;
				
			 }
			 
			 const fbsharexhr = new XMLHttpRequest();
			 fbsharexhr.open('POST', socialshareurl, true);
			 fbsharexhr.onreadystatechange = () => {
				if (fbsharexhr.readyState > 3) { 
				 
					//var resdata = fbsharexhr.responseText;
					//console.log(resdata);
					//deleteCookie('tref');
				  //success(fbsharexhr);
				  
				}
			 };
			 fbsharexhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			 fbsharexhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			 fbsharexhr.send(JSON.stringify(data));
			 
			 
			
			//ok apply discount
			if(discount_code1 !== 'undefined') {
				
				//https://'+shop+'/discount/'+discount_code1
				var product_handle = location.href.replace(/.*\/\/[^\/]*/, '');
				if(product_handle.indexOf('?') !== -1) {
					product_handle = product_handle.split('?')[0];
				}
				 var discounturl = 'https://'+shop+'/discount/'+discount_code1+'?redirect='+product_handle ;
				 // alert('apply discount'+discounturl);
				  location.href = discounturl;
				/*  const discountxhr = new XMLHttpRequest();
				 discountxhr.open('GET', discounturl, true);
				 discountxhr.onreadystatechange = () => {
					if (discountxhr.readyState > 3) { 
					 
						var resdata = discountxhr.responseText;
						console.log(resdata);
						//deleteCookie('tref');
					  //success(fbsharexhr);
					  
					}
				 };
				 //discountxhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
				 //discountxhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				 discountxhr.send(); */
			 
				
			 }
			
			
			 

	}  else if(location.href.indexOf('cad_twitter_clk=1') != -1) {
		
			//alert("ok fb visit");
				
			 var socialshareurl = 'https://'+shop+'/apps/tuecus/api/profile/socialvisit/'+shopId;
			 
			 var data = {'shop':shop,'discount_code':discount_code,'click_source':'twitter','type':2};
			 
			 var cid = getParameterByName('cid',location.href);
			 
			 if(cid !== 'undefined') {
				 
				data.customer_id =  cid;
				
				var configuration =  {
				   expires: 90,
				   path: '/',
				   domain: window.location.hostname
				};
				
				Cookies.set('social_share_by',cid , configuration);
				
			 }
			  var discount_code1 = getParameterByName('discount_code',location.href);
			 
			 
			 if(discount_code1 !== 'undefined') {
				 
				data.discount_code =  discount_code1;
				
			 }
			 
			 const newxhr = new XMLHttpRequest();
			 newxhr.open('POST', socialshareurl, true);
			 newxhr.onreadystatechange = () => {
				if (newxhr.readyState > 3) { 
				 
					//var resdata = newxhr.responseText;
					//console.log(resdata);
					//deleteCookie('tref');
				  //success(newxhr);
				  
				}
			 };
			 newxhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			 newxhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			 newxhr.send(JSON.stringify(data));

	} else if(location.href.indexOf('cad_whatsapp_clk=1') != -1) {
		
			//alert("ok whatsappp visit");
			var socialshareurl = 'https://'+shop+'/apps/tuecus/api/profile/socialvisit/'+shopId;
			
			 var data = {'shop':shop,'discount_code':discount_code,'click_source':'whatsapp','type':2};
			 
			 var cid = getParameterByName('cid',location.href);
			 
			 if(cid !== 'undefined') {
				 
				data.customer_id =  cid;
				
				var configuration =  {
				   expires: 90,
				   path: '/',
				   domain: window.location.hostname
				};
				
				Cookies.set('social_share_by',cid , configuration);
				
			 }
			 var discount_code1 = getParameterByName('discount_code',location.href);
			 
			 
			 if(discount_code1 !== 'undefined') {
				 
				data.discount_code =  discount_code1;
				
			 }
			 
			 const newxhr = new XMLHttpRequest();
			 newxhr.open('POST', socialshareurl, true);
			 newxhr.onreadystatechange = () => {
				if (newxhr.readyState > 3) { 
				 
					//var resdata = newxhr.responseText;
					//console.log(resdata);
					//deleteCookie('tref');
				  //success(newxhr);
				  
				}
			 };
			 newxhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			 newxhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			 newxhr.send(JSON.stringify(data));

	} 
	
	
    if(location.href.indexOf('/products/')  != -1 && location.href.indexOf('ref=loox-wr-btn&post_id') != -1) {

      //var product_id = '{{ product.id }}';
      //var customer_id = '{{ customer.id }}';
	  
	  var product_id = document.getElementById('tuecus-product-id').value;
	  var customer_id = document.getElementById('tuecus-customer-id').value;
	
	  var product_handle = location.href.replace(/.*\/\/[^\/]*/, '');
	  if(product_handle.indexOf('?') !== -1) {
			product_handle = product_handle.split('?')[0];
	  }
	  if(product_handle.indexOf('#') !== -1) {
			product_handle = product_handle.split('#')[0];
	  }			
      //console.log('product_id'+product_id);

      if (typeof LOOX !== 'undefined' && typeof product_id !== 'undefined' && typeof customer_id !== 'undefined') {

         //console.log("loox_global_hash time:"+loox_global_hash);
         var clientId = LOOX.clientId;
         //console.log("clientId:"+clientId);
         var reviewid = getParameterByName('post_id');

         //console.log('reviewid'+reviewid);
		 var x = new Date()
		 var UTCseconds = x.getTime();
         var reviewurl = 'https://'+shop+'/apps/tuecus/api/profile/savereview/'+shopId;
			
		 var data = {'shop':shop,'clientId':clientId,'product_id':product_id,'loox_global_hash':UTCseconds,'reviewid':reviewid,'customer_id':customer_id,'product_handle':product_handle};
	
         const reviewsxhr = new XMLHttpRequest();
         reviewsxhr.open('POST', reviewurl, true);
         reviewsxhr.onreadystatechange = () => {
            if (reviewsxhr.readyState > 3) { 

                var resdata = reviewsxhr.responseText;
                console.log(resdata);
                //deleteCookie('tref');
              //success(fbsharexhr);

            }
         };
          reviewsxhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		  reviewsxhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		  reviewsxhr.send(JSON.stringify(data));

		//  getreviewdata(clientId,product_id,loox_global_hash,reviewid);
		 
		 
		 


      } else {

        console.log('loox not defined'); 
      }

    }
	if(location.href.indexOf('/products/')  != -1) {
		
		var jdgm_submit_rev = document.getElementsByClassName('jdgm-submit-rev');
		if(jdgm_submit_rev && jdgm_submit_rev.length > 0) {
				var jdgm_submit_rev_button = jdgm_submit_rev[0];
				jdgm_submit_rev_button.onClick = function() {
					alert('jdgm_submit_rev_button');
				}
		}
	}
});



