import React, { Component, } from 'react';

import uuid from 'react-uuid'


export default class ImageWithDefault extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            failed: false
        };
    }


    _onError = () => {
        this.setState({failed: true});
    };
    render() {
        if(this.state.failed === false) {
            return (
                <img key={uuid()} src={this.props.source} onError={this._onError} {...this.props}/>
            );
        } else {
            return (<img key={uuid()} src={this.props.default} {...this.props} />)
        }
    }
}