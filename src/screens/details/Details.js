import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import '@fortawesome/fontawesome-svg-core';
import "./Details.css"

const styles = (theme => ({

    textRatingCost: {
        'text-overflow': 'clip',
        'width': '145px',
        'color': 'grey'
    },
    restaurantName: {
        'padding': '8px 0px 8px 0px',
        'font-size': '30px',
    },
    restaurantCategory: {
        'padding': '8px 0px 8px 0px'
    },
    avgCost:{
        'padding-left':'5px'
    },
    itemPrice:{
        'padding-left':'5px'
    },
    addButton:{
        'margin-left':'25px',
    },
    menuItemName:{
        'margin-left':'20px',
    }



}))


class Details extends Component {
    constructor() {
        super()
        this.state = {
            restaurantDetails: [],
        }
    }

    componentDidMount() {
        let data = null;
        let that = this;
        let xhrRestaurantDetails = new XMLHttpRequest()

        console.log('here')

        xhrRestaurantDetails.addEventListener("readystatechange", function () {
            if (xhrRestaurantDetails.readyState === 4 && xhrRestaurantDetails.status === 200) {
                let response = JSON.parse(xhrRestaurantDetails.responseText);
                let categoriesName = [];
                response.categories.forEach(category => {
                    categoriesName.push(category.category_name);
                });
                let restaurantDetails = {
                    id: response.id,
                    name: response.restaurant_name,
                    photoURL: response.photo_URL,
                    avgCost: response.average_price,
                    rating: response.customer_rating,
                    noOfCustomerRated: response.number_customers_rated,
                    locality: response.address.locality,
                    categoriesName: categoriesName.toString(),
                }
                that.setState({
                    ...that.state,
                    restaurantDetails: restaurantDetails,
                })
            }

        })

        xhrRestaurantDetails.open('GET', this.props.baseUrl + 'restaurant/' + this.props.match.params.id)
        xhrRestaurantDetails.send(data);

    }

    render() {
        const { classes } = this.props;
        return (

            <div>
                <Header baseUrl={this.props.baseUrl} showHeaderSearchBox={false}></Header>
                <div className="restaurant-details-container">
                    <div>
                        <img src={this.state.restaurantDetails.photoURL} alt="Restaurant" height="215px" width="275px" />
                    </div>
                    <div className="restaurant-details">
                        <div className="restaurant-name">
                            <Typography variant="h5" component="h5" className={classes.restaurantName}>{this.state.restaurantDetails.name}</Typography>
                            <Typography variant="subtitle1" component="p" className={classes.restaurantLocation}>{this.state.restaurantDetails.locality}</Typography>
                            <Typography variant="subtitle1" component="p" className={classes.restaurantCategory}>{this.state.restaurantDetails.categoriesName}</Typography>
                        </div>
                        <div className="restaurant-rating-cost-container">
                            <div className="restaurant-rating-container">
                                <div className="restaurant-rating">
                                    <FontAwesomeIcon icon="star" size="sm" color="black" />
                                    <Typography variant="subtitle1" component="p">{this.state.restaurantDetails.rating}</Typography>
                                </div>
                                <Typography variant="caption" component="p" className={classes.textRatingCost}  >AVERAGE RATING BY {<span className="restaurant-NoOfCustomerRated">{this.state.restaurantDetails.noOfCustomerRated}</span>} CUSTOMERS</Typography>
                            </div>
                            <div className="restaurant-avg-cost-container">
                                <div className="restaurant-avg-cost">
                                    <FontAwesomeIcon icon="rupee-sign" size="sm" color="black" />
                                    <Typography variant="subtitle1" component="p" className={classes.avgCost}>{this.state.restaurantDetails.avgCost}</Typography>
                                </div>
                                <Typography variant="caption" component="p" className={classes.textRatingCost} >AVERAGE COST FOR TWO PEOPLE</Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="menu-details-cart-container">
                    <div className="menu-details">
                        <Typography variant="subtitle2" component="p" className={classes.categoryName} >CHINESE</Typography>
                        <Divider />
                        <div className='menu-item-container'>
                            <FontAwesomeIcon icon="circle" size="sm" color="green" />
                            <Typography variant="subtitle1" component="p" className={classes.menuItemName} >Pizza</Typography>
                            <div className="item-price">
                                <FontAwesomeIcon icon="rupee-sign" size="sm" color="black" />
                                <Typography variant="subtitle1" component="p" className={classes.itemPrice}>200</Typography>
                            </div>
                            <IconButton className={classes.addButton} aria-label="add">
                                <AddIcon />
                            </IconButton>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Details);