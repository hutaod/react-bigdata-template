import React from 'react';
import TopComponent from './../../common/layout/topcomponent'
import LeftComponent from './../../common/layout/leftcomponent';
import RightComponent from './../../common/layout/rightcomponent';

class MainFrame extends React.Component{
    render () {
        return (
            <React.Fragment>
                <TopComponent />
                <LeftComponent />
                <RightComponent />
            </React.Fragment>
        )
    }
}

export default MainFrame