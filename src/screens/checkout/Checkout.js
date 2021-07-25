import React, { Component } from 'react';
import Header from '../../common/header/Header';

class Checkout extends Component{

    render(){
        return(
            <Header baseUrl={this.props.baseUrl} showHeaderSearchBox={false}/>
        )
    }
}

export default Checkout;