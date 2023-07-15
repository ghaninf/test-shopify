/* function startFBLogin() {
	
}

function startTwitterLogin() {
	
}


function startGoogleLogin() {
	
}

var tuecus_facebook_login_btn = document.getElementById("tuecus-facebook-login");
tuecus_facebook_login_btn.addEventListener("click", function (ev) {
	ev.preventDefault();
	startFBLogin();	
}, false);
var tuecus_twitter_login_btn = document.getElementById("tuecus-twitter-login");
tuecus_twitter_login_btn.addEventListener("click", function (ev) {
	ev.preventDefault();
	startTwitterLogin();	
}, false);

var tuecus_google_login_btn = document.getElementById("tuecus-google-login");
tuecus_google_login_btn.addEventListener("click", function (ev) {
	ev.preventDefault();
	startGoogleLogin();	
}, false); */


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

function submitCustomerLoginInfo(email, password) {
   /*  var customer_login_form = document.getElementById('customer_login');
	customer_login_form.elements.namedItem("customer[email]").value = email;
	customer_login_form.elements.namedItem("customer[password]").value = password;

    customer_login_form.submit(); */
	var customer_login_data = {};
	customer_login_data.form_type='customer_login';
	customer_login_data.utf8='✓';
	customer_login_data.customer={};
	customer_login_data.customer.email=email;
	customer_login_data.customer.password=password;
	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/account/login', true);
	xhr.onreadystatechange = () => {
	  if (xhr.readyState > 3) { 
		  location.href="/account";
		  //success(xhr);
		  
	  }
	};
	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send(JSON.stringify(customer_login_data));
		  
		  
}

if(location.href.indexOf('/account/login') != -1) {
	
	var te = getParameterByName('te',window.location.href);
	var tw = getParameterByName('tw',window.location.href);
	if(te !== 'undefined' && tw !== 'undefined' && te !== null && tw !== null && te !== '' && tw !== '') {
		var social_login_container = document.getElementById('tuecus-social-login-container');
		social_login_container.style.display="none";
		//submit login form
		submitCustomerLoginInfo(atob(te),atob(tw));
		
	} else if(tuecus_error !== 'undefined' &&   tuecus_error !== null && tuecus_error !== '') {
		var social_login_container = document.getElementById('tuecus-social-login-container');
		social_login_container.style.display="block";	
	
	} else {
		var social_login_container = document.getElementById('tuecus-social-login-container');
		social_login_container.style.display="block";		
	}
} else if(location.href.indexOf('/account/register') != -1) {
	
	var te = getParameterByName('te',window.location.href);
	var tw = getParameterByName('tw',window.location.href);
	var tuecus_error = getParameterByName('tuecus_error',window.location.href);
	
	if(te !== 'undefined' && tw !== 'undefined' && te !== null && tw !== null && te !== '' && tw !== '') {
		var social_login_container = document.getElementById('tuecus-social-login-container');
		social_login_container.style.display="none";
		//submit login form
		submitCustomerLoginInfo(atob(te),atob(tw));
		
	} else if(tuecus_error !== 'undefined' &&   tuecus_error !== null && tuecus_error !== '') {
		var social_login_container = document.getElementById('tuecus-social-login-container');
		social_login_container.style.display="block";	
	
	} else {
		var social_login_container = document.getElementById('tuecus-social-login-container');
		social_login_container.style.display="block";		
	}
	
	
	
	
}