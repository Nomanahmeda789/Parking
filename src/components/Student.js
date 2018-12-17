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

class Student extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
        this.submitFeedback = this.submitFeedback.bind(this)
        this.dateValue = this.dateValue.bind(this)
        this.timeValue = this.timeValue.bind(this)
        this.hourValue = this.hourValue.bind(this)
        this.area = this.area.bind(this)
        this.colorChange = this.colorChange.bind(this)
        this.viewBooking = this.viewBooking.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.ll = this.ll.bind(this)


        this.state = {
            feedback: '',
            value: 0,
            open: false,
            date1: '',
            time1: '',
            hour1: '',
            area: '',
            arr: [false, false, false, false, false, false, false, false],
            carr: [],
            detail: [],
            feed: []
            // arr: [],
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };
    async handleOpen() {
        var y = Number(this.state.date1.slice(0, 4))
        var m = Number(this.state.date1.slice(5, 7))
        var d = Number(this.state.date1.slice(8, 10))
        var date = new Date();
        var currentDate = date.getDate()
        var currentMonth = date.getMonth() + 1;
        var currentYear = date.getFullYear();
        var currentHours = date.getHours();
        var currentMin = date.getMinutes()
        var d1 = new Date();
        d1.setFullYear(y)
        d1.setMonth(m - 1)
        d1.setDate(d)
        if (this.state.date1) {
            if (this.state.time1) {
                if (this.state.hour1) {
                    if (this.state.area) {
                        //********************Main work
                        if (d1.getTime() >= date.getTime()) {
                            if ((this.state.time1 + this.state.hour1) <= 18) {
                                var p = Fire.database().ref("slotArray")
                                var dup = [];
                                await p.once('value', (data) => {
                                    if (data.val()) {
                                        var carr = Object.entries(data.val())
                                        var pot;
                                        for (var i = 0; i < carr.length; i++) {
                                            if (carr[i][0] == this.state.area) {

                                                pot = Object.entries(carr[i][1])

                                            }
                                        }
                                        var myflag = false;
                                        console.log(pot)
                                        for (var p = 0; p < pot.length; p++) {
                                            if (this.state.date1 == pot[p][0]) {
                                                myflag = true
                                                dup = pot[p][1].arr
                                                this.state.carr = dup
                                                // console.log(this.state.date1)
                                                console.log("found")
                                            }
                                        }
                                        if (myflag == false) {
                                            var l = Fire.database().ref("slotArray/" + this.state.area)
                                            l.child(this.state.date1).set({
                                                arr: this.state.arr
                                            })
                                            this.handleOpen()
                                        }
                                    }
                                })

                                setTimeout(() => {
                                    console.log(this.state.carr)
                                    this.setState({ open: true });
                                }, 3000);

                                // var r = Fire.database().ref("slotArray")
                                // r.on('value', (data) => {
                                //     if (data.val()) {
                                //         var carr = Object.entries(data.val())
                                //         var a = this.state.arr
                                //         var f = false
                                //         for (var i = 0; i < carr.length; i++) {
                                //             if (carr[i][0] == this.state.area) {
                                //                 f = true
                                //                 this.setState({
                                //                     carr: carr[i][1].arr
                                //                 })

                                //             }
                                //         }
                                //         if (f == false) {
                                //             var m = [false, false, false, false, false, false, false, false]
                                //             r.child(this.state.area).update({
                                //                 arr: m
                                //             })
                                //         }
                                //     }
                                // })
                                // if (this.state.carr) {
                                //     for (var o = 0; o < this.state.carr.length; o++) {
                                //         if (this.state.carr[o] === true) {
                                //             document.getElementById("b0").style.backgroundColor = "red"
                                //             console.log(o)
                                //         }
                                //     }
                                // }
                                // console.log(this.state.carr)






                                // console.log(this.state.carr)
                            }
                            else {
                                alert("Time should not be exceed 18:00 hrs")
                            }
                        }
                        else {
                            alert("Selected date should be current or future")
                        }



                    }
                    else {
                        alert("Please choose the Area")

                    }
                }
                else {
                    alert("Please choose the Hour")

                }
            }
            else {
                alert("Please choose the Time")

            }
        }
        else {
            alert("Please choose the Date")
        }
    }





    handleClose = () => {
        this.setState({ open: false });
    }

    logout() {
        Fire.auth().signOut().then(() => {
            this.props.history.push("/")
        })
    }
    submitFeedback() {
        this.setState({
            feedback: this.input.value
        })
        
        if (this.input.value) {
            var date = new Date();
            var currentDate = date.getDate()
            var currentMonth = date.getMonth() + 1;
            var currentYear = date.getFullYear();
            var currentHours = date.getHours();
            var currentMin = date.getMinutes()
            
            setTimeout(() => {
                var ref = Fire.database().ref("feedback");
                var uidemail = Fire.auth().currentUser.email;
                ref.push({
                    email: uidemail,
                    feedback: this.state.feedback,
                    date: currentDate + "/" + currentMonth + "/" + currentYear,
                    time: currentHours + ":" + currentMin
                })
                this.input.value = ''
            }, 2000)
                alert("submitted")
            }
            else {
                alert("Please fill the feedback form first")
            }

    }
    dateValue(date1) {
        this.setState({
            date1
        })

    }
    timeValue(time1) {
        this.setState({
            time1
        })

    }
    hourValue(hour1) {
        this.setState({
            hour1
        })

    }
    area(area) {
        this.setState({
            area
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
    ll(ca) {
        console.log(ca)
        for (var i = 0; i < ca.length; i++) {
            if (ca[i] == true) {
                if (i < 8) {
                    let id = "b" + 1;
                    document.getElementById(id).style.backgroundColor = "red"
                }
            }
        }
    }
    colorChange(a, index, slot) {
        alert("booked")
        var arr = this.state.carr;
        arr[index] = true
        var ref = Fire.database().ref("slotArray/" + this.state.area)
        ref.child(this.state.date1).update({
            arr
        })
        console.log(this.state.carr[index])
        document.getElementById(a).style.backgroundColor = "red"
        document.getElementById(a).style.border = "5px inset lightgray"
        document.getElementById(a).setAttribute("disabled", "disabled")

        var book = Fire.database().ref("booked")
        book.push({
            email: Fire.auth().currentUser.email,
            date: this.state.date1,
            time: this.state.time1,
            hours: this.state.hour1,
            area: this.state.area,
            slot: slot
        })


    }
    render() {
        const { classes } = this.props;
        const { value } = this.state;
        var date = new Date();
        var currentDate = date.getDate()
        var currentMonth = date.getMonth() + 1;
        var currentYear = date.getFullYear();
        var currentHours = date.getHours();
        var currentMin = date.getMinutes()
        return (
            <div className="main">
                <div className="main1">
                    <ButtonAppBar top1='Real-time Parking Booking System (Student)' />
                    <div style={{ width: "62%", height: "500px", margin: "45px auto", backgroundColor: 'white', }}>
                        <div className={classes.root} >
                            <AppBar position="static" style={{ backgroundColor: "#673ab7" }}>
                                <Tabs value={value} onChange={this.handleChange} style={{ margin: "auto", textAlign: "center" }}>
                                    <Tab label="Book Parking" className={classes.grew} />
                                    <Tab label="View Booking"
                                        onClick={this.viewBooking}
                                        className={classes.grew} />
                                    <Tab label="Feedback"

                                        className={classes.grew} />
                                    <Tab label="Logout" onClick={this.logout} className={classes.grew} />

                                </Tabs>
                            </AppBar>
                            {value === 0 &&
                                <TabContainer>
                                    {/* Book Parking */}
                                    <div style={{ width: "80%", margin: "30px auto", height: "200px" }}>
                                        {/* col1 */}
                                        <div >
                                            {/* ************Floors**************************************************** */}

                                            <div style={{ display: "inline-block", width: "49.7%", height: "120px" }}>
                                                <p style={{ width: "60%", textAlign: "center", color: "#673ab7", margin: "auto", fontWeight: "bold", fontSize: "1.3em" }}>Select Area</p>
                                                <form autoComplete="off" style={{ width: "48%", paddingLeft: "20px", margin: "auto" }}>
                                                    <FormControl className={classes.formControl} style={{ width: "92%" }}>
                                                        <InputLabel htmlFor="demo-controlled-open-select">Choose Area</InputLabel>
                                                        <Select
                                                            // open={this.state.open}
                                                            // onClose={this.handleClose}
                                                            // onOpen={this.handleOpen}
                                                            // value={this.state.age}
                                                            // onChange={this.handleChange}
                                                            inputProps={{
                                                                //     name: 'age',
                                                                id: 'demo-controlled-open-select',
                                                            }}
                                                            onChange={(e) => {
                                                                this.area(e.target.value)
                                                            }}
                                                            value={this.state.area}

                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value={"defence"}>Defence</MenuItem>
                                                            <MenuItem value={"tariq road"}>Tarig Road</MenuItem>
                                                            <MenuItem value={"clifton"}>Clifton</MenuItem>
                                                            <MenuItem value={"sadar"}>Sadar</MenuItem>
                                                            <MenuItem value={"tower"}>Tower</MenuItem>
                                                            <MenuItem value={"nazimabad"}>Nazimabad</MenuItem>


                                                        </Select>
                                                    </FormControl>
                                                </form>
                                            </div>
                                            {/* ************Date**************************************************** */}

                                            <div style={{ display: "inline-block", width: "49.7%", height: "120px" }}>
                                                <p style={{ width: "60%", textAlign: "center", color: "#673ab7", margin: "auto", fontWeight: "bold", fontSize: "1.3em" }}>Select Date</p>
                                                <form autoComplete="off" style={{ width: "50%", paddingLeft: "20px", margin: "auto" }}>
                                                    <FormControl className={classes.formControl}>
                                                        {/* <InputLabel htmlFor="demo-controlled-open-select">Date</InputLabel> */}
                                                        <TextField
                                                            id="date"
                                                            label="Date"
                                                            type="date"
                                                            className={classes.textField}
                                                            style={{ width: "86%" }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            onChange={(e) => {
                                                                this.dateValue(e.target.value)
                                                            }}
                                                        />
                                                    </FormControl>
                                                </form>
                                            </div>
                                        </div>
                                        {/* col2 */}
                                        <div style={{ marginTop: "-15px" }}>
                                            {/* ************Time**************************************************** */}
                                            <div style={{ display: "inline-block", width: "49.7%", height: "120px", }}>
                                                <p style={{ width: "60%", textAlign: "center", color: "#673ab7", margin: "auto", fontWeight: "bold", fontSize: "1.3em" }}>Select Time</p>
                                                <form autoComplete="off" style={{ width: "50%", paddingLeft: "20px", margin: "auto" }}>
                                                    <FormControl className={classes.formControl}>
                                                        <InputLabel htmlFor="demo-controlled-open-select">Time</InputLabel>
                                                        <Select
                                                            // open={this.state.open}
                                                            // onClose={this.handleClose}
                                                            // onOpen={this.handleOpen}
                                                            // value={this.state.age}
                                                            // onChange={this.handleChange}
                                                            inputProps={{
                                                                //     name: 'age',
                                                                id: 'demo-controlled-open-select',
                                                            }}
                                                            onChange={(e) => {
                                                                this.timeValue(e.target.value)
                                                            }}
                                                            value={this.state.time1}
                                                        >
                                                            <MenuItem value={0}>
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value={9}>09:00</MenuItem>
                                                            <MenuItem value={10}>10:00</MenuItem>
                                                            <MenuItem value={11}>11:00</MenuItem>
                                                            <MenuItem value={12}>12:00</MenuItem>
                                                            <MenuItem value={13}>13:00</MenuItem>
                                                            <MenuItem value={14}>14:00</MenuItem>
                                                            <MenuItem value={15}>15:00</MenuItem>
                                                            <MenuItem value={16}>16:00</MenuItem>
                                                            <MenuItem value={17}>17:00</MenuItem>
                                                            <MenuItem value={18}>18:00</MenuItem>

                                                        </Select>
                                                    </FormControl>
                                                </form>
                                            </div>
                                            {/* *********************hours**********************                            */}
                                            <div style={{ display: "inline-block", width: "49.7%", height: "120px" }}>
                                                <p style={{ width: "60%", textAlign: "center", color: "#673ab7", margin: "auto", fontWeight: "bold", fontSize: "1.3em" }}>Select Hours</p>
                                                <form autoComplete="off" style={{ width: "50%", paddingLeft: "20px", margin: "auto" }}>
                                                    <FormControl className={classes.formControl}>
                                                        <InputLabel htmlFor="demo-controlled-open-select">Hours</InputLabel>
                                                        <Select
                                                            // open={this.state.open}
                                                            // onClose={this.handleClose}
                                                            // onOpen={this.handleOpen}
                                                            // value={this.state.age}
                                                            // onChange={this.handleChange}
                                                            inputProps={{
                                                                //     name: 'age',
                                                                id: 'demo-controlled-open-select',
                                                            }}
                                                            onChange={(e) => {
                                                                this.hourValue(e.target.value)
                                                            }}
                                                            value={this.state.hour1}

                                                        >
                                                            <MenuItem value={0}>
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value={1}>1 hr</MenuItem>
                                                            <MenuItem value={2}>2 hrs</MenuItem>
                                                            <MenuItem value={3}>3 hrs</MenuItem>
                                                            <MenuItem value={4}>4 hrs</MenuItem>
                                                            <MenuItem value={5}>5 hrs</MenuItem>
                                                            <MenuItem value={6}>6 hrs</MenuItem>

                                                        </Select>
                                                    </FormControl>
                                                </form>
                                            </div>
                                        </div>
                                        <div style={{ width: "100%", paddingLeft: "100px", marginTop: "30px" }}>
                                            <Button1
                                                Ï handleOpen={() => {
                                                    this.handleOpen()
                                                    // setTimeout(() => {
                                                    //     this.ll(this.state.carr)
                                                    // }, 3000);
                                                }} name="Select Slot" color="white" bgcolor="#673ab7" width1="70%" />
                                        </div>
                                    </div>
                                    {/* Modal */}


                                    <div>
                                        <Modal
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                            open={this.state.open}
                                            onClose={this.handleClose}
                                        >
                                            <div className={classes.paper}>
                                                {this.state.carr.map((val, i) => {
                                                    return (<button onClick={() => {
                                                        this.colorChange(`b${i}`, i, `slot ${i + 1}`)

                                                    }} id={`b${i}`} disabled={val}
                                                        style={{
                                                            width: "80px", height: "60px",
                                                            backgroundColor: val ? "red" : "#673ab7",
                                                            border: val ? "5px inset lightgray" : '',

                                                            outline: "none", color: "white", borderRadius: "10px", margin: "7px"
                                                        }}>Slot {i + 1}</button>

                                                    )
                                                })}
                                                {/* <button onClick={() => {
                                                    this.colorChange("b1", 1, "slot 2")
                                                }} id="b1" className="b1" style={{ width: "80px", height: "60px", backgroundColor: "#673ab7", outline: "none", color: "white", borderRadius: "10px", margin: "7px" }}>Slot 2</button>
                                                <button onClick={() => {
                                                    this.colorChange("b2", 2, "slot 3")
                                                }} id="b2" className="b2" style={{ width: "80px", height: "60px", backgroundColor: "#673ab7", outline: "none", color: "white", borderRadius: "10px", margin: "7px" }}>Slot 3</button>
                                                <button onClick={() => {
                                                    this.colorChange("b3", 3, "slot 4")
                                                }} id="b3" className="b3" style={{ width: "80px", height: "60px", backgroundColor: "#673ab7", outline: "none", color: "white", borderRadius: "10px", margin: "7px" }}>Slot 4</button>
                                                <button onClick={() => {
                                                    this.colorChange("b4", 4, "slot 5")
                                                }} id="b4" className="b4" style={{ width: "80px", height: "60px", backgroundColor: "#673ab7", outline: "none", color: "white", borderRadius: "10px", margin: "7px" }}>Slot 5</button>
                                                <button onClick={() => {
                                                    this.colorChange("b5", 5, "slot 6")
                                                }} id="b5" className="b5" style={{ width: "80px", height: "60px", backgroundColor: "#673ab7", outline: "none", color: "white", borderRadius: "10px", margin: "7px" }}>Slot 6</button>
                                                <button onClick={() => {
                                                    this.colorChange("b6", 6, "slot 7")
                                                }} id="b6" className="b6" style={{ width: "80px", height: "60px", backgroundColor: "#673ab7", outline: "none", color: "white", borderRadius: "10px", margin: "7px" }}>Slot 7</button>
                                                <button onClick={() => {
                                                    this.colorChange("b7", 7, "slot 8")
                                                }} id="b7" className="b7" style={{ width: "80px", height: "60px", backgroundColor: "#673ab7", outline: "none", color: "white", borderRadius: "10px", margin: "7px" }}>Slot 8</button> */}

                                            </div>
                                        </Modal>

                                    </div>
                                </TabContainer>}


                            {value === 1 &&
                                <TabContainer>
                                    <div>
                                        <table style={{ width: "90%", margin: "auto" }}>
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
                                    <textarea style={{ width: "70%", height: "260px", marginLeft: "110px" }}
                                        placeholder="Write your feedback here"
                                        ref={(val) => {
                                            this.input = val

                                        }}
                                    ></textarea>
                                    <button
                                        style={{ backgroundColor: "#673ab7", color: "white", height: "50px", border: "1px solid #673ab7", boxShadow: "2px 2px 2px black", position: "relative", left: "525px" }}
                                        onClick={this.submitFeedback}
                                    >Submit Your Feedback</button>
                                </TabContainer>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(Student);




















