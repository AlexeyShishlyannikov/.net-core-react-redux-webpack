import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Store } from 'redux';

import Home from './components/Home';
import { Layout } from './components/Layout';
import { ApplicationState } from './store';

export const routes = (store: Store<ApplicationState>) => (
    <Layout>
        <Route exact path="/" component={Home} />
    </Layout>
);

// export const PrivateRoute = ({ component: Component, store, ...rest }): JSX.Element => {
//     const storeRef = store as Store<ApplicationState>;
//     return (
//         <Route {...rest} render={(props) => (
//             storeRef.getState().authentication.isAuthenticated
//                 ? <Component {...props} />
//                 : <Redirect to='/login' />
//         )} />
//     );
// }

// export const UnauthenenticatedRoute = ({ component: Component, store, ...rest }): JSX.Element => {
//     const storeRef = store as Store<ApplicationState>;
//     return (
//         <Route {...rest} render={(props) => (
//             !storeRef.getState().authentication.isAuthenticated
//                 ? <Component {...props} />
//                 : <Redirect to='/dashboard/home' />
//         )} />
//     );
// }