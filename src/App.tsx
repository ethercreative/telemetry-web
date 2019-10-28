import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import Footer from './_components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';

const Index = lazy(() => import('./Index/Index'));
const View = lazy(() => import('./View/View'));

const App = () => (
	<BrowserRouter>
		<Suspense fallback={<p>Loading...</p>}>
			<Switch>
				<Route path="/" exact component={Index} />
				<Route path="/:handle" component={View} />
			</Switch>
			<Footer />
		</Suspense>
	</BrowserRouter>
);

export default App;
