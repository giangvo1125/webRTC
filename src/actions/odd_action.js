import Data from './data_test'
import Data2 from './data_test2'

import HelperAction from './helper_action'
import userAction from './user_action'
const getDataOdd = (isSortByLeague = true, type = 1) => (dispatch, getState) => {
	Helper.blockUI(true)
	let { 
		helper: {
			tabLinkActive, 
		}, 
		auth: {
			resultSports
		},
	} = getState();
	let getType = 0
	if(tabLinkActive == 'tab_today') {
		getType = 0
	}
	else if(tabLinkActive == 'tab_live') {
		getType = 1
	}
	else if(tabLinkActive == 'tab_early') {
		getType = 2
	}
	apiService.getOddsV2({marketEnum: getType, sportId: resultSports, MarketFilter: 0})
	.then((response) => {
		if(response.data.StatusCode == 0) {
			let data = Helper.makeDataOddV2(response.data.Data, resultSports);
			dispatch(HelperAction.changeTime())
			dispatch(HelperAction.updateIsShowFavorite(false))
			// if(isSortByLeague == true) {
			// 	data.sort((a, b) => {
			// 		return a.Name > b.Name ? 1: a.Name < b.Name ? -1 : 0;
			// 	})
			// }
			let countObj = {}
			countObj[resultSports] = {
				'0': {}
			}
			countObj[resultSports]['0'][getType] = data.count;
			dispatch({
				type: types.GET_DATA_ODD, 
				// payload: {oddData: Helper.makeDataOdd(response.data.Data, tabLinkActive)}
				payload: {oddData: data.returnData, countLineOdds: countObj}
			})
			Helper.blockUI(false)
		}
		else {
			Helper.blockUI(false)
		}
	}, (err) => {
		console.log('err ',err)
		Helper.blockUI(false)
	})
	// let data = {}
	// if(type == 1) {
	// 	data = JSON.parse(JSON.stringify(Data));
	// }
	// else if(type == 2) {
	// 	data = JSON.parse(JSON.stringify(Data2));
	// }
	// dispatch({
	// 			type: types.GET_DATA_ODD, 
	// 			// payload: {oddData: Helper.makeDataOdd(response.data.Data, tabLinkActive)}
	// 			payload: {oddData: Helper.makeDataOddV2(data)}
	// 		})
}

const updateRowData = (key, data) => (dispatch) => {
	let obj = {}
	obj[key] = data;
	dispatch({
		type: types.UPDATE_ODD_ROW_DATA, 
		payload: obj
	})
}

const compareRowData = (keyObj, data) => (dispatch, getState) => {
	let { oddRowData } = getState().odd;
	let oldParseString = JSON.stringify(oddRowData[keyObj])
	let newParseString = JSON.stringify(data);
	if(oddRowData[keyObj] === undefined) {
		dispatch(updateRowData(keyObj, data))
	}
	else {
		if(newParseString != oldParseString) {
			for(let key in data) {
				if(Helper.checkObj(data[key])) {
					let item = data[key];
					for(let k in item) {
						item.keyChange = []
						if(Helper.checkObj(item[k])) {
							for(let n in item[k]) {
								if( Helper.checkObj(item[k][n]) && 
									Helper.checkObj(oddRowData[keyObj]) &&
									Helper.checkObj(oddRowData[keyObj][key]) && 
									Helper.checkObj(oddRowData[keyObj][key][k]) &&
									Helper.checkObj(oddRowData[keyObj][key][k][n]) && 
									Helper.checkData(oddRowData[keyObj][key][k][n].Value
								)) {
									if(item[k][n].Value != oddRowData[keyObj][key][k][n].Value) {
										item[k][n].isChangeValue = true;
										let keyChange = [key, k, n]
										item.keyChange.push(keyChange)
									}
									else {
										if(item[k][n].isChangeValue !== undefined) {
											delete item[k][n]['isChangeValue']
											let keyChange = [key, k, n]
											let index = _.findIndex(item.keyChange, (keyChangeItem) => {
												return JSON.stringify(keyChangeItem) == JSON.stringify(keyChange)
											})
											if(index != -1) 
												item.keyChange.splice(index, 1);
										}
									}
								}
							}
						}
					}
					if(item.keyChange.length == 0)
						delete item['keyChange']
				}
			}
			dispatch(updateRowData(keyObj, data))
		}
		// else {
		// 	dispatch(updateRowData(keyObj, data));
		// }
	}
}

const removeOddData = () => (dispatch) => {
	dispatch({
		type: types.REMOVE_ALL_ODD_DATA, 
		payload:{ oddData: [], oddRowData: {} }
	})
}

const setdataBet = (data) => (dispatch, getState) => {
	data.oddType = getState().odd.oddType;
	dispatch({
		type: types.SET_DATA_BET, 
		payload: {dataBet: data}
	})
}

const getLine = (data, betType='hdp') => (dispatch, getState) => {
	Helper.blockUI(true)
	let {
		auth: {
			resultSports, 
			tweakOdd
		}, 
		helper: {
			language: {
				message: {
					oddChange, 
					unavailableGame, 
				}, 
			}, 
		}, 
		odd: {
			oddType
		}, 
		helper: {
			menuFilterActive: {
				typeOdd
			}
		}
	} = getState();
	let {
		matchKey, 
		period, 
		matchString, 
		teamNumber, 
		// eventId, 
		// leagueId, 
	} = data;
	let obj = {
		SportId: resultSports, 
	}
	const makeDataGetLine = () => {
		let p = new Promise((a, b) => {
			switch(betType) {
				case 'outright':
					obj.EventId = data.Id;
					obj.LeagueId = data.leagueId;
					obj.Line = data.Point;
					obj.Side = data.Side;
					obj.Market = 0;
				break;
				case 'oddEvent':
					obj.EventId = matchKey.substr(0, matchKey.indexOf('-'));
					obj.LeagueId = matchKey.substring(matchKey.indexOf('-') + 1, matchKey.length);
					if(Helper.checkObj(period)) {
						if(Helper.checkData(period.Point)) {
							obj.Line = period.Point;
						}
						else {
							obj.Line = 0
						}
						obj.Side = period.Side + (!isNaN(teamNumber) ? (teamNumber - 1) : 0)
					}
				break;
				case '1x2':
					obj.EventId = matchKey.substr(0, matchKey.indexOf('-'));
					obj.LeagueId = matchKey.substring(matchKey.indexOf('-') + 1, matchKey.length);
					if(Helper.checkObj(period)) {
						if(Helper.checkData(period.Point)) {
							obj.Line = period.Point;
						}
						else {
							obj.Line = 0
						}
						obj.Side = period.Side + (!isNaN(teamNumber) ? (teamNumber - 1) : 0)
					}
					if(matchString != '') {
						obj.Market = 1;
					}
					else {
						obj.Market = 0;
					}
				break;
				case 'doubleChance':
					obj.EventId = matchKey.substr(0, matchKey.indexOf('-'));
					obj.LeagueId = matchKey.substring(matchKey.indexOf('-') + 1, matchKey.length);
					if(Helper.checkObj(period)) {
						if(Helper.checkData(period.Point)) {
							obj.Line = period.Point;
						}
						else {
							obj.Line = 0
						}
						obj.Side = period.Side + (!isNaN(teamNumber) ? (teamNumber - 1) : 0)
					}
					if(matchString != '') {
						obj.Market = 1;
					}
					else {
						obj.Market = 0;
					}
				break;
				case 'correctScore':
					obj.EventId = matchKey.substr(0, matchKey.indexOf('-'));
					obj.LeagueId = matchKey.substring(matchKey.indexOf('-') + 1, matchKey.length);
					if(Helper.checkObj(period)) {
						if(Helper.checkData(period.Point)) {
							obj.Line = period.Point;
						}
						else {
							obj.Line = 0
						}
						obj.Side = period.Side + teamNumber
					}
					if(matchString != '') {
						obj.Market = 1;
					}
					else {
						obj.Market = 0;
					}
				break;
				case 'htft':
					obj.EventId = matchKey.substr(0, matchKey.indexOf('-'));
					obj.LeagueId = matchKey.substring(matchKey.indexOf('-') + 1, matchKey.length);
					if(Helper.checkObj(period)) {
						if(Helper.checkData(period.Point)) {
							obj.Line = period.Point;
						}
						else {
							obj.Line = 0
						}
						obj.Side = period.Side + teamNumber
					}
					if(matchString != '') {
						obj.Market = 1;
					}
					else {
						obj.Market = 0;
					}
				break;
				case 'goal':
					obj.EventId = matchKey.substr(0, matchKey.indexOf('-'));
					obj.LeagueId = matchKey.substring(matchKey.indexOf('-') + 1, matchKey.length);
					if(Helper.checkObj(period)) {
						if(Helper.checkData(period.Point)) {
							obj.Line = period.Point;
						}
						else {
							obj.Line = 0
						}
						obj.Side = period.Side + teamNumber
					}
					if(matchString != '') {
						obj.Market = 1;
					}
					else {
						obj.Market = 0;
					}
				break;
				default:
					obj.EventId = matchKey.substr(0, matchKey.indexOf('-'));
					obj.LeagueId = matchKey.substring(matchKey.indexOf('-') + 1, matchKey.lastIndexOf('-'));
					if(Helper.checkObj(period)) {
						if(Helper.checkData(period.Point)) {
							obj.Line = period.Point;
						}
						else {
							obj.Line = 0
						}
						obj.Side = period.Side + (!isNaN(teamNumber) ? (teamNumber - 1) : 0)
						if(teamNumber == 1) {
							obj.Side = period.Side
						}
						else if(teamNumber == 2) {
							obj.Side = period.Side + 1
							obj.Line = -1 * obj.Line
						}
						else if(teamNumber == 3) {
							obj.Side = period.Side + 2
							obj.Line = 0
						}
					}
					
					if(matchString != '') {
						obj.Market = 1;
					}
					else {
						obj.Market = 0;
					}
				break;
			}
			a(obj)
		});
		return p;
	}
	makeDataGetLine()
	.then((res) => {
		apiService.getLine([res])
		.then((response) => {
			if(response.data.StatusCode == 0) {
				if(betType == 'outright') {
					data = {...data, ...response.data.Data[0]}
					data.keyBet = 'outright';
					data.matchKey = `${data.Id}-${data.leagueId}-0`
					dispatch(setdataBet(data));
					dispatch(HelperAction.changeShowBetPanel(true));
				}
				else if(Helper.isExistedDataInArray['oddEvent', 'doubleChance', 'correctScore', 'htft', 'goal'], betType) {
					data = {...data, ...response.data.Data[0]}
					// data.keyBet = 'outright';
					// data.matchKey = `${data.Id}-${data.leagueId}-0`
					dispatch(setdataBet(data));
					dispatch(HelperAction.changeShowBetPanel(true));
				}
				else {
					if(Helper.checkArray(response.data.Data)) {
						if(data.period.Team1 == response.data.Data[0].OddValue || 
							data.period.Team2 == response.data.Data[0].OddValue || 
							data.period.Draw == response.data.Data[0].OddValue) {
							data = {...data, ...response.data.Data[0]}
							dispatch(setdataBet(data));
							dispatch(HelperAction.changeShowBetPanel(true));
						}
						else {
							alert(`${oddChange}${ Helper._parseOddsEntry({
		                        value: response.data.Data[0].OddValue, 
		                        type: response.data.Data[0].OddType,
		                    }, betType == '1x2' || betType == 'correctScore' || typeOdd == 'mixParlay' ? response.data.Data[0].OddType : oddType, tweakOdd)}`)
							if(betType == '1x2') {
								dispatch(getDoubleChanceOdd())
							}
							else if(betType == 'correctScore') {
								dispatch(getCorrectScoreOdd())
							}
							else if(typeOdd == 'mixParlay') {
								dispatch(getParlayOdd())
							}
							else {
								dispatch(getDataOdd())
							}
						}
					}
				}
				Helper.blockUI(false)
			}
			else if(response.data.StatusCode == 2) {
				alert(unavailableGame);
				Helper.blockUI(false)
			}
			else {
				Helper.blockUI(false)
			}
		}, (err) => {
			console.log('err ',err)
			// Helper.blockUI(false)
		})
	})

	
}

const getMaxMinBetForLeague = () => (dispatch) => {
	apiService.getMaxMinBetForLeague()
	.then((response) => {
		if(response.data.StatusCode == 0) {
			dispatch({
				type: types.GET_MAX_MIN_BET_FOR_LEAGUE, 
				payload: {maxMinBetLeague: response.data.Data}
			})
		}
	}, (err) => {
		console.log('err ',err)
	})
}

const changeOddType = (key, value) => (dispatch) => {
	dispatch({
		type: types.CHANGE_ODD_TYPE, 
		payload: {oddType: value}
	})
}

const placeBet = (Wager = 0, SportId = 29, oddValue, keyBet, listDetails = []) => (dispatch, getState) => {
	return new Promise((a, b) => {
		let { 
			odd:{
				dataBet, 
				oddType, 
			}, 
			helper: {
				language: {
					betList: {
						statusTicket
					}
				},
				menuFilterActive: {
					typeOdd
				}
			}
		} = getState();
		let obj = {
			Details: [],
			SportId: SportId, 
			Wager: Wager, 
		}
		
		// let value = Helper._parseOddsEntry({
	 //        value: dataBet.OddValue, 
	 //        type: dataBet.OddType,
	 //    }, oddType)
	 	let arrayType = ['1x2', 'doubleChance', 'correctScore', 'htft']
	 	let isBetType = !Helper.isExistedDataInArray(arrayType, keyBet)
		dataBet.OddType = isBetType ? oddType : dataBet.OddType
		dataBet.oddType = isBetType ? oddType : dataBet.OddType
		dataBet.OddValue = oddValue
		if(listDetails.length == 0) {
			obj.Details.push(dataBet)
		}
		else if(listDetails.length > 1) {
			obj.Details = listDetails
		}
		Helper.blockUI(true)
		
		apiService.placeBet(obj)
		.then((response) => {
			if(response.data.StatusCode == 0) {
				let string = `${statusTicket[response.data.Data.Status]} !!!`
				dispatch(HelperAction.changeShowBetPanel(false))
				switch(typeOdd) {
					// oddEvenTotalGoal
					// doubleChange
					// correctScore
					// mixParlay
					// outright
					case 'oddEvenTotalGoal':
						dispatch(getOEventOdd())
					break;
					case 'doubleChange':
						dispatch(getDoubleChanceOdd())
					break;
					case 'mixParlay':
						dispatch(getParlayOdd())
					break;
					case 'outright':
						dispatch(getOutRightOdd())
					break;
					default:
						dispatch(getDataOdd())
					break;
				}
				
				alert(string)
				dispatch({
					type: types.PLACE_BET, 
					payload: {dataBet: {}, Wager: 0}
				})
				Helper.blockUI(false)
				a();
			}
			else {
				Helper.blockUI(false)
			}
		}, (err) => {
			console.log('err ',err)
			Helper.blockUI(false)
		})
	})
}

const setWager = (Wager) => (dispatch) => {
	dispatch({
		type: types.SET_WAGER, 
		payload: {Wager: Wager}
	})
}

const getOutRightOdd = () => (dispatch, getState) => {
	Helper.blockUI(true)
	let { 
		// helper: {
		// 	tabLinkActive, 
		// }, 
		auth: {
			resultSports
		}
	} = getState();
	apiService.getOddsV2({sportId: resultSports, MarketFilter: 2})
	.then((response) => {
		if(response.data.StatusCode == 0) {
			let dataOdd = Helper.makeOutRightOdds(response.data.Data, resultSports)
			// if(isSortByLeague == true) {
			// 	data.sort((a, b) => {
			// 		return a.Name > b.Name ? 1: a.Name < b.Name ? -1 : 0;
			// 	})
			// }
			dispatch({
				type: types.GET_OUTRIGHT_ODD, 
				payload: {outRightOdd: dataOdd, oddType: 2}
			})
			dispatch(HelperAction.changeTime())
			dispatch(HelperAction.updateIsShowFavorite(false))
			Helper.blockUI(false)
		}
		else {
			Helper.blockUI(false)
		}
	}, (err) => {
		console.log('err ',err)
		Helper.blockUI(false)
	})
}

const updateSortLeague = (value) => (dispatch) => {
	dispatch({
		type: types.UPDATE_SORT_LEAGUE, 
		payload: {isSortByLeague: value}
	})
}

const getAllSportsLineOdds = () => (dispatch) => {
	apiService.getAllSportsLineOdds()
	.then((response) => {
		if(response.data.StatusCode == 0) {
			// let data = Helper.makeCountLineOdds(response.data.Data)
			dispatch({
				type: types.GET_ALL_SPORT_LINE_ODDS, 
				payload: {countLineOdds: response.data.Data}
			})
		}
	},(err) => {
		console.log('err ',err)
	})
}

const getOEventOdd = () => (dispatch, getState) => {
	Helper.blockUI(true)
	let { 
		// helper: {
		// 	tabLinkActive, 
		// }, 
		auth: {
			resultSports
		}
	} = getState();
	apiService.getOddsV2({sportId: resultSports, MarketFilter: 3})
	.then((response) => {
		if(response.data.StatusCode == 0) {
			dispatch(HelperAction.changeTime())
			dispatch(HelperAction.updateIsShowFavorite(false))
			let dataOdd = Helper.makeOEventOdds(response.data.Data, resultSports)
			dispatch({
				type: types.GET_OEVENT_ODD, 
				payload: {oEventOdd: dataOdd}
			})
			
			Helper.blockUI(false)
		}
		else {
			Helper.blockUI(false)
		}
	}, (err) => {
		console.log('err ',err)
		Helper.blockUI(false)
	})
}

const resetOddData = () => (dispatch) => {
	dispatch({
		type: types.RESET_ODD_DATA, 
		payload: {
			oddData: [], 
			oddRowData: {}, 
			dataBet: {}, 
			betSetting: [], 
			oddType: 1, 
			Wager: 0, 
			listKeyChange: [], 
			maxMinBetLeague: [], 
			outRightOdd: [], 
			isSortByLeague: false, 
			countLineOdds: {}, 
			oEventOdd: [], 
			DCOdd: [], 
			parlayOdd: [], 
			correctScoreOdd: [], 
			HTFTOdd: [], 
			goalOdd: [], 
		}
	})
}

const getDoubleChanceOdd = () => (dispatch, getState) => {
	Helper.blockUI(true)
	let { 
		// helper: {
		// 	tabLinkActive, 
		// }, 
		auth: {
			resultSports
		}
	} = getState();
	apiService.getOddsV2({sportId: resultSports, MarketFilter: 4})
	.then((response) => {
		if(response.data.StatusCode == 0) {
			dispatch(HelperAction.changeTime())
			dispatch(HelperAction.updateIsShowFavorite(false))
			let dataOdd = Helper.makeDoubleChanceOdds(response.data.Data, resultSports)
			dispatch({
				type: types.GET_DOUBLE_CHANCE_ODD, 
				payload: {DCOdd: dataOdd, oddType: 2}
			})
			Helper.blockUI(false)
		}
		else {
			Helper.blockUI(false)
		}
	}, (err) => {
		console.log('err ',err)
		Helper.blockUI(false)
	})
}

const getParlayOdd = () => (dispatch, getState) => {
	Helper.blockUI(true)
	let { 
		auth: {
			resultSports
		}
	} = getState();
	apiService.getOddsV2({sportId: resultSports, MarketFilter: 1})
	.then((response) => {
		if(response.data.StatusCode == 0) {
			dispatch(HelperAction.changeTime())
			dispatch(HelperAction.updateIsShowFavorite(false))
			let data = Helper.makeDataOddV2(response.data.Data, resultSports);
			dispatch({
				type: types.GET_PARLAY_ODD, 
				payload: {parlayOdd: data.returnData,  oddType: 2}
			})
			Helper.blockUI(false)
		}
		else {
			Helper.blockUI(false)
		}
	}, (err) => {
		console.log('err ',err)
		Helper.blockUI(false)
	})
}

const getCorrectScoreOdd = () => (dispatch, getState) => {
	Helper.blockUI(true)
	let { 
		auth: {
			resultSports
		}
	} = getState();
	apiService.getOddsV2({sportId: resultSports, MarketFilter: 5})
	.then((response) => {
		if(response.data.StatusCode == 0) {
			dispatch(HelperAction.changeTime())
			dispatch(HelperAction.updateIsShowFavorite(false))
			let data = Helper.makeDataCorrectScore(response.data.Data, resultSports);
			dispatch({
				type: types.GET_CORRECT_SCORE_ODD, 
				payload: {correctScoreOdd: data, oddType: 2}
			})
			Helper.blockUI(false)
		}
		else {
			Helper.blockUI(false)
		}
	}, (err) => {
		console.log('err ',err)
		Helper.blockUI(false)
	})
}

const getHTFTOdd = () => (dispatch, getState) => {
	Helper.blockUI(true)
	let { 
		auth: {
			resultSports
		}
	} = getState();
	apiService.getOddsV2({sportId: resultSports, MarketFilter: 6})
	.then((response) => {
		if(response.data.StatusCode == 0) {
			dispatch(HelperAction.changeTime())
			dispatch(HelperAction.updateIsShowFavorite(false))
			let data = Helper.makeDataHTFT(response.data.Data, resultSports);
			dispatch({
				type: types.GET_HALF_TIME_FULL_TIME_ODD,  
				payload: {HTFTOdd: data, oddType: 2}
			})
			Helper.blockUI(false)
		}
		else {
			Helper.blockUI(false)
		}
	}, (err) => {
		console.log('err ',err)
		Helper.blockUI(false)
	})
}

const getGoalOdd = () => (dispatch, getState) => {
	Helper.blockUI(true)
	let { 
		auth: {
			resultSports
		}
	} = getState();
	apiService.getOddsV2({sportId: resultSports, MarketFilter: 7})
	.then((response) => {
		if(response.data.StatusCode == 0) {
			dispatch(HelperAction.changeTime())
			dispatch(HelperAction.updateIsShowFavorite(false))
			let data = Helper.makeDataGoal(response.data.Data, resultSports);
			dispatch({
				type: types.GET_GOAL_ODD,  
				payload: {goalOdd: data, oddType: 2}
			})
			Helper.blockUI(false)
		}
		else {
			Helper.blockUI(false)
		}
	}, (err) => {
		console.log('err ',err)
		Helper.blockUI(false)
	})
}

module.exports = {
	getDataOdd, 
	updateRowData, 
	compareRowData, 
	removeOddData, 
	setdataBet, 
	getLine, 
	getMaxMinBetForLeague, 
	changeOddType, 
	placeBet, 
	setWager, 
	getOutRightOdd, 
	updateSortLeague, 
	getAllSportsLineOdds, 
	getOEventOdd, 
	resetOddData, 
	getDoubleChanceOdd, 
	getParlayOdd, 
	getCorrectScoreOdd, 
	getHTFTOdd, 
	getGoalOdd, 
}
