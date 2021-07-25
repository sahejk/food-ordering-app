import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { withStyles, Button, Tab, Tabs, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Paper from '@material-ui/core/Paper';
import Header from '../../common/header/Header';
import '../checkout/Checkout.css'

const styles = (theme => ({

    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    tab: {
        "font-weight": 500,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    gridListTile: {
        textAlign: 'left',
        margin: '40px 10px 20px 10px',
        'border-style': 'solid',
        'border-width': '0.5px 3px 3px 0.5px',
        'border-radius': '10px',
        'padding':'8px'
    },
    addressCheckButton: {
        'float': 'right',
    },




}))

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: '0px', textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Checkout extends Component {
    constructor() {
        super()
        this.state = {
            activeStep: 0,
            steps: this.getSteps(),
            value: 0,
            accessToken:sessionStorage.getItem('access-token'),
            addresses:[],

        }
    }
    getSteps = () => {
        return ['Delivery', 'Payment'];
    }
    nextButtonClickHandler = () => {
        let activeStep = this.state.activeStep;
        activeStep++;
        this.setState({
            ...this.state,
            activeStep: activeStep,
        });
    }

    backButtonClickHandler = () => {
        let activeStep = this.state.activeStep;
        activeStep--;
        this.setState({
            ...this.state,
            activeStep: activeStep,
        });
    }

    changeButtonClickHandler = () => {
        this.setState({
            ...this.state,
            activeStep: 0,
        });
    }

    tabsChangeHandler = (event, value) => {
        this.setState({
            value,
        });
    }

    componentDidMount(){
        let data = null;
        let that = this;
        let xhrAddress = new XMLHttpRequest();

        xhrAddress.addEventListener('readystatechange',function(){
            if(xhrAddress.readyState === 4 && xhrAddress.status === 200){
                let responseAddresses = JSON.parse(xhrAddress.responseText).addresses;
                let addresses=[];
                responseAddresses.forEach(responseAddress => {
                    let address = {
                        id:responseAddress.id,
                        city:responseAddress.city,
                        flatBuildingName:responseAddress.flat_building_name,
                        locality:responseAddress.locality,
                        pincode:responseAddress.pincode,
                        state:responseAddress.state,
                        selected:false,
                    }
                    addresses.push(address)
                })
                that.setState({
                    ...that.state,
                    addresses:addresses
                })
            }
        })

        xhrAddress.open('GET',this.props.baseUrl + 'address/customer');
        xhrAddress.setRequestHeader('authorization','Bearer '+this.state.accessToken)
        xhrAddress.send(data);
    }

    addressSelectedClickHandler = (addressId) =>{
        let addresses = this.state.addresses;
        addresses.forEach(address => {
            if(address.id === addressId){
                address.selected = true;
            }else{
                address.selected = false;
            }
        })
        this.setState({
            ...this.state,
            addresses:addresses,
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header baseUrl={this.props.baseUrl} showHeaderSearchBox={false} />
                <div className="flex-container">
                    <div className="stepper-container">
                        <Stepper activeStep={this.state.activeStep} orientation="vertical">
                            {this.state.steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        {index === 0 &&
                                        <div className="address-container">
                                            <Tabs className="address-tabs" value={this.state.value} onChange={this.tabsChangeHandler}>
                                                <Tab label="EXISTING ADDRESS" className={classes.tab} />
                                                <Tab label="NEW ADDRESS" className={classes.tab} />
                                            </Tabs>
                                            {this.state.value === 0 &&
                                            <TabContainer>
                                                {this.state.addresses.length !== 0 ?
                                                    <GridList className={classes.gridList} cols={3} spacing={3} cellHeight='auto'>
                                                        {this.state.addresses.map(address => (
                                                            <GridListTile className={classes.gridListTile} key={address.id} style={{borderColor:address.selected ? "rgb(224,37,96)":"white"}}>
                                                                <div className="grid-list-tile-container">
                                                                    <Typography variant="body1" component="p">{address.flatBuildingName}</Typography>
                                                                    <Typography variant="body1" component="p">{address.locality}</Typography>
                                                                    <Typography variant="body1" component="p">{address.city}</Typography>
                                                                    <Typography variant="body1" component="p">{address.state.state_name}</Typography>
                                                                    <Typography variant="body1" component="p">{address.pincode}</Typography>
                                                                    <IconButton className={classes.addressCheckButton} onClick={() => this.addressSelectedClickHandler(address.id)}>
                                                                        <CheckCircleIcon style={{color:address.selected ? "green":"grey"}} />
                                                                    </IconButton>
                                                                </div>
                                                            </GridListTile>
                                                        ))}
                                                    </GridList>
                                                    :
                                                    <Typography variant="body1" component="p">There are no saved addresses! You can save an address using the 'New Address' tab or using your ‘Profile’ menu option.</Typography>
                                                }
                                            </TabContainer>
                                            }
                                        </div>
                                        }
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <Button
                                                    disabled={this.state.activeStep === 0}
                                                    onClick={this.backButtonClickHandler}
                                                    className={classes.Button}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.nextButtonClickHandler}
                                                    className={classes.button}
                                                >
                                                    {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {this.state.activeStep === this.state.steps.length && (
                            <Paper square elevation={0} className={classes.resetContainer}>
                                <Typography>View the summary and place your order now!</Typography>
                                <Button onClick={this.changeButtonClickHandler} className={classes.button}>
                                    Change
                                </Button>
                            </Paper>
                        )}

                    </div>
                </div>


            </div>
        )
    }
}

export default withStyles(styles)(Checkout);