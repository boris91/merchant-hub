import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import preloadedState from './preloadedState';
import containers from './containers';
import './index.css';

const store = configureStore(preloadedState);

ReactDOM.render(
	<Provider store={store}>
		<Router>
            <Switch>
                <Route path="/" exact component={containers.MerchantList} />
                <Route path="/merchant/details/:id" component={containers.MerchantDetails} />
	            <Route path="/merchant/create" component={containers.MerchantDetails} />
            </Switch>
		</Router>
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
