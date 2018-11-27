import React from 'react';
import Protal from "./../protal";
import { connect } from 'react-redux';
import './loading.less';

class Loading extends React.Component {
    render () {

        const togglestyle = this.props.loadingstatus ? {display: "flex"} : {display: "none"};

        return (
            <Protal>
                <div className="shield" style={togglestyle}>
                    <span className={"item-1"}></span>
                    <span className={"item-2"}></span>
                    <span className={"item-3"}></span>
                    <span className={"item-4"}></span>
                    <span className={"item-5"}></span>
                    <span className={"item-6"}></span>
                    <span className={"item-7"}></span>
                </div>
            </Protal>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        loadingstatus: state.loadingReducer.loadingstatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading)

