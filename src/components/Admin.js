import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Button1 from '../Material/button'
import ButtonAppBar from '../Material/Appbar'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Modal from '@material-ui/core/Modal';
import Fire from './Fire'

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    grew: {
        fontWeight: 'bold',
        fontFamily: 'Vidaloka',
        letterSpacing: "1px",
        // fontSize:'1.7em',

        color: '#fde7ee'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        margin: '150px 450px'
    },
});

class Admin extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
        this.viewStudent = this.viewStudent.bind(this)
        this.viewBooking = this.viewBooking.bind(this)
        this.viewFeedback = this.viewFeedback.bind(this)
        this.deleteStudent = this.deleteStudent.bind(this)
        this.deleteFeedback = this.deleteFeedback.bind(this)
        this.deleteBooking = this.deleteBooking.bind(this)
        this.state = {
            detail: [],
            value: 0,
            open: false,
            student: [],
            feed: [],
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    logout() {

        Fire.auth().signOut().then(() => {
            this.props.history.push("/")
        })
    }
    componentWillMount() {
     

        var s = Fire.database().ref("students")
        s.on('value', (data) => {
            if (data.val()) {
                var student = Object.entries(data.val())
                this.setState({
                    student
                })
            }
        })
    }
    viewBooking() {
        var det = Fire.database().ref("booked")
        det.on('value', (data) => {
            if (data.val()) {
                var detail = Object.entries(data.val())
                this.setState({
                    detail
                })
            }
        })
    }
    viewFeedback() {
        var f = Fire.database().ref("feedback")
        f.on('value', (data) => {
            if (data.val()) {
                var feed = Object.entries(data.val())
                this.setState({
                    feed
                })
            }
        })

    }
    viewStudent() {
    }
    deleteStudent(index) {
        var r = Fire.database().ref("students").child(index).remove()
    }
    deleteFeedback(index) {
        var r = Fire.database().ref("feedback").child(index).remove()

    }
    deleteBooking(index) {
        var r = Fire.database().ref("booked").child(index).remove()

    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div className="main">
                <div className="main1">
                    <ButtonAppBar top1='Real-time Parking Booking System (Admin)' />
                    <div style={{ width: "62%", height: "500px", margin: "45px auto", backgroundColor: 'white', }}>
                        <div className={classes.root} >
                            <AppBar position="static" style={{ backgroundColor: "#673ab7" }}>
                                <Tabs value={value} onChange={this.handleChange} style={{ margin: "auto", textAlign: "center" }}>
                                    <Tab label="View Students"
                                        onClick={this.viewStudent}
                                        className={classes.grew} />
                                    <Tab label="View Bookings"
                                        onClick={this.viewBooking}
                                        className={classes.grew} />
                                    <Tab label="View Feedback"
                                        onClick={this.viewFeedback}
                                        className={classes.grew} />
                                    <Tab label="Logout" onClick={this.logout} className={classes.grew} />

                                </Tabs>
                            </AppBar>
                            {value === 0 &&
                                <TabContainer>
                                    <div>
                                        <table style={{ border: "1px solid #673ab7", width: "90%", margin: "auto" }}>
                                            <thead>
                                                <tr style={{ border: "1px solid #673ab7" }}>
                                                    <th style={{ border: "1px solid #673ab7" }}>
                                                        S.no
                                                    </th>
                                                    <th style={{ border: "1px solid #673ab7" }}>
                                                        Name
                                                    </th>
                                                    <th style={{ border: "1px solid #673ab7" }}>
                                                        Email
                                                    </th>
                                                    <th style={{ border: "1px solid #673ab7" }}>
                                                        Contact
                                                    </th>

                                                    <th style={{ border: "1px solid #673ab7" }}>
                                                        Delete
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.student ? this.state.student.map((val, i) => {
                                                    return (<tr>
                                                        <td style={{ border: "1px solid #673ab7", textAlign: "center" }}>
                                                            {i + 1}
                                                        </td>
                                                        <td style={{ border: "1px solid #673ab7", textAlign: "center" }}>
                                                            {val[1].name}
                                                        </td>
                                                        <td style={{ border: "1px solid #673ab7", textAlign: "center" }}>
                                                            {val[1].email}
                                                        </td>
                                                        <td style={{ border: "1px solid #673ab7", textAlign: "center" }}>
                                                            {val[1].phone}
                                                        </td>
                                                        <td style={{ border: "1px solid #673ab7", textAlign: "center" }}>
                                                            {/* <button
                                                                onClick={() => {
                                                                    this.deleteStudent(val[0])
                                                                }}
                                                            >delete</button> */}
                                                            <Button1 name="Delete"
                                                            handleOpen={()=>{
                                                                this.deleteStudent(val[0])
                                                            }}
                                                            fonts="0.9em"
                                                            width1="70px" height1="40px" bgcolor="#673ab7"/>
                                                        </td>

                                                    </tr>)
                                                })
                                                    : ''
                                                }

                                            </tbody>

                                        </table>
                                    </div>
                                </TabContainer>}


                            {value === 1 &&
                                <TabContainer>
                                    <div>
                                        <table style={{ border: "1px solid #673ab7", width: "90%", margin: "auto" }}>
                                            <thead>
                                                <tr style={{ border: "1px solid #673ab7" }}>
                                                    <th style={{ border: "1px solid #673ab7" }}>
                                                        Email
                                                </th>
                                                    <th style={{ border: "1px solid #673ab7" }}>
                                                        Area
                                                </th>
                                                    <th style={{ border: "1px solid #673ab7" }}>
                                                        Date
                                                </th>
                                                    <th style={{ border: "1px solid #673ab7" }}>
                                                        Time
                                                </th>
                                                    <th style={{ border: "1px solid #673ab7" }}>
                                                        Slot
                                                </th>
                                                    <th style={{ border: "1px solid #673ab7" }}>
                                                        Delete
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.detail ? this.state.detail.map((val, i) => {
                                                    return (<tr>
                                                        <td style={{ border: "1px solid #673ab7", textAlign: "center" }}>
                                                            {val[1].email}
                                                        </td>
                                                        <td style={{ border: "1px solid #673ab7", textAlign: "center" }}>
                                                            {val[1].area}
                                                        </td>
                                                        <td style={{ border: "1px solid #673ab7", textAlign: "center" }}>
                                                            {val[1].date}
                                                        </td>
                                                        <td style={{ border: "1px solid #673ab7", textAlign: "center" }}>
                                                            {val[1].time}

                                                        </td>
                                                        <td style={{ border: "1px solid #673ab7", textAlign: "center" }}>
                                                            {val[1].slot}

                                                        </td>

                                                        <td style={{ border: "1px solid #673ab7", textAlign: "center" }}>
                                                            {/* <button
                                                                onClick={() => {
                                                                    this.deleteBooking(val[0])
                                                                }}
                                                            >delete</button> */}
                                                             <Button1 name="Delete"
                                                            handleOpen={()=>{
                                                                this.deleteBooking(val[0])                                                                
                                                            }}
                                                            fonts="0.9em"
                                                            width1="70px" height1="40px" bgcolor="#673ab7"/>
                                                        </td>
                                                    </tr>)
                                                })
                                                    : ''
                                                }
                                            </tbody>

                                        </table>
                                    </div>
                                </TabContainer>}
                            {value === 2 &&
                                <TabContainer>
                                    <div>
                                        <table style={{ border: "1px solid #673ab7", width: "90%", margin: "auto" }}>
                                            <thead>
                                                <tr style={{ border: "1px solid #673ab7" }}>
                                                    <th style={{ border: "1px solid #673ab7", width: "25%" }}>
                                                        Student email
                                                    </th>
                                                    <th style={{ border: "1px solid #673ab7", width: "50%" }}>
                                                        Message
                                                    </th>
                                                    <th style={{ border: "1px solid #673ab7", width: "25%" }}>
                                                        Date-Time
                                                    </th>
                                                    <th style={{ border: "1px solid #673ab7" }}>
                                                        Delete
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.feed ? this.state.feed.map((val, i) => {
                                                    return (<tr>
                                                        <td style={{ border: "1px solid #673ab7", textAlign: "center" }}>
                                                            {val[1].email}
                                                        </td>
                                                        <td style={{ border: "1px solid #673ab7", textAlign: "center" }}>
                                                            {val[1].feedback}
                                                        </td>
                                                        <td style={{ border: "1px solid #673ab7", textAlign: "center" }}>
                                                            {val[1].date}_{val[1].time}
                                                        </td>

                                                        <td style={{ border: "1px solid #673ab7", textAlign: "center" }}>
                                                            {/* <button
                                                                onClick={() => {
                                                                    this.deleteFeedback(val[0])
                                                                }}
                                                            >delete</button> */}
                                                            <Button1 name="Delete"
                                                            handleOpen={()=>{
                                                                this.deleteFeedback(val[0])
                                                                                                                                
                                                            }}
                                                            fonts="0.9em"
                                                            width1="70px" height1="40px" bgcolor="#673ab7"/>
                                                        </td>
                                                    </tr>)
                                                })
                                                    : ''
                                                }

                                            </tbody>

                                        </table>
                                    </div>
                                </TabContainer>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(Admin);
