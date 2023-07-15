var shop = Shopify.shop;
var	shopId = Shopify.shopId;

var customer_email = 'customer_email';
var wish_product_handle = 'wish_product_handle';

var terms_guid=  new Date().getTime();
var warningmessage = '';
var warningmessagestyle = 'alert';
var textmessage = '';
var target = '_blank';
var link = 'javascript:void(0);';
var size = 13;
var textcolor = "";
var backgroundcolor = "";
var click_text = "";
var customcss = "";

var	checkout_token = '';
// Once the DOM is ready...


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
docReady(function() {



function getCookie(cookie_name) {
    var name = cookie_name + "=";
    var cookiedata = decodeURIComponent(document.cookie);
    var cookies = cookiedata.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      //alert("cookie"+cookie);
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  };

function setCookie(cookie_name, cookie_value, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = encodeURIComponent(cookie_name + "=" + cookie_value + ";" + expires + ";path=/");
};
    
function deleteCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};


function loadCss(url, callback) {
	
    var e  = document.createElement('link');   
    e.rel  = 'stylesheet';
    e.type = 'text/css';
    e.href = url;
    e.media = 'all';
	e.addEventListener('load', callback);
    document.getElementsByTagName("head")[0].appendChild(link);
}

function loadJS(url, callback) 
{
  var e = document.createElement("script");
  e.src = url;
  e.type="text/javascript";
  e.addEventListener('load', callback);
  document.getElementsByTagName("head")[0].appendChild(e);
}

function setCustomerData() {
	
	//alert('setCustomerData');
	//if(location.href.indexOf('/products/') != -1) {
		
		//jQuery.ajax({type:"POST", data:{'product_id':timerobj.product_id}, dataType: "jsonp", async: false, url:targeturl,jsonpCallback: "handleTimerResponse"});
		//plugin bootstrap minus and plus
		//http://jsfiddle.net/laelitenetwork/puJ6G/
		
		shop = Shopify.shop;
		//alert(shop);
		//console.log(shop);
		//var targeturl = term_url+"?shop="+shop;	
		//$.ajax({type:"GET", dataType: "jsonp", async: false,url:targeturl,jsonpCallback: "handleTermsResponse"});
	
	
		//alert('getCustomerData');
	
		//var customer_id = $("#tuecus-customer-id").val();	
	
		if(document.getElementById('tuecus-customer-id')) {
			var customer_id = document.getElementById('tuecus-customer-id').value;
			//alert(customer_id);
			var tuecus_app_proxy = document.getElementById('tuecus-app-proxy').value;
			var tuecus_store_token = document.getElementById('tuecus-store-token').value;
			var app_id = document.getElementById('tuecus-app-id').value;
			var tref = getCookie('tref');
			
			if(customer_id != '' && customer_id != 'undefined' && tref != '' && tref != 'undefined' && tref != null && tref != 'null' ) {
				
				
					
				
			
			
				//var url="/apps/"+$("#tuecus-app-proxy").val()+"/api/profile/tref"+"/"+$("#tuecus-store-token").val();
			   var url="/apps/"+tuecus_app_proxy+"/api/profile/tref"+"/"+tuecus_store_token;
				var data = {};

				//data.app_id = $("#tuecus-app-id").val();
				//data.store_token = $("#tuecus-store-token").val();
				
				data.app_id = app_id;
				data.store_token = tuecus_store_token;
				
				data.customer_id = customer_id;
				data.tref = tref;
				//data.store_id=  $("#tuecus-store-id").val();
				/* $.ajax({
				  type: "POST",
				  url: url,
				  data: data,
				  success: function(response){
					deleteCookie('tref');
					console.log("update data"+JSON.stringify(response));
					var data = response.data;			  
						
					 //$('#tuecus-profile-modal').hide();			  
				  },error: function(data){
					  deleteCookie('tref');
					 console.log("update error data"+JSON.stringify(data));
					
					// $('#tuecus-profile-modal').hide();
				  },
				  dataType: "json"
				}); */
				
				//do pure javascript ajax call
				
				 const xhr = new XMLHttpRequest();
				 xhr.open('POST', url, true);
				 xhr.onreadystatechange = () => {
					if (xhr.readyState > 3) { 
					 
						var resdata = xhr.responseText;
						console.log(resdata);
						deleteCookie('tref');
						
						//alert('set tref_by'+tref);
						setCookie('tref_by',tref,30);
						
					  //success(xhr);
					  
					}
				 };
				 xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
				 xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				 xhr.send(JSON.stringify(data));
				  
				  
				  /* Refer friend visit */
				
			
				 var tref_by = getParameterByName('tref');		
				 var clk_src = getParameterByName('clk_src');	
				 var store_token = document.getElementById('tuecus-store-token').value;				
				 var referfriendurl = 'https://'+shop+'/apps/tuecus/api/profile/referfriend/'+store_token;
				 var data = {'shop':shop,'click_source':clk_src,'type':2,'tref_by':tref_by};				 
				 var customer_id = document.getElementById('tuecus-customer-id').value;
				 data.customer_id = customer_id;
				 
				 const fbsharexhr = new XMLHttpRequest();
				 fbsharexhr.open('POST', referfriendurl, true);
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
					 
				  /* Refer friend visit end */
					 
				
			
			}
			
			
		}
	//}
	
}


var refcode = getParameterByName('tref',window.location.href);
//alert("refcode2"+refcode);
if(refcode !== 'undefined') {
	//set cookie	
	setCookie('tref',refcode,30);	
    //alert("getCookie"+getCookie('tref'));
	setCustomerData(); 
}

/* 
if(Shopify && Shopify.Checkout && Shopify.Checkout.token) {
    checkout_token	= Shopify.Checkout.token;
}

if(location.href.indexOf('/checkouts/'+checkout_token+'/'+'thank_you') != -1  || location.href.indexOf('/orders/'+checkout_token)  != -1) {
	 var product_id = $("tr.product").attr('data-product-id');
	 var url='/products/' + product_id + '.json';
	 const xhr = new XMLHttpRequest();
	 xhr.open('GET', url, true);
	 xhr.onreadystatechange = () => {
		if (xhr.readyState > 3) { 
		 
			var resdata = xhr.responseText;
			console.log(resdata);
			
		  
		}
	 };
	 xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	 xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	 xhr.send();			 
			 

}	 */

//
  
  
  
  
});
