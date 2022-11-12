import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { Pages } from './app.jsx'

export function render(url) {
	return ReactDOMServer.renderToString(
		<StaticRouter location={url}>
			<Pages />
		</StaticRouter>,
	)
}
