import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

//HOC
import requireAuth from './hoc/require_auth'

//COMPONENT

import SoundComponent from './components/sound'

const routes = (
    <Route path="/">
        <IndexRoute component={(SoundComponent)} />
    </Route>
)

export default routes