import { createSelector } from 'reselect'

const betListSelector = (state) => state.auth.betList

export const sortBetList = createSelector( 
	betListSelector, 
	(list) => {
		let selector = list;
		if(Helper.checkArray(selector)) {
			selector.sort((a, b) => {
	            return a.id < b.id ? 1: a.id > b.id ? -1 : 0;
	        })
		}
		return selector;
	}
)
