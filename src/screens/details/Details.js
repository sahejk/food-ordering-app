import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import '@fortawesome/fontawesome-svg-core';



import "./Details.css"


const styles = (theme => ({

    textRatingCost:{
        'text-overflow': 'clip',
        'width': '145px',
        'color':'grey'
    },
    restaurantName:{
        'padding':'8px 0px 8px 0px',
        'font-size': '30px',
    },
    restaurantCategory:{
        'padding':'8px 0px 8px 0px'
    },



}))

class Details extends Component {
    render() {
        const {classes} = this.props;
        return (

            <div>
                <Header baseUrl={this.props.baseUrl} showHeaderSearchBox={false}></Header>
                <div className="restaurant-details-container">
                    <div>
                        <img src="https://b.zmtcdn.com/data/reviews_photos/94a/be67cc20a6ab663f95330e5af6afb94a_1521359398.jpg"  alt="Restaurant" height="215px" width="275px" />
                    </div>
                    <div className="restaurant-details">
                        <div className="restaurant-name">
                            <Typography variant="h5" component="h5" className={classes.restaurantName}>Loud Silence</Typography>
                            <Typography variant="subtitle1" component="p" className={classes.restaurantLocation}>CBD-BELAPUR</Typography>
                            <Typography variant="subtitle1" component="p" className={classes.restaurantCategory}>Chinese, Continental, Indian, Italian, Snacks</Typography>
                        </div>
                        <div className="restaurant-rating-cost-container">
                            <div className="restaurant-rating-container">
                                <div className = "restaurant-rating">
                                    <FontAwesomeIcon icon="star" size="sm" color="black" />
                                    <Typography variant="subtitle1" component="p">4.4</Typography>
                                </div>
                                <Typography variant="caption" component="p" className={classes.textRatingCost}  >AVERAGE RATING BY {<span className="restaurant-NoOfCustomerRated">658</span>} CUSTOMERS</Typography>
                            </div>
                            <div className="restaurant-avg-cost-container">
                                <div className="restaurant-avg-cost">
                                    <FontAwesomeIcon icon="rupee-sign" size="sm" color="black" />
                                    <Typography variant="subtitle1" component="p">600</Typography>
                                </div>
                                <Typography variant="caption" component="p" className={classes.textRatingCost} >AVERAGE COST FOR TWO PEOPLE</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Details);