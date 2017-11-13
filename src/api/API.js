import axios from 'axios'

let { apiUrl, betUrl, expireCookies, urlNotAuthor } = config

export const API = () => {
	let accessToken = Cookies.get('token');
	let baseURL = apiUrl + 'api/';
	let instrance = axios.create({
	  	baseURL: baseURL,
	  	headers: {
	  		token: accessToken, 
	  		time_stamp: new Date().getTime(), 
	  		language: 'en', 
	  	},
	  	transformRequest: [function (data, headers) {
		    // Do whatever you want to transform the data
		    headers['Content-Type'] = 'application/json;charset=utf-8'
			return JSON.stringify(data);
		}],
	  	transformResponse: [function (data) {
	    	let obj = JSON.parse(data)
		    let {StatusCode, Token} = obj;
		    if (Token) {
		        Cookies.set('token', Token, { expires: expireCookies });
		    }
		    if(StatusCode == 4 || StatusCode == 8 || StatusCode == 6) {
				Cookies.remove('token')
				Cookies.remove('favoriteMatch')
				Cookies.remove('favoriteLeague')
				let isUrlNotAuthor = false;
				for(let i = 0; i < urlNotAuthor.length; i++) {
					if(window.location.pathname.indexOf(urlNotAuthor[i]) != -1) {
						isUrlNotAuthor = true
					}
				}
		    	if(isUrlNotAuthor == false) {
		    		if(config.isLogout == false) {
		    			// alert('Log in time out')
		    			config.isLogout = true
		    		}
		    		window.location.replace("/login");
		    	}
		    }
		    config.isLogout = false;
	    	return obj;
	  	}],
	});
  	return instrance;

}

export const BetAPI = () => {
	let accessToken = Cookies.get('token');
	let baseURL = betUrl + 'api/';
	let instrance = axios.create({
	  	baseURL: baseURL,
	  	headers: {
	  		token: accessToken, 
	  		time_stamp: new Date().getTime(), 
	  		language: 'en', 
	  	},
	  	transformRequest: [function (data, headers) {
		    // Do whatever you want to transform the data
		    headers['Content-Type'] = 'application/json;charset=utf-8'
			return JSON.stringify(data);
		}],
	  	transformResponse: [function (data) {
	    	let obj = JSON.parse(data)
		    let {StatusCode, Token} = obj;
		    if (Token) {
		        Cookies.set('token', Token, { expires: expireCookies })
		    }
		    if(StatusCode == 4 || StatusCode == 8 || StatusCode == 6) {
				Cookies.remove('token')
				Cookies.remove('favoriteMatch')
				Cookies.remove('favoriteLeague')
				let isUrlNotAuthor = false;
				for(let i = 0; i < urlNotAuthor.length; i++) {
					if(window.location.pathname.indexOf(urlNotAuthor[i]) != -1) {
						isUrlNotAuthor = true
					}
				}
		    	if(isUrlNotAuthor == false) {
		    		if(config.isLogout == false) {
		    			// alert('Log in time out')
		    			config.isLogout = true
		    		}
		    		window.location.replace("/login");
		    	}
		    }
		    config.isLogout = false;
	    	return obj;
	  	}],
	});
  	return instrance;

}
