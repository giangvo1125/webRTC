import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import useScroll from 'scroll-behavior/lib/useStandardScroll'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import { configureStore } from './src/store'
import routes from './src/routes'
import helperAction from './src/actions/helper_action'
import userAction from './src/actions/user_action'
import oddAction from './src/actions/odd_action'

let state = window.__initialState__ || undefined
const store = configureStore(browserHistory, state)
const createScrollHistory = useScroll(createBrowserHistory)
const appHistory = useRouterHistory(createScrollHistory)()
const history = syncHistoryWithStore(appHistory, store)

// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//     window.location.replace(config.mobileUrl)
// }

// store.dispatch(helperAction.changeTransLate())
// store.dispatch(helperAction.initChange())
// store.dispatch(helperAction.getAllSports())
// let codeTheme = Cookies.get('codeTheme');
// if(Helper.checkData(codeTheme)) {
// 	store.dispatch(helperAction.changeTheme(codeTheme))
// 	$(`link[title=${codeTheme}]`).removeAttr("disabled");
// 	let { listTheme } = store.getState().helper
// 	setTimeout(()=> {
//         listTheme.forEach((item) => {
//             if(item != codeTheme) {
//                 $(`link[title=${item}]`).attr('disabled', 'disabled');
//             }
//         })
//     },200)
// }
// let countryKey = Cookies.get('countryKey')
// if(Helper.checkData(countryKey)) {
//   store.dispatch(helperAction.changeTransLate(countryKey))
// }
// else {
//   store.dispatch(helperAction.changeTransLate())
// }

// store.dispatch(userAction.getTweakOddClient())
// store.dispatch(userAction.getBetSetting())
// store.dispatch(oddAction.getAllSportsLineOdds())
// firebase.initializeApp(config.firebaseConfig);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('mount')
)
