function tuecusreorder(orderid) {

	//var lineitems = JSON.parse($("#order_line_items_"+orderid).html());
	var lineitems = JSON.parse(document.getElementById("order_line_items_"+orderid).innerHTML);
    if(lineitems.length > 1) {
      var i;

        var finalitems = [];

        for(i = 0; i < lineitems.length; i++) {
            var  lineitem = lineitems[i];
          var cartitem = {};
          cartitem.id =  lineitem.variant_id;
          cartitem.quantity = lineitem.quantity;
          finalitems.push(cartitem);

        } 
      if(finalitems.length > 0) {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', '/cart/add.js', true);
          xhr.onreadystatechange = () => {
            if (xhr.readyState > 3) { 
              location.href="/cart";
              //success(xhr);
              
            }
          };
          xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          xhr.send(JSON.stringify({items: finalitems}));
      }

    } else {
      
      /* $.ajax({
			type: 'POST',
			url: '/cart/add.js',
			data: {
			  quantity: lineitems[0].quantity,
			  id: lineitems[0].variant_id
			},
			dataType: 'json', 
			success: function (data) { 
				//alert("added item to cart");
			 	location.href="/cart";
			} 
		}); */
		  var data = { quantity: lineitems[0].quantity, id: lineitems[0].variant_id};
		  const xhr = new XMLHttpRequest();
          xhr.open('POST', '/cart/add.js', true);
          xhr.onreadystatechange = () => {
            if (xhr.readyState > 3) { 
              location.href="/cart";
             // success(xhr);
              
            }
          };
          xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          xhr.send(JSON.stringify(data));
		  
		
		
		
      
      
    }
}

/* function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}   */
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

var tuecus_is_cart_enable = 0;

docReady(function() {
   // DOM is loaded and ready for manipulation here
   //alert("ok dom ready");
	//tuecus-is-cart-automatic = document.getElementById('tuecus-is-cart-automatic').value;
	
	// detect MSIE 9,10,11, but not Edge
	ua=navigator.userAgent.toLowerCase();isIE=/msie/.test(ua);

	function getcreditdata(){
		tuecus_is_cart_enable = document.getElementById('tuecus-is-cart-enable');	
		if(tuecus_is_cart_enable && tuecus_is_cart_enable.value == 1) {
			//get credits from server
				
			getCartData(getCredits,function(){
				console.error('cannot get cart data');
			})
		}
		
		tuecus_is_customer_choice_cart_enable = document.getElementById('tuecus-is-customer-choice-cart-enable');	
		if(tuecus_is_customer_choice_cart_enable && tuecus_is_customer_choice_cart_enable.value == 1) {
			//get credits from server
				
			getCartData(getCustomerChoiceCredits,function(){
				console.error('cannot get cart data');
			})
		}
	}
	if(isIE){
		// play it safe, very few users, exec ur JS when all resources are loaded
		window.onload=function(){getcreditdata();}
	} else {
		// add event listener to trigger your function when DOMContentLoaded
		if(document.readyState==='loading'){
			document.addEventListener('DOMContentLoaded',getcreditdata);
		} else {
			// DOMContentLoaded already loaded, so better trigger your function
			getcreditdata();
		}
	}


	
});

function getXMLHttpRequest() {
  if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    return new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE 6 and older
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
} 
  
function getCartData(callback, error) {
   
  var ucxhr = getXMLHttpRequest();
  ucxhr.onreadystatechange = function () {
    if (ucxhr.readyState > 3 ) {
      if (ucxhr.status == 200) {
        if (typeof callback == "function") {
          var res = JSON.parse(this.responseText);
          callback(res);
        }
      } else {
        if (typeof error == "function") {
          error();
        }
      }
    }
  };
  ucxhr.open("GET", "/cart.json", true);
  ucxhr.send();
};

function getCustomerChoiceCredits(cartdata) {
	//alert('getCustomerChoiceCredits');
	if(cartdata.items.length > 0) {
		console.log(JSON.stringify(cartdata));
		var appproxy =  document.getElementById("tuecus-app-proxy").value; 
		var storetoken =  document.getElementById("tuecus-store-token").value; 
		var customer_id  =  document.getElementById("tuecus-customer-id").value; 
		var app_id  =  document.getElementById("tuecus-app-id").value;
		var url="/apps/"+appproxy+"/api/profile/customeractivecredits/"+storetoken;
		var data = {};
		data.app_id = app_id;
		data.store_token = storetoken;
		data.customer_id = customer_id; 
		data.cartdata = cartdata;	

		var total_price = cartdata.total_price/100;
		const ucxhr = new XMLHttpRequest();
		ucxhr.open('POST', url, true);
		ucxhr.onreadystatechange = () => {
		  
			if (ucxhr.readyState > 3) { 
			
			  var responseText = ucxhr.responseText;
			  console.log(responseText);
			  var response = JSON.parse(responseText);
			  if(!response.error) {
				var data = response.data;
				var credits = data.totalcredits;
				if(credits > 0) {
				  //alert("ok enable select credits"); 
				  var rules_data = '';
				  var spent_rules = data.spent_rules;
				  
				  //alert("rules_data"+rules_data);
				   
				   var checkoutbuttons = ["input[name='checkout']", "button[name='checkout']", "[href$='checkout']"];
					checkoutbuttons.forEach(function (checkoutbutton) {
						var checkout_elements = document.querySelectorAll(checkoutbutton);
						if (typeof checkout_elements == "object" && checkout_elements) {
						  for (var i = 0; i < checkout_elements.length; i++) {
							var checkout_element = checkout_elements[i];
							if (typeof checkout_element.addEventListener != "function") {
							  return;
							}
                            
                            tuecus_is_customer_choice_cart_enable = document.getElementById('tuecus-is-customer-choice-cart-enable');	
							if(tuecus_is_customer_choice_cart_enable && tuecus_is_customer_choice_cart_enable.value == 1) {
                            		
                              	//alert('customer-choice-cart-enable');
                                     		
                                var creditsdivelement = document.createElement('div');
                                creditsdivelement.id = 'tuecus-credits-input';
                                creditsdivelement.className = 'tuecus-col-md-6';
                                creditsdivelement.innerHTML = 'Use <input type="number" value="" id="tuecus-use-credits-freeway" name="tuecus-use-credits-freeway" min="0" max="'+credits+'" class="tuecus-w-25"/> Rewards Out Of '+credits+' Total Rewards ';


                                checkout_element.parentElement.insertBefore(creditsdivelement,checkout_element);

                                checkout_element.addEventListener("click", function (ev) {
                                  ev.preventDefault();
                                  // apply credits and discount redirect to checkout
                                  // alert("apply credits and discount redirect to checkout");
                                  appycreditsfreeway(cartdata);
                                  //setTimeout(function() {
                                  //	location.href='/checkout';
                                  //}, 4000);
                                }, false);
                              	
                            }
                            
						  }
						}
					});


				  // document.getElementById("tuecus-cart-enable-code").innerHTML = '<span>Apply </span><select name="tuecus-select-credits">'+rules_data+'</select>';
				 //  document.getElementById("tuecus-cart-enable-code").style.display='block';
				   
				}
				
			  } else {
				   var data = response.data;
				   console.log(data);
					
			  }

			  
			}
		};
		ucxhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		ucxhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		ucxhr.send(JSON.stringify(data));
		  
	}	  
}


function getCredits(cartdata) {
	
	if(cartdata.items.length > 0) {
		console.log(JSON.stringify(cartdata));
		var appproxy =  document.getElementById("tuecus-app-proxy").value; 
		var storetoken =  document.getElementById("tuecus-store-token").value; 
		var customer_id  =  document.getElementById("tuecus-customer-id").value; 
		var app_id  =  document.getElementById("tuecus-app-id").value;
		var url="/apps/"+appproxy+"/api/profile/customeractivecredits/"+storetoken;
		var data = {};	
		data.app_id = app_id;
		data.store_token = storetoken;
		data.customer_id = customer_id; 
		data.cartdata = cartdata;	

		var total_price = cartdata.total_price/100;
		const ucxhr = new XMLHttpRequest();
		ucxhr.open('POST', url, true);
		ucxhr.onreadystatechange = () => {
		  
			if (ucxhr.readyState > 3) { 
			
			  var responseText = ucxhr.responseText;
			  console.log(responseText);
			  var response = JSON.parse(responseText);
			  if(!response.error) {
				var data = response.data;
				var credits = data.totalcredits;
				if(credits > 0) {
				  //alert("ok enable select credits"); 
				  var rules_data = '';
				  var spent_rules = data.spent_rules;
				   for(var i=0;i<spent_rules.length; i++) {
					  
					   if(spent_rules[i].alias == 'spent_rule' && spent_rules[i].discount_code !== 'NULL' && spent_rules[i].discount_code !== 'null' && spent_rules[i].discount_code !== null && spent_rules[i].allowed_credits <= credits) {
						   if(total_price >= spent_rules[i].cart_min_value && total_price <= spent_rules[i].cart_max_value) {
								if(spent_rules[i].allowed_credits <= credits){
									rules_data += '<option value="'+spent_rules[i].allowed_credits+'" data-rule-id='+spent_rules[i].id+'>'+allowed_credits_trnsl+' '+spent_rules[i].allowed_credits+' '+out_of_trnsl+' '+credits +' '+with_cart_value_trnsl+' ('+spent_rules[i].cart_min_value+','+spent_rules[i].cart_max_value+') </option>';
									rules_data += '<option value="'+credits+'"> Do not use credits </option>';
								}else{
									//rules_data += '<option value="'+credits+'" data-rule-id='+spent_rules[i].id+'>'+allowed_credits_trnsl+' '+credits+' '+out_of_trnsl+' '+credits +' '+with_cart_value_trnsl+' ('+spent_rules[i].cart_min_value+','+spent_rules[i].cart_max_value+') </option>';
									rules_data += '<option value="'+credits+'">You do not have sufficient credits to get discount. Minimum '+spent_rules[i].allowed_credits+' credits are required</option>';
								}
						   }
					   } else if(spent_rules[i].alias == 'spent_max_amount_rule' && spent_rules[i].discount_code !== 'NULL' && spent_rules[i].discount_code !== 'null' && spent_rules[i].discount_code !== null && spent_rules[i].allowed_credits <= credits) {
						   if(total_price >= spent_rules[i].cart_min_value) {
								if(spent_rules[i].allowed_credits <= credits){
									rules_data += '<option value="'+spent_rules[i].allowed_credits+'" data-rule-id='+spent_rules[i].id+'>'+allowed_credits_trnsl+' '+spent_rules[i].allowed_credits+' '+out_of_trnsl+' '+credits +' '+with_cart_value_trnsl+' >'+spent_rules[i].cart_min_value+' </option>';
									rules_data += '<option value="'+credits+'"> Do not use credits </option>';
								}else{
									//rules_data += '<option value="'+credits+'" data-rule-id='+spent_rules[i].id+'>'+allowed_credits_trnsl+' '+credits+' '+out_of_trnsl+' '+credits +' '+with_cart_value_trnsl+' >'+spent_rules[i].cart_min_value+' </option>';	
									rules_data += '<option value="'+credits+'">You do not have sufficient credits to get discount. Minimum '+spent_rules[i].allowed_credits+' credits are required</option>';
								}
						   }
					   }else if(spent_rules[i].discount_code !== 'NULL' && spent_rules[i].discount_code !== 'null' && spent_rules[i].discount_code !== null && spent_rules[i].allowed_credits > credits) {
                       		rules_data += '<option value="'+credits+'">You do not have sufficient credits to get discount. Minimum '+spent_rules[i].allowed_credits+' credits are required</option>';
                       }
				   }
				  // alert("rules_data"+rules_data);
				   
				   var checkoutbuttons = ["input[name='checkout']", "button[name='checkout']", "[href$='checkout']"];
					checkoutbuttons.forEach(function (checkoutbutton) {
						var checkout_elements = document.querySelectorAll(checkoutbutton);
						if (typeof checkout_elements == "object" && checkout_elements) {
						  for (var i = 0; i < checkout_elements.length; i++) {
							var checkout_element = checkout_elements[i];
							if (typeof checkout_element.addEventListener != "function") {
							  return;
							}
							if(rules_data.length > 0) {
								
								
                              	  if(data.hasOwnProperty('enable_auto_inst_cred') && data.enable_auto_inst_cred == '1') {
                     					
                                       var crediselecttselement = document.createElement("select");   // Create a <button> element
                                       crediselecttselement.setAttribute("name","tuecus-select-credits");
                                       crediselecttselement.setAttribute("id","tuecus-select-credits");
									   crediselecttselement.setAttribute("class","tuecus-form-control");

                                       crediselecttselement.innerHTML = rules_data;	
                                       crediselecttselement.style.display='none';
                                       checkout_element.parentElement.insertBefore(crediselecttselement,checkout_element);
									   autoappycredits();
                                   } else {
									   
											var crediselecttselement = document.createElement("select");   // Create a <button> element
											crediselecttselement.setAttribute("name","tuecus-select-credits");
											crediselecttselement.setAttribute("id","tuecus-select-credits");
											crediselecttselement.setAttribute("class","tuecus-form-control");
											
											crediselecttselement.innerHTML = rules_data;	

											checkout_element.parentElement.insertBefore(crediselecttselement,checkout_element);

											checkout_element.addEventListener("click", function (ev) {
											ev.preventDefault();
											  // apply credits and discount redirect to checkout
											 // alert("apply credits and discount redirect to checkout");
											  appycredits();
											/*   setTimeout(function() {
												  location.href='/checkout';
											  }, 4000); */
											}, false);
								   }
							} else {
								//do nothing
								
							}

						  }
						}
					});


				  // document.getElementById("tuecus-cart-enable-code").innerHTML = '<span>Apply </span><select name="tuecus-select-credits">'+rules_data+'</select>';
				 //  document.getElementById("tuecus-cart-enable-code").style.display='block';
				   
				}
				
			  } else {
				   var data = response.data;
				   console.log(data);
					
			  }

			  
			}
		};
		ucxhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		ucxhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		ucxhr.send(JSON.stringify(data));
		  
	}	  
}

function appycreditsfreeway(cartdata) {
  //check auto apply credit is enabled
  //alert('appycreditsfreeway');
  var allowed_credits = document.getElementById("tuecus-use-credits-freeway").value;
  //alert('allowed_credits: '+allowed_credits);
	var appproxy =  document.getElementById("tuecus-app-proxy").value; 
	var storetoken =  document.getElementById("tuecus-store-token").value; 
	var customer_id  =  document.getElementById("tuecus-customer-id").value; 
	var app_id  =  document.getElementById("tuecus-app-id").value;
	var url="/apps/"+appproxy+"/api/profile/appycreditsfreeway/"+storetoken;
	
  	var data = {};	
	data.app_id = app_id;
	data.store_token = storetoken;
	data.customer_id = customer_id;
	data.allowed_credits = allowed_credits;
  	data.cart_items = cartdata.items;
	
  	const ucxhr = new XMLHttpRequest();
	ucxhr.open('POST', url, true);
	ucxhr.onreadystatechange = () => {
	  
		if (ucxhr.readyState > 3) { 
		
		  var resdata = ucxhr.responseText;
		  console.log(resdata);
		  //alert(JSON.stringify(resdata));
		  var response = JSON.parse(resdata);
		  if (!response.error) {
			  
              if (typeof(response.data) != 'undefined' && response.data != null)
              {
                location.href = "/checkout?discount="+response.data.discount_code;
              }else{
              	location.href = "/checkout";
              }
		  }
		
		}
	};
	ucxhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	ucxhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	ucxhr.send(JSON.stringify(data));
}


function appycredits() {
  //check auto apply credit is enabled

  var credits_select_element = document.getElementById("tuecus-select-credits");
  var cse_selected_index = credits_select_element.options.selectedIndex; 
  var spent_rule_id = credits_select_element.options[cse_selected_index].getAttribute('data-rule-id'); 
  

	var appproxy =  document.getElementById("tuecus-app-proxy").value; 
	var storetoken =  document.getElementById("tuecus-store-token").value; 
	var customer_id  =  document.getElementById("tuecus-customer-id").value; 
	var app_id  =  document.getElementById("tuecus-app-id").value;
	var url="/apps/"+appproxy+"/api/profile/applycredits/"+storetoken;
	var data = {};	
	data.app_id = app_id;
	data.store_token = storetoken;
	data.customer_id = customer_id; 
	data.spent_rule_id = spent_rule_id;
	data.allowed_credits = credits_select_element.value;
	const ucxhr = new XMLHttpRequest();
	ucxhr.open('POST', url, true);
	ucxhr.onreadystatechange = () => {
	  
		if (ucxhr.readyState > 3) { 
		
		  var resdata = ucxhr.responseText;
		  console.log(resdata);
		  
		  var response = JSON.parse(resdata);
		  if (!response.error) {
			  if (typeof(response.data) != 'undefined' && response.data != null)
              {
                location.href = "/checkout?discount="+response.data.discount_code;
              }else{
              	location.href = "/checkout";
              }
		  }
		
		}
	};
	ucxhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	ucxhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	ucxhr.send(JSON.stringify(data));
}


function autoappycredits() {
  //check auto apply credit is enabled

  var credits_select_element = document.getElementById("tuecus-select-credits");
  var cse_selected_index = credits_select_element.options.selectedIndex; 
  var spent_rule_id = credits_select_element.options[cse_selected_index].getAttribute('data-rule-id'); 
  

	var appproxy =  document.getElementById("tuecus-app-proxy").value; 
	var storetoken =  document.getElementById("tuecus-store-token").value; 
	var customer_id  =  document.getElementById("tuecus-customer-id").value; 
	var app_id  =  document.getElementById("tuecus-app-id").value;
	var url="/apps/"+appproxy+"/api/profile/applycredits/"+storetoken;
	var data = {};	
	data.app_id = app_id;
	data.store_token = storetoken;
	data.customer_id = customer_id; 
	data.spent_rule_id = spent_rule_id;
	const ucxhr = new XMLHttpRequest();
	ucxhr.open('POST', url, true);
	ucxhr.onreadystatechange = () => {
	  
		if (ucxhr.readyState > 3) { 
		
			  var resdata = ucxhr.responseText;
			  console.log(resdata);
			  
			  var response = JSON.parse(resdata);
			  if (!response.error) {
				  //location.href = "/checkout?discount=" + response.data.discount_code;
				  //alert('discount applied successfully');
				  
				  //https://'+shop+'/discount/'+discount_code
				  const applydiscountxhr = new XMLHttpRequest();
				  applydiscountxhr.open('GET', '/discount/'+discount_code, true);
				  applydiscountxhr.onreadystatechange = () => {
				  
					if (applydiscountxhr.readyState > 3) { 
						//document.getElementById('autoapplydiscount').href= "/checkout?discount=" + response.data.discount_code;
				  
						document.getElementById("tuecus-cart-auto-credit-success-modal").style.display="block";
					}
				  };
				  applydiscountxhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
				  applydiscountxhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				  applydiscountxhr.send();
		
		
				
				
			  }
			
		}
	};
	ucxhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	ucxhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	ucxhr.send(JSON.stringify(data));
}

