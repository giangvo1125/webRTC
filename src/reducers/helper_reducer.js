const initState = {
	language: {}, 
	listTranslateLanguage: [
		{label: 'ENGLISH', key: 'enGB', class: 'EN'}, 
		// {label: 'Tiếng Việt', key: 'viVN', class: 'VN'}, 
		{label: 'ไทย', key: 'thTh', class: 'TH'}, 
	], 
	keyTranslate: 'enGB', 
	mainMenuActive: {
		favorite: {
			isActive: false
		}, 
		fundTransfer: {
			isActive: false
		}, 
		sportMenu: {
			isActive: true
		}, 
		statusBet: {
			isActive: true
		}, 
	}, 
	sportItemMenu: {
		soccer: {
			icon: 'icon icon-soccer', 
			listItem: [
				'hdpOu', 
				'oddEvenTotalGoal', 
				'doubleChange', 
				'correctScore', 
				'htft', 
				'goal', 
				'mixParlay', 
				'outright', 
			], 
			isActive: false, 
		}, 
		basketball: {
			icon: 'icon icon-basketball', 
			listItem: [
				'hdpOu', 
				'mixParlay', 
				'outright', 
			], 
			isActive: false, 
		}, 
		tennis: {
			icon: 'icon icon-tennis', 
			listItem: [
				'hdpOu', 
				'mixParlay', 
				'outright', 
			], 
			isActive: false, 
		}, 
		hockey: {
			icon: 'icon icon-ice', 
			listItem: [
				'hdpOu', 
				'mixParlay', 
				'outright', 
			], 
			isActive: false, 
		}, 
		baseball: {
			icon: 'icon icon-baseball', 
			listItem: [
				'hdpOu', 
				'mixParlay', 
				'outright', 
			], 
			isActive: false, 
		}, 
		football: {
			icon: 'icon icon-football', 
			listItem: [
				'hdpOu', 
				'mixParlay', 
				'outright', 
			], 
			isActive: false, 
		}, 
		volleyball: {
			icon: 'icon icon-volleyball', 
			listItem: [
				'hdpOu', 
				'mixParlay', 
				'outright', 
			], 
			isActive: false, 
		}, 
		// palay: {
		// 	icon: 'icon icon-volleyball', 
		// 	listItem: [
		// 		'hdpOu', 
		// 		'mixParlay', 
		// 		'outright', 
		// 	], 
		// 	isActive: false, 
		// }, 
		'e sports': {
			icon: 'icon icon-esport', 
			listItem: [
				'hdpOu', 
				'mixParlay', 
				'outright', 
			], 
			isActive: false, 
		}, 
		badminton: {
			icon: 'icon icon-badminton', 
			listItem: [
				'hdpOu', 
				'mixParlay', 
				'outright', 
			], 
			isActive: false, 
		}, 
	}, 
	tabLinkActive: 'tab_today', 
	menuFilterActive: {
		tableType: 0, 
		currency: 0, 
		typeOdd: 'hdpOu', 
	}, 
	isShowBetPanel: false, 
	codeTheme: 'Blue',  
	listTheme: ['Blue', 'Default'], 
	oddTypeList: [
		{value: 1, label: 'MY'}, 
		// {value: 4, label: 'HK'}, 
		{value: 3, label: 'ID'}, 
		{value: 2, label: 'EU'}, 
		{value: 0, label: 'US'}, 
	], 
	time: new Date(), 
	isShowFavorite: false, 
	randomNumber: Math.random(), 
	oddViewList: [
		{value: 0, label: 'single'}, 
		{value: 1, label: 'double'}, 
	], 
	listSpecialAnnouncement: [], 
}

function helperReducer(state = initState, action) {
	switch(action.type) {
		case types.CHANGE_TRANSLATE: 
			return {...state, ...action.payload}
		case types.CHANGE_LIST_ITEM_BET_MENU:
			return {...state, ...action.payload}
		case types.CHANGE_TAB_LINK:
			return {...state, ...action.payload}
		case types.CHANGE_DROPDOWN_VALUE_MENU_FILTER:
			return {
				...state, 
				menuFilterActive: {
					...state.menuFilterActive, 
					...action.payload
				}
			}
		case types.CHANGE_SHOW_BET_PANEL: 
			return {...state, ...action.payload}
		case types.CHANGE_THEME: 
			return {...state, ...action.payload}
		case types.CHANGE_TIME:
			return {...state, ...action.payload}
		case types.GET_ALL_SPORTS:
			return {...state, ...action.payload}
		case types.UDATE_TYPE_ODD:
			return {
				...state, 
				menuFilterActive: {
					...state.menuFilterActive, 
					...action.payload, 
				}
			}
		case types.UPDATE_IS_SHOW_FAVORITE:
			return {...state, ...action.payload}
		case types.CHANGE_PANEL_ACTIVE: 
			return {
				...state, 
				mainMenuActive: {
					...state.mainMenuActive, 
					...action.payload
				}
			}
		case types.INIT_HELPER_DATA:
			return {...state, ...action.payload}
		case types.GET_SPECIAL_ANNOUNCEMENT:
			return {...state, ...action.payload}
		case types.RESET_HELPER_DATA:
			return {...state, ...action.payload}
		default:
			return state;

	}
	return state;
}

module.exports = helperReducer;
