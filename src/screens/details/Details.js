import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import { withStyles, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free-solid';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-free-regular';
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
    avgCost: {
        'padding-left': '5px'
    },
    itemPrice: {
        'padding-left': '5px'
    },
    addButton: {
        'margin-left': '25px',
    },
    menuItemName: {
        'margin-left': '20px',
    },

    shoppingCart: {
        color: 'black',
        'background-color': 'white',
        width: '60px',
        height: '50px',
        'margin-left': '-20px',
    },
    cartHeader: {
        'padding-bottom': '0px',
        'margin-left':'10px',
        'margin-right':'10px'
    },
    cartItemButton: {
        padding: '10px',
        'border-radius': '0',
        color:'#fdd835',
        '&:hover':{
            'background-color':'#ffee58',
        }
    },
    cardContent:{
        'padding-top':'0px',
        'margin-left':'10px',
        'margin-right':'10px'
    },
    totalAmount:{
        'font-weight':'bold'
    },
    checkOutButton:{
        'font-weight':'400'
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
                                    <i className="fa fa-inr" aria-hidden="true"></i>
                                    <Typography variant="subtitle1" component="p" className={classes.avgCost}>{this.state.restaurantDetails.avgCost}</Typography>
                                </div>
                                <Typography variant="caption" component="p" className={classes.textRatingCost} >AVERAGE COST FOR TWO PEOPLE</Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="menu-details-cart-container">
                    <div className="menu-details">
                        <Typography variant="overline" component="p" className={classes.categoryName} >CHINESE</Typography>
                        <Divider />
                        <div className='menu-item-container'>
                            <FontAwesomeIcon icon="circle" size="sm" color="green" />
                            <Typography variant="subtitle1" component="p" className={classes.menuItemName} >Pizza</Typography>
                            <div className="item-price">
                                <i className="fa fa-inr" aria-hidden="true"></i>
                                <Typography variant="subtitle1" component="p" className={classes.itemPrice} >200</Typography>
                            </div>
                            <IconButton className={classes.addButton} aria-label="add">
                                <AddIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className="my-cart">
                        <Card className={classes.myCart}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="shopping-cart" className={classes.shoppingCart}>
                                        <Badge badgeContent={4} color="primary" className={classes.badge}>
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </Avatar>
                                }
                                title="My Cart"
                                titleTypographyProps={{
                                    variant: 'h6'
                                }}
                                className={classes.cartHeader}
                            />
                            <CardContent className={classes.cardContent}>
                                <div className="cart-menu-item-container">
                                    <i className="fa fa-stop-circle-o" aria-hidden="true"></i>
                                    <Typography variant="subtitle1" component="p" className={classes.menuItemName} id="cart-menu-item-name" >Pizza</Typography>
                                    <IconButton className={classes.cartItemButton} id="minus-button" aria-label="remove" >
                                        <FontAwesomeIcon icon="minus" size="xs" color="black" />
                                    </IconButton>
                                    <Typography variant="subtitle1" component="p" className={classes.itemQuantity}>1</Typography>
                                    <IconButton className={classes.cartItemButton} aria-label="add" >
                                        <FontAwesomeIcon icon="plus" size="xs" color="black" />
                                    </IconButton>
                                    <div className="item-price">
                                        <i className="fa fa-inr" aria-hidden="true" style={{color:'grey'}}></i>
                                        <Typography variant="subtitle1" component="p" className={classes.itemPrice} id="cart-item-price">200</Typography>
                                    </div>

                                </div>
                                <div className="total-amount-container">
                                    <Typography variant="subtitle2" component="p" className={classes.totalAmount}>TOTAL AMOUNT</Typography>
                                    <div className="total-price">
                                        <i className="fa fa-inr" aria-hidden="true" ></i>
                                        <Typography variant="subtitle1" component="p" className={classes.itemPrice} id = "cart-total-price">200</Typography>
                                    </div>
                                </div>

                                <Button variant="contained" color='primary' fullWidth={true} className={classes.checkOutButton}>CHECKOUT</Button>

                            </CardContent>

                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Details);