import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'

import { Provider } from 'react-redux'
import { BrowserRouter as Browser } from 'react-router-dom'

ReactDOM.render(
	<Browser>
		<Provider store={store}>
			<App />
		</Provider>
	</Browser>,
	document.getElementById('root'))