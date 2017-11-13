const initState = {
	oddData: [], 
	oddRowData: {}, 
	dataBet: {}, 
	betSetting: [], 
	oddType: 1, 
	Wager: 0, 
	maxMinBetLeague: [], 
	outRightOdd: [], 
	isSortByLeague: true, 
	countLineOdds: {}, 
	oEventOdd: [], 
	DCOdd: [], 
	parlayOdd: [], 
	correctScoreOdd: [], 
	HTFTOdd: [], 
	goalOdd: [], 
}

function oddReducer(state = initState, action) {
	switch(action.type) {
		case types.GET_DATA_ODD:
			let item = action.payload.countLineOdds;
			for(let key in item) {
				if(typeof item[key] === 'object') {
					for(let key2 in item[key]) {
						if(typeof item[key][key2] === 'object') {
							for(let key3 in item[key][key2][key3]) {
								state.countLineOdds[key][key2][key3] = item[key][key2][key3]
							}
						}
						else {
							state.countLineOdds[key][key2] = item[key][key2]
						}
					}
				}
				else {
					state.countLineOdds[key] = item[key]
				}
			}
			return {
				...state, 
				oddData: action.payload.oddData, 
				// countLineOdds: {...state.countLineOdds, ...action.payload.countLineOdds}
			}
		case types.UPDATE_ODD_ROW_DATA:
			return {
				...state, 
				oddRowData: {
					...state.oddRowData, 
					...action.payload,
				}
			}
		case types.REMOVE_ALL_ODD_DATA:
			return {...state, ...action.payload}
		case types.SET_DATA_BET:
			return {...state, ...action.payload}
		case types.CHANGE_ODD_TYPE: 
			return {...state, ...action.payload}
		case types.PLACE_BET:
			return {...state, ...action.payload}
		case types.SET_WAGER:
			return {...state, ...action.payload}
		case types.SET_LIST_KEY_CHANGE:
			return {...state, ...action.payload}
		case types.GET_MAX_MIN_BET_FOR_LEAGUE:
			return {...state, ...action.payload}
		case types.GET_OUTRIGHT_ODD:
			return {...state, ...action.payload}
		case types.UPDATE_SORT_LEAGUE:
			return {...state, ...action.payload}
		case types.GET_ALL_SPORT_LINE_ODDS:
			return {...state, ...action.payload}
		case types.INIT_ODD_DATA:
			return {...state, ...action.payload}
		case types.GET_OEVENT_ODD:
			return {...state, ...action.payload}
		case types.RESET_ODD_DATA:
			return {...state, ...action.payload}
		case types.GET_DOUBLE_CHANCE_ODD:
			return {...state, ...action.payload}
		case types.GET_PARLAY_ODD: 
			return {...state, ...action.payload}
		case types.GET_CORRECT_SCORE_ODD:
			return {...state, ...action.payload}
		case types.GET_HALF_TIME_FULL_TIME_ODD:
			return {...state, ...action.payload}
		case types.GET_GOAL_ODD:
			return {...state, ...action.payload}
		default:
			return state;

	}
	return state;
}

module.exports = oddReducer;
