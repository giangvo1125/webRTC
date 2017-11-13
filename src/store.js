import React from 'react'

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import * as reducers from './reducers'
import { createLogger } from 'redux-logger'

const logger = createLogger({
  level: 'info',
  collapsed: false,
  logger: console,
  predicate: (getState, action) => true
})

export function configureStore(history, initialState) {

  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  })

  let middlewares = [
    thunkMiddleware, 
    routerMiddleware(history),
  ]
  if (process.env.NODE_ENV !== 'production') {
    middlewares = [...middlewares, logger]
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        ...middlewares,
      )
    )
  )

  return store
}
