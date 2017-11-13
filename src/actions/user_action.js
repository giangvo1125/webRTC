import oddAction from './odd_action'
import helperAction from './helper_action'
const login = (data) => (dispatch, getState) => {
	return new Promise((a, b) => {
		Helper.blockUI(true)
		apiService.login(data)
		.then((response) => {
			Helper.blockUI(false)
			if(response.data.StatusCode == 0) {
				dispatch({
					type: types.LOGIN_USER, 
					payload: {user: response.data.Data}
				})
				dispatch(oddAction.getAllSportsLineOdds())
				dispatch(helperAction.getAllSports())
				let favoriteMatch = Cookies.get('favoriteMatch');
				let obj = {}
				let { resultSports } = getState().auth;
				obj[resultSports] = []
				if(!Helper.checkData(favoriteMatch)) {
					Cookies.set('favoriteMatch', obj, { expires: config.expireCookies })
				}
				let favoriteLeague = Cookies.get('favoriteLeague');
				if(!Helper.checkData(favoriteLeague)) {
					Cookies.set('favoriteLeague', obj, { expires: config.expireCookies })
				}
				setTimeout(() => {
                    dispatch(logout())
                }, 60000 * 15)
				a();
			}
			else {
				b(response)
			}
		}, (err) => {
			Helper.blockUI(false)
			console.log('err ',err)
			b(err);
		})
	})
}

const refreshInfo = () => (dispatch) => {
	Helper.blockUI(true)
	apiService.refreshInfo()
	.then((response) => {
		Helper.blockUI(false)
		if(response.data.StatusCode == 0) {
			dispatch({
				type: types.REFRESH_INFO, 
				payload: {user: response.data.Data}
			})
		}
		else {
			console.log('err')
		}
	}, (err) => {
		Helper.blockUI(false)
		console.log('err ',err)
	})
}

const logout = () => (dispatch) => {
	Cookies.remove('token');
	Cookies.remove('favoriteMatch');
	Cookies.remove('favoriteLeague');
	dispatch({
		type: types.LOGOUT_USER, 
		payload: {user: {}}
	})
	dispatch(oddAction.removeOddData())
}

const getBetList = (isLasWeek = false) => (dispatch, getState) => {
	Helper.blockUI(true)
	let obj = {}
	if(isLasWeek == true) {

	}
	else {
		var curr = new Date; // get current date
		var first = curr.getDate() - curr.getDay();
		var firstday = (new Date(curr.setDate(first+1)));
		obj = {"startdate":"1970-01-01 00:00:00 +07:00","enddate":"9999-01-01 23:59:59 +07:00"}
	}
	apiService.getBetListFull()
	.then((response) => {
		if(response.data.StatusCode == 0) {
			dispatch({
				type: types.GET_BET_LIST, 
				payload: {betList: response.data.Data}
			})
		}
		else {
			console.log('err')
		}
		Helper.blockUI(false)
	}, (err) => {
		console.log('err ',err)
		Helper.blockUI(false)
	})
}

const getStatement = () => (dispatch, getState) => {
	Helper.blockUI(true)
	apiService.getStatement()
	.then((response) => {
		if(response.data.StatusCode == 0) {
			dispatch({
				type: types.GET_STATEMENT, 
				payload: {statement: response.data.Data}
			})
		}
		else {
			console.log('err')
		}
		Helper.blockUI(false)
	}, (err) => {
		console.log('err ',err)
		Helper.blockUI(false)
	})
}

const searchMatchResultSport = () => (dispatch, getState) => {
	Helper.blockUI(true)
	apiService.searchMatchResultSport()
	.then((response) => {
		if(response.data.StatusCode == 0) {
			dispatch({
				type: types.GET_STATEMENT, 
				payload: {statement: response.data.Data}
			})
		}
		else {
			console.log('err')
		}
		Helper.blockUI(false)
	}, (err) => {
		console.log('err ',err)
		Helper.blockUI(false)
	})
}

const getResultSports = (date = new Date()) => (dispatch, getState) => {
	let { resultSports, sort } = getState().auth;
	if(sort == '') sort = 'normal'
	Helper.blockUI(true)
	date = date.setHours(0,0,0, 0)
	apiService.searchMatchResultSport(resultSports, '', moment(date).format('YYYY-MM-DD HH:mm:ss'), sort)
	.then((response) => {
		if(response.data.StatusCode == 0) {
			let data = Helper.makeDataResult(response.data.Data);
			dispatch({
				type: types.GET_RESULTS_SPORTS, 
				payload: {results: data}
			})
		}
		else {
			console.log('err')
		}
		Helper.blockUI(false)
	}, (err) => {
		console.log('err ',err)
		Helper.blockUI(false)
	})
}

const updateResultSports = (key, isLoadResult = true) => (dispatch) => {
	dispatch({
		type: types.UPDATE_RESULT_SPORTS, 
		payload: {resultSports: key}
	})
	if(isLoadResult)
		dispatch(getResultSports());
}

const filterLeagueSports = (key) => (dispatch) => {
	dispatch({
		type: types.FILTER_LEAGUE_SPORTS, 
		payload: {filterLeague: key}
	})
}

const getBetSetting = () => (dispatch) => {
	apiService.getBetSetting()
	.then((response) => {
		if(response.data.StatusCode == 0) {
			let arr = [];
			let obj = [];
			response.data.Data.forEach((item) => {
				if(item.hasOwnProperty('sport')) {
					arr.push(item)
				}
				else {
					obj = item;
				}
			})
			dispatch({
				type: types.GET_BET_SETTING, 
				payload: {betSetting: arr, defaultBetSetting: obj}
			})
		}
		else {
			console.log('err')
		}
	}, (err) => {
		console.log('err ',err)
	})
}

const updateSort = (isSortByTime = '') => (dispatch) => {
	dispatch({
		type: types.UPDATE_SORT, 
		payload: {sort: isSortByTime}
	})
}

const resetResultSportsFilter = () => (dispatch) => {
	dispatch({
		type: types.RESET_RESULT_SPORTS, 
		payload:{results: {}, sort: '', filterLeague: ''}
	})
}

const changePass = (oldPass, newPass) => (dispatch) => {
	// changePassword
	return new Promise((a, b) => {
		Helper.blockUI(true);
		apiService.changePassword([oldPass, newPass])
		.then((response) => {
			if(response.data.StatusCode == 0) {
				Helper.blockUI(false);
				a();
			}
		},(err) => {
			Helper.blockUI(false);
			console.log('err ',err)
		})
	})
} 

const resetUserData = () => (dispatch) => {
	dispatch({
		type: types.RESET_USER_DATA, 
		payload: {
			user: {},  
			betList : [], 
			resultSports: 29, 
			results: {}, 
			isHaveTwoHalf: [29], 
			filterLeague: '', 
			betSetting: [],
			defaultBetSetting: {},  
			sort: '', 
			isNotShowLeague: [], 
			betListMiniStatus: null, 
		}
	})
}

const updateBetListMiniStatus = (status) => (dispatch) => {
	dispatch({
		type: types.UPDATE_BET_LIST_MINI_STATUS, 
		payload: {betListMiniStatus: status}
	})
}

const getTweakOddClient = () => (dispatch) => {
	return new Promise((a, b) => {
		Helper.blockUI(true)
		apiService.getTweakOddClient()
		.then((response) => {
			Helper.blockUI(false)
			if(response.data.StatusCode == 0) {
				dispatch({
					type: types.GET_TWEAK_ODD_CLIENT, 
					payload: {tweakOdd: response.data.Data}
				})
				a();
			}
			else {
				b(response)
			}
		}, (err) => {
			Helper.blockUI(false)
			console.log('err ',err)
			b(err);
		})
	})
}

module.exports = {
	login, 
	refreshInfo, 
	logout, 
	getBetList, 
	getStatement, 
	searchMatchResultSport, 
	getResultSports, 
	updateResultSports, 
	filterLeagueSports, 
	getBetSetting, 
	updateSort, 
	resetResultSportsFilter, 
	changePass, 
	resetUserData, 
	updateBetListMiniStatus, 
	getTweakOddClient, 
}
