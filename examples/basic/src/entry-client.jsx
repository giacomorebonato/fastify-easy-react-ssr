import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Pages } from './app.jsx'

ReactDOM.hydrateRoot(
	document.getElementById('root'),
	<BrowserRouter>
		<Pages />
	</BrowserRouter>,
)
