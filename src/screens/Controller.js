import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './home/Home';
import Details from './details/Details';
import Checkout from './checkout/Checkout';
import Profile from './profile/Profile';

//Creating controller class for easy routing the pages

//for easily routing the changes controller class has been created
class Controller extends Component{
    constructor(){
        super()
        this.baseUrl = "http://localhost:8080/api/" //{setting the baseUrl of the api}
    }

    render(){
        return(
            <Router>
                <div className = 'main-conatiner'>
                    <Route exact path = '/' render={(props) => <Home {...props} baseUrl = {this.baseUrl}/>}/>
                    <Route path='/restaurant/:id' render={(props) => <Details {...props} baseUrl={this.baseUrl} />} />
                    <Route path='/checkout' render={(props) => <Checkout {...props} baseUrl={this.baseUrl} />} />
                    <Route path='/profile' render={(props) => <Profile {...props} baseUrl={this.baseUrl} />} />
                </div>
            </Router>

        )
    }

}

export default Controller;