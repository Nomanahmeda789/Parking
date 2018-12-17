import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Button1 from '../Material/button'
import ButtonAppBar from '../Material/Appbar'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fire from './Fire'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.textname = this.textname.bind(this)
        this.textemail = this.textemail.bind(this)
        this.textpass = this.textpass.bind(this)
        this.textphone = this.textphone.bind(this)
        this.signup = this.signup.bind(this)

        this.state = {
            name: '',
            email: '',
            pass: '',
            phone: ''
        }
    }
    textname(n) {
        this.setState({
            name: n
        })
    }
    textemail(e) {
        this.setState({
            email: e
        })
    }
    textpass(p) {
        this.setState({
            pass: p
        })
    }
    textphone(p) {
        this.setState({
            phone: p
        })
    }
    signup() {
        if (this.state.name.length > 3 && this.state.phone.length > 3) {
            Fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
                .then(()=>{
                    var ref=Fire.database().ref("students")
                    ref.push({
                        name:this.state.name,
                        email:this.state.email,
                        pass:this.state.pass,
                        phone:this.state.phone
                    })
                    this.props.history.push('/')
                })
                .catch((e) => {
                    alert(e.message)
                })


        }
        else {
            alert("please fill the form correctly")
        }
        // console.log(this.state.name)
        // console.log(this.state.email)
        // console.log(this.state.pass)
        // console.log(this.state.phone)
    }

    render() {
        return (
            <div className="main">
                <div className="main1">
                    <ButtonAppBar top1='Real-time Parking Booking System' />
                    <div style={{ width: "32%", height: "450px", margin: "60px auto", backgroundColor: 'white', borderRadius: "20px" }}>
                        <h1 style={{ textAlign: "center", fontFamily: "Vidaloka", padding: "5px 0px 0px 0px", color: "#673ab7", fontSize: "2.3em" }}>Sign Up</h1>
                        <form style={{ display: 'flex', flexWrap: 'wrap', }} noValidate autoComplete="off">

                            <TextField
                                // id="outlined-password-input"
                                label="Name"
                                type="text"
                                autoComplete="name"
                                margin="normal"
                                variant="outlined"
                                style={{ width: "80%", margin: "auto", }}
                                onChange={(a) => {
                                    this.textname(a.target.value)
                                }}
                            />
                            <TextField
                                // id="outlined-email-input"
                                label="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                                style={{ width: "80%", margin: "10px auto", fontSize: "4em" }}
                                onChange={(a) => {
                                    this.textemail(a.target.value)
                                }}
                            />

                            <TextField
                                // id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                style={{ width: "80%", margin: "0px auto", }}
                                onChange={(a) => {
                                    this.textpass(a.target.value)
                                }}
                            />

                            <TextField
                                // id="outlined-password-input"
                                label="Phone No*"
                                type="text"
                                autoComplete="number"
                                margin="normal"
                                variant="outlined"
                                style={{ width: "80%", margin: "10px auto", }}
                                onChange={(a) => {
                                    this.textphone(a.target.value)
                                }}
                            />
                        </form>
                        <div style={{ width: "80%", margin: "0px auto" }}>
                            <Button1 handleOpen={this.signup} name="Sign Up" bgcolor="#673ab7" width1="100%" height1="60px" />
                            <label style={{ fontSize: "0.9em", position: "relative", left: "155px", display: "inline-block", marginTop: "10px" }}>Already Have account ?
                                 <a style={{color:"#673ab7",fontWeight:"bold"}} onClick={() => this.props.history.push("/")} > Sign In</a>
                            </label>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

export default Signup;
