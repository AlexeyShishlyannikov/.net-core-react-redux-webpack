import * as React from 'react';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}
