import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { withStyles, Button, Tab, Tabs, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
        margin: '40px 0px 20px 0px',
        'border-style': 'solid',
        'border-width': '0.5px 3px 3px 0.5px',
        'border-radius': '10px',
        'padding': '8px'
    },
    addressCheckButton: {
        'float': 'right',
    },
    saveAddressForm: {
        width: '60%',
        'padding': '20px',
        textAlign: 'left',

    },
    selectField: {
        width: '90%',
    },
    formControlSelect: {
        width: '100%',
    },
    formButton:{
        'font-weight': 400,
        'width':'150px'
    }
}))

const TabContainer = function (props) {
    return (
        <Typography className={props.className} component="div">
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
            value: 1,
            accessToken: sessionStorage.getItem('access-token'),
            addresses: [],
            flatBuildingName: "",
            flatBuildingNameRequired: "dispNone",
            locality: "",
            localityRequired: "dispNone",
            city: "",
            cityRequired: "dispNone",
            state: "",
            stateRequired: "dispNone",
            pincode: "",
            pincodeRequired: "dispNone",
            pincodeHelpText: "dispNone",
            states: ["Karnataka", "Tamil Nadu", "Andhra Pradesh", "Maharashtra", "Goa", "Delhi", "Uttar Pradesh"],


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

    componentDidMount() {
        let data = null;
        let that = this;
        let xhrAddress = new XMLHttpRequest();

        xhrAddress.addEventListener('readystatechange', function () {
            if (xhrAddress.readyState === 4 && xhrAddress.status === 200) {
                let responseAddresses = JSON.parse(xhrAddress.responseText).addresses;
                let addresses = [];
                responseAddresses.forEach(responseAddress => {
                    let address = {
                        id: responseAddress.id,
                        city: responseAddress.city,
                        flatBuildingName: responseAddress.flat_building_name,
                        locality: responseAddress.locality,
                        pincode: responseAddress.pincode,
                        state: responseAddress.state,
                        selected: false,
                    }
                    addresses.push(address)
                })
                that.setState({
                    ...that.state,
                    addresses: addresses
                })
            }
        })

        xhrAddress.open('GET', this.props.baseUrl + 'address/customer');
        xhrAddress.setRequestHeader('authorization', 'Bearer ' + this.state.accessToken)
        xhrAddress.send(data);
    }

    inputFlatBuildingNameChangeHandler = (event) => {
        this.setState({
            ...this.state,
            flatBuildingName: event.target.value,
        })
    }
    inputLocalityChangeHandler = (event) => {
        this.setState({
            ...this.state,
            locality: event.target.value,
        })
    }
    inputCityChangeHandler = (event) => {
        this.setState({
            ...this.state,
            city: event.target.value,
        })
    }
    selectStateChangeHandler = (event) => {
        this.setState({
            ...this.state,
            state: event.target.value,
        })
    }
    inputPincodeChangeHandler = (event) => {
        this.setState({
            ...this.state,
            pincode: event.target.value,
        })
    }


    addressSelectedClickHandler = (addressId) => {
        let addresses = this.state.addresses;
        addresses.forEach(address => {
            if (address.id === addressId) {
                address.selected = true;
            } else {
                address.selected = false;
            }
        })
        this.setState({
            ...this.state,
            addresses: addresses,
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {console.log(this.props.cartItems)}
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
                                                    <GridList className={classes.gridList} cols={3} spacing={2} cellHeight='auto'>
                                                        {this.state.addresses.map(address => (
                                                            <GridListTile className={classes.gridListTile} key={address.id} style={{ borderColor: address.selected ? "rgb(224,37,96)" : "white" }}>
                                                                <div className="grid-list-tile-container">
                                                                    <Typography variant="body1" component="p">{address.flatBuildingName}</Typography>
                                                                    <Typography variant="body1" component="p">{address.locality}</Typography>
                                                                    <Typography variant="body1" component="p">{address.city}</Typography>
                                                                    <Typography variant="body1" component="p">{address.state.state_name}</Typography>
                                                                    <Typography variant="body1" component="p">{address.pincode}</Typography>
                                                                    <IconButton className={classes.addressCheckButton} onClick={() => this.addressSelectedClickHandler(address.id)}>
                                                                        <CheckCircleIcon style={{ color: address.selected ? "green" : "grey" }} />
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
                                            {this.state.value === 1 &&
                                            <TabContainer className={classes.saveAddressForm}>
                                                <FormControl required className={classes.formControl}>
                                                    <InputLabel htmlFor="flat-building-name">Flat / Building No.</InputLabel>
                                                    <Input id="flat-building-name" className="input-fields" flatbuildingname={this.state.flatBuildingName} fullWidth={true} onChange={this.inputFlatBuildingNameChangeHandler} value={this.state.flatBuildingName} />
                                                    <FormHelperText className={this.state.flatBuildingNameRequired}>
                                                        <span className="red">required</span>
                                                    </FormHelperText>
                                                </FormControl>
                                                <br />
                                                <br />
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel htmlFor="locality">Locality</InputLabel>
                                                    <Input id="locality" className="input-fields" locality={this.state.locality} fullWidth={true} onChange={this.inputLocalityChangeHandler} value={this.state.locality} />
                                                    <FormHelperText className={this.state.localityRequired}>
                                                        <span className="red">required</span>
                                                    </FormHelperText>
                                                </FormControl>
                                                <br />
                                                <br />
                                                <FormControl required className={classes.formControl}>
                                                    <InputLabel htmlFor="city">City</InputLabel>
                                                    <Input id="city" className="input-fields" type="text" city={this.state.city} fullWidth={true} onChange={this.inputCityChangeHandler} value={this.state.city} />
                                                    <FormHelperText className={this.state.cityRequired}>
                                                        <span className="red">required</span>
                                                    </FormHelperText>
                                                </FormControl>
                                                <br />
                                                <br />
                                                <FormControl required className={classes.formControlSelect}>
                                                    <InputLabel htmlFor="state">State</InputLabel>
                                                    <Select id="state" className={classes.selectField} state={this.state.state} onChange={this.selectStateChangeHandler} MenuProps={{style: {marginTop: '50px',maxHeight: '300px'}}} value={this.state.state}>
                                                        {this.state.states.map((state, index) => (
                                                            <MenuItem value={index}>{state}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    <FormHelperText className={this.state.stateRequired}>
                                                        <span className="red">required</span>
                                                    </FormHelperText>
                                                </FormControl>
                                                <br />
                                                <br />
                                                <FormControl required className={classes.formControl}>
                                                    <InputLabel htmlFor="pincode">Pincode</InputLabel>
                                                    <Input id="pincode" className="input-fields" pincode={this.state.pincode} fullWidth={true} onChange={this.inputPincodeChangeHandler} value={this.state.pincode} />
                                                    <FormHelperText className={this.state.pincodeRequired}>
                                                        <span className="red">required</span>
                                                    </FormHelperText>
                                                    <FormHelperText className={this.state.pincodeHelpText}>
                                                        <span className="red">Pincode must contain only numbers and must be 6 digits long</span>
                                                    </FormHelperText>
                                                </FormControl>
                                                <br />
                                                <br />
                                                <br />
                                                <Button variant="contained" className={classes.formButton}  color="secondary" onClick={this.signUpClickHandler}>SAVE ADDRESS</Button>
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


            </div >
        )
    }
}

export default withStyles(styles)(Checkout);