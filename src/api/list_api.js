export const login = (data) => {
	let api = makeAxios.API();
	let p = new Promise((resolve, reject) => {
		api.post('user/login/1', data)
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}

export const refreshInfo = () => {
	let api = makeAxios.API();
	let p = new Promise((resolve, reject) => {
		api.get('user/refresh_info')
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}

export const getBetSetting = (setting = 0) => {
	let api = makeAxios.API();
	let p = new Promise((resolve, reject) => {
		api.get(`user/get_bet_settings/${setting}`)
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}

export const getMaxMinBetForLeague = () => {
	let api = makeAxios.API();
	let p = new Promise((resolve, reject) => {
		api.get(`league_permission/get_max_min_bet_for_league`)
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}

// export const getOdds = (getType = 0, league=29) => {
// 	let api = makeAxios.BetAPI();
// 	let p = new Promise((resolve, reject) => {
// 		api.get(`odds/get/1/${league}/${getType}`)
// 		.then((result)=> {
// 			resolve(result)
// 		}, (err) => {
// 			reject(err);
// 		})
// 	})
// 	return p;
// }

export const getBetListFull = (data) => {
	if(data === undefined) 
		data = {"startdate":"1970-01-01 00:00:00 +07:00","enddate":"9999-01-01 23:59:59 +07:00"}
	let api = makeAxios.API();
	let p = new Promise((resolve, reject) => {
		api.post(`logs/search_bet_list_full`, data)
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}

export const getStatement = (data) => {
	if(data === undefined) 
		data = {"startdate":"1970-01-01 00:00:00 +07:00","enddate":"9999-01-01 23:59:59 +07:00"}
	let api = makeAxios.API();
	let p = new Promise((resolve, reject) => {
		api.post(`credit_history/get_statement`, data)
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}

export const searchMatchResultSport = (sportId=29, league='', date= '2017-08-22+00:00:00+%2B07:00', sort='normal') => {
	let api = makeAxios.API();
	let p = new Promise((resolve, reject) => {
		api.get(`sport/search_match_result_sport?sportId=${sportId}&league=${league}&date=${date}&sort=${sort}`)
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}

export const getLine = (data) => {
	let api = makeAxios.BetAPI();
	let p = new Promise((resolve, reject) => {
		api.post(`odds/get_line`, data)
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}

export const placeBet = (data) => {
	let api = makeAxios.BetAPI();
	let p = new Promise((resolve, reject) => {
		api.post(`odds/place_bet`, data)
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}

export const getAllSports = () => {
	let api = makeAxios.API();
	let p = new Promise((resolve, reject) => {
		api.get('sport/get_all_sports')
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}

export const getOddsV2 = (data) => {
	let obj = {
		domainId: 1, 
		sportId: 29, 
		marketEnum: 0, 
		MarketFilter: 2, 
	}
	if(Helper.checkObj(data)) {
		obj = {...obj, ...data}
	}
	let api = makeAxios.BetAPI();
	let p = new Promise((resolve, reject) => {
		api.get(`odds/getV2/${obj.domainId}/${obj.sportId}/${obj.marketEnum}?MarketFilter=${obj.MarketFilter}`)
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}

export const getAllSportsLineOdds = () => {
	let api = makeAxios.BetAPI();
	let p = new Promise((resolve, reject) => {
		api.get('odds/get_all_sports')
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}

export const filterPersonalAnnouncement = (date) => {
	let api = makeAxios.API();
	let newDate = new Date();
	let data = {
		startdate: moment(newDate.setHours(0,0,0)).format('YYYY-MM-DD HH:mm:ss ZZ'), 
		enddate: moment(newDate.setHours(23,59,59)).format('YYYY-MM-DD HH:mm:ss ZZ'), 
	}
	if(Helper.checkObj(date)) {
		data = date;
	}
	let p = new Promise((resolve, reject) => {
		api.post('announcement/filter_personal_announcement', data)
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}

export const filterSpecialAnnouncement = (date) => {
	let api = makeAxios.API();
	let newDate = new Date();
	let data = {
		startdate: moment(newDate.setHours(0,0,0)).format('YYYY-MM-DD HH:mm:ss ZZ'), 
		enddate: moment(newDate.setHours(23,59,59)).format('YYYY-MM-DD HH:mm:ss ZZ'), 
	}
	if(Helper.checkObj(date)) {
		if(Helper.checkData(date.startdate))
			data.startdate = date.startdate;
		if(Helper.checkData(date.enddate))
			data.enddate = date.enddate;
	}
	let p = new Promise((resolve, reject) => {
		api.post('announcement/filter_special_announcement_with_date', data)
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}

export const changePassword = (data) => {
	let api = makeAxios.API();
	let p = new Promise((resolve, reject) => {
		api.post('user/change_new_password', data)
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}

export const getTweakOddClient = (data) => {
	let api = makeAxios.API();
	let p = new Promise((resolve, reject) => {
		api.get('user/get_tweak_odd_client')
		.then((result)=> {
			resolve(result)
		}, (err) => {
			reject(err);
		})
	})
	return p;
}
