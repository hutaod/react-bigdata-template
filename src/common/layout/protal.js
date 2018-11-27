import React from 'react';
import ReactDOM from 'react-dom';

const rootdom = document.getElementById('root');

export default class Protal extends React.Component{
    constructor (props) {
        super (props);
        this.el = document.createElement('div');
    };

    componentDidMount () {
        rootdom.appendChild(this.el)
    };

    componentWillUnmount () {
        rootdom.removeChild(this.el)
    };

    render () {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        )
    }
}