import { createSelector } from 'reselect'

const keyTranslateSelector = (state) => state.helper.keyTranslate

const listTranslateLanguageSelector = (state) => state.helper.listTranslateLanguage

const filterLeagueSelector = (state) => state.auth.filterLeague

const resultDataSelector = (state) => state.auth.results

export const getActiveLanguage = createSelector(
	keyTranslateSelector, 
	listTranslateLanguageSelector, 
	(key, list) => {
		let selector = {};
		selector = _.find(list, (item) => {
			return item.key == key
		})
		return selector;
	}
)

export const getResultsSports = createSelector(
	filterLeagueSelector, 
	resultDataSelector, 
	(key, list) => {
		let selector = {};
		if(Helper.checkArray(list.matches)) {
			list.matches.sort((a, b) => {
				return new Date(a.date) - new Date(b.date);
			})
		}

		if(Helper.checkArray(list.league)) {
			list.league.sort((a, b) => {
				return a.leagueName > b.leagueName ? 1: a.leagueName < b.leagueName ? -1 : 0;
			});
		}
		
		selector = list;
		return selector;
	}
)
