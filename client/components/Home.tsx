import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div style={{display:'flex', justifyContent:'center', height:'100%', alignItems: 'center'}}>HOMEPAGE</div>;
    }
}

export default (Home);
