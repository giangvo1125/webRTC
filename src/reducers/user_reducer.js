const initState = {
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
	betListMiniStatus: null, //1: accepted(running) 2: waiting (default)  14: reject
	tweakOdd: 5, 
}

function authReducer(state = initState, action) {
	switch(action.type) {
		case types.LOGIN_USER:
			return {...state, ...action.payload}
		case types.REFRESH_INFO:
			return {...state, ...action.payload}
		case types.LOGOUT_USER:
			return {...state, ...action.payload}
		case types.GET_BET_LIST:
			return {...state, ...action.payload}
		case types.GET_STATEMENT:
			return {...state, ...action.payload}
		case types.GET_RESULTS_SPORTS:
			return {...state, ...action.payload}
		case types.UPDATE_RESULT_SPORTS:
			return {...state, ...action.payload}
		case types.FILTER_LEAGUE:
			return {...state, ...action.payload}
		case types.FILTER_LEAGUE_SPORTS:
			return {...state, ...action.payload}
		case types.GET_BET_SETTING:
			return {...state, ...action.payload}
		case types.UPDATE_SORT:
			return {...state, ...action.payload}
		case types.RESET_RESULT_SPORTS:
			return {...state, ...action.payload}
		case types.UPDATE_SELECT_LEAGUE:
			return {...state, ...action.payload}
		case types.RESET_USER_DATA:
			return {...state, ...action.payload}
		case types.UPDATE_BET_LIST_MINI_STATUS:
			return {...state, ...action.payload}
		case types.GET_TWEAK_ODD_CLIENT:
			return {...state, ...action.payload}
		default:
			return state;

	}
	return state;
}

module.exports = authReducer;
