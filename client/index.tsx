import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as RoutesModule from './routes';
import { ApplicationState } from './store';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { AppContainer } from 'react-hot-loader';
import './css/site.css';
import { load } from 'redux-localstorage-simple';

const history = createBrowserHistory({ basename: '' });

const ROOT = document.getElementById('react-app');
// Get the application-wide store instance, prepopulating with state from the server where available.
// const initialState = (window as any).initialReduxState as ApplicationState;
const store = configureStore(history, load() as ApplicationState);
let routes = RoutesModule.routes;

const renderApp = () => {
    // This code starts up the React app when it runs in a browser. It sets up the routing configuration
    // and injects the app into a DOM element.
    document.body.style.backgroundColor = "#e8ebef";
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history} children={routes(store)} />
            </Provider>
        </AppContainer>,
        ROOT
    );
};

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = require<typeof RoutesModule>('./routes').routes;
        renderApp();
    });
}
