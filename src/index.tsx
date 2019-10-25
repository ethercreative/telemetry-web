import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Index = lazy(() => import('./Index/Index'));
const View = lazy(() => import('./View/View'));

ReactDOM.render((
	<BrowserRouter>
		<Suspense fallback={<p>Loading...</p>}>
			<Switch>
				<Route path="/" exact component={Index} />
				<Route path="/:handle" component={View} />
			</Switch>
		</Suspense>
	</BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
