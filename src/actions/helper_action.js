import translationObject from '../lang'
let { expireCookies } = config;

const changeTransLate = (countryKey = 'enGB') => (dispatch, getState) => {
	Cookies.set('countryKey', countryKey, { expires: expireCookies });
	dispatch({
		type: types.CHANGE_TRANSLATE, 
		payload: {
			language: translationObject[countryKey], 
			keyTranslate: countryKey, 
		}
	})
}

const changeShowListItemBetMenu = (keyItem, isClickByActiveMenu = false) => (dispatch, getState) => {
	let { sportItemMenu } = getState().helper;
	let newSportItemMenu = JSON.parse(JSON.stringify(sportItemMenu))

	for(let key in newSportItemMenu) {
		if(key != keyItem) {
			newSportItemMenu[key].isActive = false
		}
		else {
			if(isClickByActiveMenu == true)
				newSportItemMenu[key].isActive = false
			else 
				newSportItemMenu[key].isActive = true
		}
	}
	dispatch({
		type: types.CHANGE_LIST_ITEM_BET_MENU, 
		payload: { sportItemMenu: newSportItemMenu }
	})
}

const changeTabLink = (tab) => (dispatch, getState) => {
	let { tabLinkActive } = getState().helper
	if(tabLinkActive != tab) {
		dispatch({
			type: types.CHANGE_TAB_LINK, 
			payload: {tabLinkActive: tab}
		})
	}
}

const changeDropDownValueMenuFilter = (keyDropDown, value) => (dispatch, getState) => {
	let menuFilter = getState().helper.language.menuFilter;
	let findIndex = -1;
	if(Helper.checkObj(menuFilter[keyDropDown])) {
		findIndex = _.findIndex(menuFilter[keyDropDown], (item) => {
			return item.value == value;
		})
		if(findIndex != -1) {
			let obj = {}
			obj[keyDropDown] = findIndex
			dispatch({
				type: types.CHANGE_DROPDOWN_VALUE_MENU_FILTER, 
				payload: obj
			})
		}
	}
}

const changeShowBetPanel = (isShow = false) => (dispatch) => {
	dispatch({
		type: types.CHANGE_SHOW_BET_PANEL, 
		payload: {isShowBetPanel: isShow}
	})
}

const changeTheme = (code = 'default') => (dispatch) => {
	Cookies.set('codeTheme', code, { expires: expireCookies });
	dispatch({
		type: types.CHANGE_THEME, 
		payload: {codeTheme: code}
	})
}

const changeTime = () => (dispatch) => {
	dispatch({
		type: types.CHANGE_TIME, 
		payload: {time: new Date()}
	})
}

const getAllSports = () => (dispatch, getState) => {
	return new Promise((a, b) => {
		apiService.getAllSports()
		.then((response) => {
			if(response.data.StatusCode == 0) {
				let { sportItemMenu } = getState().helper;
				let newSportItemMenu = JSON.parse(JSON.stringify(sportItemMenu))
				response.data.Data.forEach((item, index) => {
					for(let key in newSportItemMenu) {
						if(key.toLowerCase() == item.name.toLowerCase()) {
							newSportItemMenu[key].id = item.sportid;
						}
					}
				})
				
				dispatch({
					type: types.GET_ALL_SPORTS, 
					payload: {sportItemMenu: newSportItemMenu}
				})
				a();
			}
			else {
				b('err')
			}
		}, (err) => {
			console.log('err ',err)
			b(err);
		})
	})
}

const updateTypeOdd = (key) => (dispatch) => {
	dispatch({
		type: types.UDATE_TYPE_ODD, 
		payload: {typeOdd: key}
	})
}

const updateSelectLeague = (list) => (dispatch, getState) => {
	let newList = JSON.parse(JSON.stringify(list))
	dispatch({
		type: types.UPDATE_SELECT_LEAGUE, 
		payload: {isNotShowLeague: newList}
	})
}

const updateIsShowFavorite = (isShow, randomNumber = Math.random()) => (dispatch) => {
	dispatch({
		type: types.UPDATE_IS_SHOW_FAVORITE, 
		payload: { isShowFavorite: isShow, randomNumber: randomNumber }
	})
}

const changePanelActive = (obj) => (dispatch) => {
	dispatch({
		type: types.CHANGE_PANEL_ACTIVE, 
		payload: obj
	})
}

const initChange = () => (dispatch) => {
	let obj = {
		countryKey: Cookies.get('countryKey') || '', 
		OddType: Cookies.get('OddType') || '', 
		oddView: Cookies.get('oddView') || '', 
		defaultStake: Cookies.get('defaultStake') || '', 
		thb: Cookies.get('thb') || '', 
		acceptBetterOdds: Cookies.get('acceptBetterOdds') || '', 
		sortBy: Cookies.get('sortBy') || '', 
	}
	let helperData = {}
	let oddData = {}

	if(Helper.checkData(obj.countryKey)) {
		helperData.keyTranslate = obj.countryKey
	}
	if(Helper.checkData(obj.oddView)) {
		helperData.menuFilterActive = {tableType: parseInt(obj.oddView)}
	}

	if(Helper.checkData(obj.sortBy)) {
		oddData.isSortByLeague = obj.sortBy == 'time' ? false : true
	}
	if(Helper.checkData(obj.OddType)) {
		oddData.oddType = obj.OddType
	}

	dispatch({
		type: types.INIT_HELPER_DATA, 
		payload: helperData
	})

	dispatch({
		type: types.INIT_ODD_DATA, 
		payload: oddData
	})
}

const getSpecialAnnouncement = () => (dispatch) => {
	// let date = '2015-09-01 00:00:00 +07:00';
	apiService.filterSpecialAnnouncement()
	.then((response) => {
		if(response.data.StatusCode == 0) {
			dispatch({
				type: types.GET_SPECIAL_ANNOUNCEMENT, 
				payload: {listSpecialAnnouncement: response.data.Data}
			})
		}
	}, (err) => {
		console.log('err ',err)
	})
}

const resetHelperData = () => (dispatch) => {
	dispatch({
		type: types.RESET_HELPER_DATA, 
		payload: {
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
					icon: 'icon icon-handball', 
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
				palay: {
					icon: 'icon icon-volleyball', 
					listItem: [
						'hdpOu', 
						'mixParlay', 
						'outright', 
					], 
					isActive: false, 
				}, 
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
			isShowBetPanel: false, 
			isShowFavorite: false, 
			randomNumber: Math.random(), 
			listSpecialAnnouncement: [], 
		}
	})
}

module.exports = {
	changeTransLate, 
	changeShowListItemBetMenu, 
	changeTabLink, 
	changeDropDownValueMenuFilter, 
	changeShowBetPanel, 
	changeTheme, 
	changeTime, 
	getAllSports, 
	updateTypeOdd, 
	updateSelectLeague, 
	updateIsShowFavorite, 
	changePanelActive, 
	initChange, 
	getSpecialAnnouncement, 
	resetHelperData, 
}