import { createSelector } from 'reselect'

const sportMenuPanelSelector = (state) => state.helper.language.sportMenuPanel

const sportItemMenuSelector = (state) => state.helper.sportItemMenu

const menuFilterSelector = (state) => state.helper.language.menuFilter

const oddDataSelector = (state) => state.odd.oddData

const tabLinkSelector = (state) => state.helper.tabLinkActive

const maxMinBetLeagueSelector = (state) => state.odd.maxMinBetLeague

const defaultBetSettingSelector = (state) => state.auth.defaultBetSetting

const betSettingSelector = (state) => state.auth.betSetting

const oddTypeSelector = (state) => state.odd.oddType

const dataBetSelector = (state) => state.odd.dataBet

const isNotShowLeagueSelector = (state) => state.auth.isNotShowLeague

const resultSportsSelector = (state) => state.auth.resultSports

const isShowFavoriteSelector = (state) => state.helper.isShowFavorite

const isSortByLeagueSelector = (state) => state.odd.isSortByLeague

const countLineOddsSelector = (state) => state.odd.countLineOdds

const outRightOddSelector = (state) => state.odd.outRightOdd

const randomNumberSelector = (state) => state.helper.randomNumber

const betListSelector = (state) => state.auth.betList

const betListMiniStatusSelector = (state) => state.auth.betListMiniStatus

const oEventOddDataSelector = (state) => state.odd.oEventOdd

const DCOddDataSelector = (state) => state.odd.DCOdd

const menuFilterActiveSelector = (state) => state.helper.menuFilterActive

const parlayOddSelector = (state) => state.odd.parlayOdd

const correctScoreOddSelector = (state) => state.odd.correctScoreOdd

const HTFTOddSelector = (state) => state.odd.HTFTOdd

const goalOddSelector = (state) => state.odd.goalOdd

export const getObjListSportMenu = createSelector(
	sportMenuPanelSelector, 
	sportItemMenuSelector, 
	countLineOddsSelector,
	resultSportsSelector, 
	tabLinkSelector, 
	(label, list, countLines, sportId, tabLinkActive) => {
		let selector = [];
		let type = 0 // today
		if(tabLinkActive == 'tab_live') {
			type = 1
		}
		else if(tabLinkActive == 'tab_early') {
			type = 2
		}
		for(let key in list) {
			let obj = {
				key: key, 
				isActive: list[key].isActive, 
				icon: list[key].icon, 
				label: label[key], 
				id: list[key].id, 
				number: 0, 
				isShowLivePanel: false, 
			}
			if(list[key].id) {
				for(let marketFiler in countLines[list[key].id]) {
					let value = countLines[list[key].id][marketFiler][type];
					obj.number+= !isNaN(value) ? value : 0;
					//check is have Live match
					if(countLines[list[key].id][marketFiler]['1']) {
						obj.isShowLivePanel = true;
					}
					//end check
				}
			}

			obj.listItem = []
			list[key].listItem.forEach((i) => {
				let childObj = {}
				childObj.label = label[i]
				childObj.key = i
				// childObj.number = Math.floor(Math.random() * 1000) + 1 
				childObj.isActive = true // set neu co data tuong ung thi moi = true
				let marketFiler = null;
				switch(i) {
					case 'hdpOu':
						marketFiler = 0;
					break;
					case 'oddEvenTotalGoal':
						marketFiler = 3;
					break;
					case 'doubleChange':
						marketFiler = 4;
					break;
					case 'correctScore':
						marketFiler = 5;
					break;
					case 'htft':
						marketFiler = 6;
					break;
					case 'goal':
						marketFiler = 7;
					break;
					case 'mixParlay':
						marketFiler = 1;
					break;
					case 'outright':
						marketFiler = 2;
					break;
				}
				let value = 0;
				if(Helper.checkObj(countLines) && 
					Helper.checkObj(countLines[list[key].id]) && 
					Helper.checkObj(countLines[list[key].id][marketFiler]) &&
					marketFiler != null) {
					value = countLines[list[key].id][marketFiler][type];
				}
				childObj.number = !isNaN(value) ? value : 0;
				obj.listItem.push(childObj)
			})
			selector.push(obj)
		}
		return selector;
	}
)

export const getValueMenuFilterActive = createSelector (
	menuFilterSelector, 
	(menu) => {
		let selector = {}
		for(let key in menu) {
			let item = menu[key]
			if(Helper.checkArray(item)) {
				selector[key] = -1;
				item.forEach((i) => {
					if(i.active == true) {
						selector[key] = i.value;
					}
				})
			}
		}
		return selector;
	}
)

export const getOddDataByTabLink = createSelector (
	oddDataSelector, 
	tabLinkSelector, 
	oddTypeSelector, 
	(oddData, tabLink, oddType) => {
		let selector = [];
	    if(Helper.checkArray(oddData)) {
	    	Helper.blockUI(true);
	        oddData.map((item) => {
	            let obj = {
	                Id: item.Id, 
	                Name: item.Name, 
	                Matches: [], 
	            };
	            item.Matches.map((match) => {
	                let objMatch = {
	                    Id: match.Id, 
	                    Start: match.Start, 
	                    Status: match.Status, 
	                    Team1: match.Team1, 
	                    Team2: match.Team2, 
	                    Periods: []
	                }
	                if(Helper.checkData(match.Team1Score)) {
	                	objMatch.Team1Score = match.Team1Score
	                }
	                if(Helper.checkData(match.Team2Score)) {
	                	objMatch.Team2Score = match.Team2Score
	                }
	                if(Helper.checkObj(match.TimeLive)) {
	                	objMatch.TimeLive = match.TimeLive
	                }
	                let arrayLength = [1]
	                if(match.firstTime !== null) {
	                    if(Helper.checkArray(match.firstTime.Spreads.lines))
	                        arrayLength.push(match.firstTime.Spreads.lines.length)
	                    if(Helper.checkArray(match.firstTime.Totals.lines))
	                        arrayLength.push(match.firstTime.Totals.lines.length)
	                }
	                if(match.fullTime !== null) {
	                    if(Helper.checkArray(match.fullTime.Spreads.lines))
	                        arrayLength.push(match.fullTime.Spreads.lines.length)
	                    if(Helper.checkArray(match.fullTime.Totals.lines))
	                        arrayLength.push(match.fullTime.Totals.lines.length)
	                }
	                arrayLength.sort();
	                let length = arrayLength[arrayLength.length - 1];
	                for(let i = 0; i < length; i++) {
	                    let objPeriod = {
	                        fullTime: {}, 
	                        firstTime: {}, 
	                    };
	                    if(i == 0) {
	                        if(Helper.checkObj(match.Periods[0]) && Helper.checkObj(match.Periods[0].MoneyLine)) {
	                        	
	                            objPeriod.fullTime.MoneyLine = match.Periods[0].MoneyLine;
	                        }
	                        if(Helper.checkObj(match.Periods[1]) && Helper.checkObj(match.Periods[1].MoneyLine)) {
	                        	
	                            objPeriod.firstTime.MoneyLine = match.Periods[1].MoneyLine;
	                        }
	                    }
	                    if(Helper.checkObj(match.Periods[0])) {
	                        if(Helper.checkArray(match.Periods[0].Spreads) && Helper.checkObj(match.Periods[0].Spreads[i])) {
	                        	
	                            objPeriod.fullTime.Spreads = match.Periods[0].Spreads[i];
	                        }
	                        if(Helper.checkArray(match.Periods[0].Totals) && Helper.checkObj(match.Periods[0].Totals[i])) {
	                        	
	                            objPeriod.fullTime.Totals = match.Periods[0].Totals[i];
	                        }
	                    }
	                    if(Helper.checkObj(match.Periods[1])) {
	                        if(Helper.checkArray(match.Periods[1].Spreads) && Helper.checkObj(match.Periods[1].Spreads[i])) {
	                        	
	                            objPeriod.firstTime.Spreads = match.Periods[1].Spreads[i];
	                        }
	                        if(Helper.checkArray(match.Periods[1].Totals) && Helper.checkObj(match.Periods[1].Totals[i])) {
	                        	
	                            objPeriod.firstTime.Totals = match.Periods[1].Totals[i];
	                        }
	                    }
	                    objMatch.Periods.push(objPeriod);
	                }
	                obj.Matches.push(objMatch)
	            })
	            if(Helper.checkArray(obj.Matches)) {
	            	let newObj = JSON.parse(JSON.stringify(obj))
	                selector.push(newObj);
	            }
	        })
			Helper.blockUI(false);
	    }
	    return selector;
	}
)

export const getMinMaxBet = createSelector(
	dataBetSelector, 
	maxMinBetLeagueSelector,
	betSettingSelector, 
	defaultBetSettingSelector, 
	(data, leagues, types, defaultObj) => {
		let selector = {};
		selector = defaultObj;
		types.forEach((item) => {
			if(item.sport.sportid == data.SportId) {
				selector = item;
			}
		})
		leagues.forEach((league) => {
			if(league.sport.sportid == data.SportId) {
				// selector = item;
				if(Helper.checkTrueData(league.leagueid, data.LeagueId)) {
					selector = league;
				}
			}
		})

		return selector;
	}
)

export const getLeagueNameList = createSelector(
	oddDataSelector, 
	outRightOddSelector, 
	oEventOddDataSelector, 
	DCOddDataSelector, 
	parlayOddSelector, 
	correctScoreOddSelector, 
	HTFTOddSelector, 
	goalOddSelector, 
	menuFilterActiveSelector, 
	isNotShowLeagueSelector, 
	(normalOdd, outrightOdd, oEvenOdd, dcOdd, parlayOdd, correctOdd, htftOdd, goalOdd, menuFilterActive, listNotShow) => {
		let selector = []
		let data = []
		switch(menuFilterActive.typeOdd) {
			case 'oddEvenTotalGoal':
				data = oEvenOdd; 
			break;
			case 'doubleChange':
				data = dcOdd;
			break;
			case 'correctScore':
				data = correctOdd;
			break;
			case 'htft':
				data = htftOdd;
			break;
			case 'goal':
				data = goalOdd
			break;
			case 'mixParlay':
				data = parlayOdd;
			break;
			case 'outright':
				data = outrightOdd;
			break;
			default:
				data = normalOdd; 
			break;
		}
		if(Helper.checkArray(data)) {
			for(let i = 0; i < data.length; i++) {
				let obj = {
					Id: data[i].leagueId, 
					Name: data[i].leagueName, 
					isActive: true, 
				}
				let findItem = _.findIndex(listNotShow, (n) => {
					return n == data[i].leagueId
				})
				if(findItem != -1) {
					obj.isActive = false;
				}
				let findExisted = _.findIndex(selector, (n) => {
					return n.Id == data[i].leagueId;
				})
				if(findExisted == -1){
					selector.push(obj)
				}
			}
		}
		return selector;
	}
)

export const filterLeague = createSelector(
	oddDataSelector, 
	isNotShowLeagueSelector, 
	resultSportsSelector,
	isShowFavoriteSelector, 
	randomNumberSelector, //them random de no co the goi lai dc function ma ko can get odds lai
	parlayOddSelector, 
	menuFilterActiveSelector, 
	(odd, list, sportId, isShowFavorite, random, parlayOdd, menuFilterActive) => {
		let selector = []
		let data;
		if(menuFilterActive.typeOdd == "mixParlay") {
			data = JSON.parse(JSON.stringify(parlayOdd))
		}
		else {
			data = JSON.parse(JSON.stringify(odd))
		}
		if(Helper.checkArray(data)) {
			let favoriteMatch = Cookies.get('favoriteMatch')
			let arrayMatchId = []
			if(isShowFavorite == true) {
				if(favoriteMatch != null) {
					let obj = JSON.parse(favoriteMatch);
					if(Helper.checkArray(obj[sportId])) {
						arrayMatchId = obj[sportId]
					}
				}
			}
			//favoriteMatch & notShowLeague
			let newMatches = []
			for(let i = 0; i < data.length; i++) {
				let matchIndex = _.findIndex(arrayMatchId, (n) => {
					return n == data[i].Id;
				})
				let leagueIndex = _.findIndex(list, (n) => {
					return n == data[i].leagueId;
				})
				if(leagueIndex == -1) {
					if(isShowFavorite == true) {
						if(matchIndex != -1)
							newMatches.push(data[i])
					}
					else {
						newMatches.push(data[i])
					}
				}
			}
			if(newMatches.length > 0)
				selector = newMatches
			//endFavoriteMatch
		}
		return selector;
	}
)

// export const filter

export const sortLeague = createSelector(
	filterLeague, 
	isSortByLeagueSelector, 
	resultSportsSelector, 
	(listFilter, isSortByLeague, sportId) => {
		let selector = [];
		if(Helper.checkArray(listFilter)) {
			Helper.blockUI(true)
			let list = []
			let matches = JSON.parse(JSON.stringify(listFilter))
			if(isSortByLeague == false) {
				matches.sort((a, b) => {
					return new Date(a.Start) - new Date(b.Start);
				})
				for(let n = 0; n < matches.length; n++) {
					let match = matches[n]
					let findIndex = _.findIndex(list, (i) => {
						return i.Id == match.leagueId && moment(i.matches[0].Start).format('MM/DD/YYYY HH:mm') == moment(match.Start).format('MM/DD/YYYY HH:mm');
					})
					if(findIndex == -1) {
						let findLastIndex = _.findLastIndex(list, (i) => {
							return i.Id == match.leagueId && moment(i.matches[0].Start).format('MM/DD/YYYY HH:mm') <= moment(match.Start).format('MM/DD/YYYY HH:mm');
						})
						if(findLastIndex != -1 && list.length == (findLastIndex + 1)) {
							list[findLastIndex].matches.push(match)
						}
						else {
							list.push({
								Id: match.leagueId, 
								Name: match.leagueName, 
								matches: [match]
							})
						}
					}
					else {
						list[findIndex].matches.push(match)
					}
				}
			}
			else {
				let sortLevel = Helper.sortArray[sportId]
				for(let n = 0; n < matches.length; n++) {
					let match = matches[n];
					let findIndex = _.findIndex(list, (i) => {
						return i.Id == match.leagueId;
					})
					if(findIndex == -1) {
						let objLeague = {
							Id: match.leagueId, 
							Name: match.leagueName, 
							matches: [match]
						}
						for(let key in match) {
							if(key.indexOf('level') != -1)
								objLeague[key] = match[key]
						}
						list.push(objLeague)
					}
					else {
						list[findIndex].matches.push(match)
					}
				}
				// list.sort((a, b) => {
				// 	return a.Name > b.Name ? 1: a.Name < b.Name ? -1 : 0;
				// })
				list = _.sortBy(list, ['level1', 'level2', 'Name'])
			}
			selector = list;
			Helper.blockUI(false)
		}
		return selector;
	}
)

export const sortOutRightOdds = createSelector(
	outRightOddSelector, 
	(data) => {
		let selector = [];
		if(Helper.checkArray(data)) {
			data = _.sortBy(data, ['level1', 'level2', 'Name'])
			for(let i = 0; i < data.length; i++) {
				let league = data[i]
				league.matches.sort((a, b) => {
					return a.Value > b.Value ? 1: a.Value < b.Value ? -1 : 0;
				})
			}
			selector = data
		}
		return selector;
	}
)

export const getDataForStatusBetPanel = createSelector(
	betListSelector, 
	betListMiniStatusSelector, 
	(data, status) => {
		let selector = [];
		if(Helper.checkArray(data)) {
			data.forEach((item) => {
				if(status != null) {
					let details = item.details[0];
					if(details.status == status) {
						selector.push(item)
					}
				}
			})
		}
		selector.sort((a, b) => {
			return new Date(b.bettime) - new Date(a.bettime);
		})
		return selector;
	}
)

export const filterOeLeague = createSelector(
	oEventOddDataSelector, 
	isNotShowLeagueSelector, 
	resultSportsSelector,
	isShowFavoriteSelector, 
	randomNumberSelector, //them random de no co the goi lai dc function ma ko can get odds lai
	(odd, list, sportId, isShowFavorite, random) => {
		let selector = []
		let data = JSON.parse(JSON.stringify(odd))
		if(Helper.checkArray(data)) {
			let favoriteMatch = Cookies.get('favoriteMatch')
			let arrayMatchId = []
			if(isShowFavorite == true) {
				if(favoriteMatch != null) {
					let obj = JSON.parse(favoriteMatch);
					if(Helper.checkArray(obj[sportId])) {
						arrayMatchId = obj[sportId]
					}
				}
			}
			//favoriteMatch & notShowLeague
			let newMatches = []
			for(let i = 0; i < data.length; i++) {
				let matchIndex = _.findIndex(arrayMatchId, (n) => {
					return n == data[i].Id;
				})
				let leagueIndex = _.findIndex(list, (n) => {
					return n == data[i].leagueId;
				})
				if(leagueIndex == -1) {
					if(isShowFavorite == true) {
						if(matchIndex != -1)
							newMatches.push(data[i])
					}
					else {
						newMatches.push(data[i])
					}
				}
			}
			if(newMatches.length > 0)
				selector = newMatches
			//endFavoriteMatch
		}
		return selector;
	}
)

export const sortOeLeague = createSelector(
	filterOeLeague, 
	isSortByLeagueSelector, 
	(listFilter, isSortByLeague) => {
		let selector = [];
		if(Helper.checkArray(listFilter)) {
			Helper.blockUI(true)
			let list = []
			let matches = JSON.parse(JSON.stringify(listFilter))
			if(isSortByLeague == false) {
				matches.sort((a, b) => {
					return new Date(a.Start) - new Date(b.Start);
				})
				for(let n = 0; n < matches.length; n++) {
					let match = matches[n]
					let findIndex = _.findIndex(list, (i) => {
						return i.Id == match.leagueId && moment(i.matches[0].Start).format('MM/DD/YYYY HH:mm') == moment(match.Start).format('MM/DD/YYYY HH:mm');
					})
					if(findIndex == -1) {
						let findLastIndex = _.findLastIndex(list, (i) => {
							return i.Id == match.leagueId && moment(i.matches[0].Start).format('MM/DD/YYYY HH:mm') <= moment(match.Start).format('MM/DD/YYYY HH:mm');
						})
						if(findLastIndex != -1 && list.length == (findLastIndex + 1)) {
							list[findLastIndex].matches.push(match)
						}
						else {
							list.push({
								Id: match.leagueId, 
								Name: match.leagueName, 
								matches: [match]
							})
						}
					}
					else {
						list[findIndex].matches.push(match)
					}
				}
			}
			else {
				for(let n = 0; n < matches.length; n++) {
					let match = matches[n];
					let findIndex = _.findIndex(list, (i) => {
						return i.Id == match.leagueId;
					})
					if(findIndex == -1) {
						let objLeague = {
							Id: match.leagueId, 
							Name: match.leagueName, 
							matches: [match]
						}
						for(let key in match) {
							if(key.indexOf('level') != -1)
								objLeague[key] = match[key]
						}
						list.push(objLeague)
					}
					else {
						list[findIndex].matches.push(match)
					}
				}
				// list.sort((a, b) => {
				// 	return a.Name > b.Name ? 1: a.Name < b.Name ? -1 : 0;
				// })
				list = _.sortBy(list, ['level1', 'level2', 'Name'])
			}
			selector = list;
			Helper.blockUI(false)
		}
		return selector;
	}
)


export const filterDcLeague = createSelector(
	DCOddDataSelector, 
	isNotShowLeagueSelector, 
	resultSportsSelector,
	isShowFavoriteSelector, 
	randomNumberSelector, //them random de no co the goi lai dc function ma ko can get odds lai
	(odd, list, sportId, isShowFavorite, random) => {
		let selector = []
		let data = JSON.parse(JSON.stringify(odd))
		if(Helper.checkArray(data)) {
			let favoriteMatch = Cookies.get('favoriteMatch')
			let arrayMatchId = []
			if(isShowFavorite == true) {
				if(favoriteMatch != null) {
					let obj = JSON.parse(favoriteMatch);
					if(Helper.checkArray(obj[sportId])) {
						arrayMatchId = obj[sportId]
					}
				}
			}
			//favoriteMatch & notShowLeague
			let newMatches = []
			for(let i = 0; i < data.length; i++) {
				let matchIndex = _.findIndex(arrayMatchId, (n) => {
					return n == data[i].Id;
				})
				let leagueIndex = _.findIndex(list, (n) => {
					return n == data[i].leagueId;
				})
				if(leagueIndex == -1) {
					if(isShowFavorite == true) {
						if(matchIndex != -1)
							newMatches.push(data[i])
					}
					else {
						newMatches.push(data[i])
					}
				}
			}
			if(newMatches.length > 0)
				selector = newMatches
			//endFavoriteMatch
		}
		return selector;
	}
)

export const sortDcLeague = createSelector(
	filterDcLeague, 
	isSortByLeagueSelector, 
	(listFilter, isSortByLeague) => {
		let selector = [];
		if(Helper.checkArray(listFilter)) {
			Helper.blockUI(true)
			let list = []
			let matches = JSON.parse(JSON.stringify(listFilter))
			if(isSortByLeague == false) {
				matches.sort((a, b) => {
					return new Date(a.Start) - new Date(b.Start);
				})
				for(let n = 0; n < matches.length; n++) {
					let match = matches[n]
					let findIndex = _.findIndex(list, (i) => {
						return i.Id == match.leagueId && moment(i.matches[0].Start).format('MM/DD/YYYY HH:mm') == moment(match.Start).format('MM/DD/YYYY HH:mm');
					})
					if(findIndex == -1) {
						let findLastIndex = _.findLastIndex(list, (i) => {
							return i.Id == match.leagueId && moment(i.matches[0].Start).format('MM/DD/YYYY HH:mm') <= moment(match.Start).format('MM/DD/YYYY HH:mm');
						})
						if(findLastIndex != -1 && list.length == (findLastIndex + 1)) {
							list[findLastIndex].matches.push(match)
						}
						else {
							list.push({
								Id: match.leagueId, 
								Name: match.leagueName, 
								matches: [match]
							})
						}
					}
					else {
						list[findIndex].matches.push(match)
					}
				}
			}
			else {
				for(let n = 0; n < matches.length; n++) {
					let match = matches[n];
					let findIndex = _.findIndex(list, (i) => {
						return i.Id == match.leagueId;
					})
					if(findIndex == -1) {
						let objLeague = {
							Id: match.leagueId, 
							Name: match.leagueName, 
							matches: [match]
						}
						for(let key in match) {
							if(key.indexOf('level') != -1)
								objLeague[key] = match[key]
						}
						list.push(objLeague)
					}
					else {
						list[findIndex].matches.push(match)
					}
				}
				// list.sort((a, b) => {
				// 	return a.Name > b.Name ? 1: a.Name < b.Name ? -1 : 0;
				// })
				list = _.sortBy(list, ['level1', 'level2', 'Name'])
			}
			selector = list;
			Helper.blockUI(false)
		}
		return selector;
	}
)

export const filterCorrectLeague = createSelector(
	correctScoreOddSelector, 
	isNotShowLeagueSelector, 
	resultSportsSelector,
	isShowFavoriteSelector, 
	randomNumberSelector, //them random de no co the goi lai dc function ma ko can get odds lai
	(odd, list, sportId, isShowFavorite, random) => {
		let selector = []
		let data = JSON.parse(JSON.stringify(odd))
		if(Helper.checkArray(data)) {
			let favoriteMatch = Cookies.get('favoriteMatch')
			let arrayMatchId = []
			if(isShowFavorite == true) {
				if(favoriteMatch != null) {
					let obj = JSON.parse(favoriteMatch);
					if(Helper.checkArray(obj[sportId])) {
						arrayMatchId = obj[sportId]
					}
				}
			}
			//favoriteMatch & notShowLeague
			let newMatches = []
			for(let i = 0; i < data.length; i++) {
				let matchIndex = _.findIndex(arrayMatchId, (n) => {
					return n == data[i].Id;
				})
				let leagueIndex = _.findIndex(list, (n) => {
					return n == data[i].leagueId;
				})
				if(leagueIndex == -1) {
					if(isShowFavorite == true) {
						if(matchIndex != -1)
							newMatches.push(data[i])
					}
					else {
						newMatches.push(data[i])
					}
				}
			}
			if(newMatches.length > 0)
				selector = newMatches
			//endFavoriteMatch
		}
		return selector;
	}
)

export const sortCorrectScoreLeague = createSelector(
	filterCorrectLeague, 
	isSortByLeagueSelector, 
	(listFilter, isSortByLeague) => {
		let selector = [];
		if(Helper.checkArray(listFilter)) {
			Helper.blockUI(true)
			let list = []
			let matches = JSON.parse(JSON.stringify(listFilter))
			if(isSortByLeague == false) {
				matches.sort((a, b) => {
					return new Date(a.Start) - new Date(b.Start);
				})
				for(let n = 0; n < matches.length; n++) {
					let match = matches[n]
					let findIndex = _.findIndex(list, (i) => {
						return i.Id == match.leagueId && moment(i.matches[0].Start).format('MM/DD/YYYY HH:mm') == moment(match.Start).format('MM/DD/YYYY HH:mm');
					})
					if(findIndex == -1) {
						let findLastIndex = _.findLastIndex(list, (i) => {
							return i.Id == match.leagueId && moment(i.matches[0].Start).format('MM/DD/YYYY HH:mm') <= moment(match.Start).format('MM/DD/YYYY HH:mm');
						})
						if(findLastIndex != -1 && list.length == (findLastIndex + 1)) {
							list[findLastIndex].matches.push(match)
						}
						else {
							list.push({
								Id: match.leagueId, 
								Name: match.leagueName, 
								matches: [match]
							})
						}
					}
					else {
						list[findIndex].matches.push(match)
					}
				}
			}
			else {
				for(let n = 0; n < matches.length; n++) {
					let match = matches[n];
					let findIndex = _.findIndex(list, (i) => {
						return i.Id == match.leagueId;
					})
					if(findIndex == -1) {
						let objLeague = {
							Id: match.leagueId, 
							Name: match.leagueName, 
							matches: [match]
						}
						for(let key in match) {
							if(key.indexOf('level') != -1)
								objLeague[key] = match[key]
						}
						list.push(objLeague)
					}
					else {
						list[findIndex].matches.push(match)
					}
				}
				// list.sort((a, b) => {
				// 	return a.Name > b.Name ? 1: a.Name < b.Name ? -1 : 0;
				// })
				list = _.sortBy(list, ['level1', 'level2', 'Name'])
			}
			selector = list;
			Helper.blockUI(false)
		}
		return selector;
	}
)

export const filterHTFTLeague = createSelector(
	HTFTOddSelector, 
	isNotShowLeagueSelector, 
	resultSportsSelector,
	isShowFavoriteSelector, 
	randomNumberSelector, //them random de no co the goi lai dc function ma ko can get odds lai
	(odd, list, sportId, isShowFavorite, random) => {
		let selector = []
		let data = JSON.parse(JSON.stringify(odd))
		if(Helper.checkArray(data)) {
			let favoriteMatch = Cookies.get('favoriteMatch')
			let arrayMatchId = []
			if(isShowFavorite == true) {
				if(favoriteMatch != null) {
					let obj = JSON.parse(favoriteMatch);
					if(Helper.checkArray(obj[sportId])) {
						arrayMatchId = obj[sportId]
					}
				}
			}
			//favoriteMatch & notShowLeague
			let newMatches = []
			for(let i = 0; i < data.length; i++) {
				let matchIndex = _.findIndex(arrayMatchId, (n) => {
					return n == data[i].Id;
				})
				let leagueIndex = _.findIndex(list, (n) => {
					return n == data[i].leagueId;
				})
				if(leagueIndex == -1) {
					if(isShowFavorite == true) {
						if(matchIndex != -1)
							newMatches.push(data[i])
					}
					else {
						newMatches.push(data[i])
					}
				}
			}
			if(newMatches.length > 0)
				selector = newMatches
			//endFavoriteMatch
		}
		return selector;
	}
)

export const sortHTFTLeague = createSelector(
	filterHTFTLeague, 
	isSortByLeagueSelector, 
	(listFilter, isSortByLeague) => {
		let selector = [];
		if(Helper.checkArray(listFilter)) {
			Helper.blockUI(true)
			let list = []
			let matches = JSON.parse(JSON.stringify(listFilter))
			if(isSortByLeague == false) {
				matches.sort((a, b) => {
					return new Date(a.Start) - new Date(b.Start);
				})
				for(let n = 0; n < matches.length; n++) {
					let match = matches[n]
					let findIndex = _.findIndex(list, (i) => {
						return i.Id == match.leagueId && moment(i.matches[0].Start).format('MM/DD/YYYY HH:mm') == moment(match.Start).format('MM/DD/YYYY HH:mm');
					})
					if(findIndex == -1) {
						let findLastIndex = _.findLastIndex(list, (i) => {
							return i.Id == match.leagueId && moment(i.matches[0].Start).format('MM/DD/YYYY HH:mm') <= moment(match.Start).format('MM/DD/YYYY HH:mm');
						})
						if(findLastIndex != -1 && list.length == (findLastIndex + 1)) {
							list[findLastIndex].matches.push(match)
						}
						else {
							list.push({
								Id: match.leagueId, 
								Name: match.leagueName, 
								matches: [match]
							})
						}
					}
					else {
						list[findIndex].matches.push(match)
					}
				}
			}
			else {
				for(let n = 0; n < matches.length; n++) {
					let match = matches[n];
					let findIndex = _.findIndex(list, (i) => {
						return i.Id == match.leagueId;
					})
					if(findIndex == -1) {
						let objLeague = {
							Id: match.leagueId, 
							Name: match.leagueName, 
							matches: [match]
						}
						for(let key in match) {
							if(key.indexOf('level') != -1)
								objLeague[key] = match[key]
						}
						list.push(objLeague)
					}
					else {
						list[findIndex].matches.push(match)
					}
				}
				// list.sort((a, b) => {
				// 	return a.Name > b.Name ? 1: a.Name < b.Name ? -1 : 0;
				// })
				list = _.sortBy(list, ['level1', 'level2', 'Name'])
			}
			selector = list;
			Helper.blockUI(false)
		}
		return selector;
	}
)

export const filterGoalLeague = createSelector(
	goalOddSelector, 
	isNotShowLeagueSelector, 
	resultSportsSelector,
	isShowFavoriteSelector, 
	randomNumberSelector, //them random de no co the goi lai dc function ma ko can get odds lai
	(odd, list, sportId, isShowFavorite, random) => {
		let selector = []
		let data = JSON.parse(JSON.stringify(odd))
		if(Helper.checkArray(data)) {
			let favoriteMatch = Cookies.get('favoriteMatch')
			let arrayMatchId = []
			if(isShowFavorite == true) {
				if(favoriteMatch != null) {
					let obj = JSON.parse(favoriteMatch);
					if(Helper.checkArray(obj[sportId])) {
						arrayMatchId = obj[sportId]
					}
				}
			}
			//favoriteMatch & notShowLeague
			let newMatches = []
			for(let i = 0; i < data.length; i++) {
				let matchIndex = _.findIndex(arrayMatchId, (n) => {
					return n == data[i].Id;
				})
				let leagueIndex = _.findIndex(list, (n) => {
					return n == data[i].leagueId;
				})
				if(leagueIndex == -1) {
					if(isShowFavorite == true) {
						if(matchIndex != -1)
							newMatches.push(data[i])
					}
					else {
						newMatches.push(data[i])
					}
				}
			}
			if(newMatches.length > 0)
				selector = newMatches
			//endFavoriteMatch
		}
		return selector;
	}
)

export const sortGoalLeague = createSelector(
	filterGoalLeague, 
	isSortByLeagueSelector, 
	(listFilter, isSortByLeague) => {
		let selector = [];
		if(Helper.checkArray(listFilter)) {
			Helper.blockUI(true)
			let list = []
			let matches = JSON.parse(JSON.stringify(listFilter))
			if(isSortByLeague == false) {
				matches.sort((a, b) => {
					return new Date(a.Start) - new Date(b.Start);
				})
				for(let n = 0; n < matches.length; n++) {
					let match = matches[n]
					let findIndex = _.findIndex(list, (i) => {
						return i.Id == match.leagueId && moment(i.matches[0].Start).format('MM/DD/YYYY HH:mm') == moment(match.Start).format('MM/DD/YYYY HH:mm');
					})
					if(findIndex == -1) {
						let findLastIndex = _.findLastIndex(list, (i) => {
							return i.Id == match.leagueId && moment(i.matches[0].Start).format('MM/DD/YYYY HH:mm') <= moment(match.Start).format('MM/DD/YYYY HH:mm');
						})
						if(findLastIndex != -1 && list.length == (findLastIndex + 1)) {
							list[findLastIndex].matches.push(match)
						}
						else {
							list.push({
								Id: match.leagueId, 
								Name: match.leagueName, 
								matches: [match]
							})
						}
					}
					else {
						list[findIndex].matches.push(match)
					}
				}
			}
			else {
				for(let n = 0; n < matches.length; n++) {
					let match = matches[n];
					let findIndex = _.findIndex(list, (i) => {
						return i.Id == match.leagueId;
					})
					if(findIndex == -1) {
						let objLeague = {
							Id: match.leagueId, 
							Name: match.leagueName, 
							matches: [match]
						}
						for(let key in match) {
							if(key.indexOf('level') != -1)
								objLeague[key] = match[key]
						}
						list.push(objLeague)
					}
					else {
						list[findIndex].matches.push(match)
					}
				}
				// list.sort((a, b) => {
				// 	return a.Name > b.Name ? 1: a.Name < b.Name ? -1 : 0;
				// })
				list = _.sortBy(list, ['level1', 'level2', 'Name'])
			}
			selector = list;
			Helper.blockUI(false)
		}
		return selector;
	}
)
