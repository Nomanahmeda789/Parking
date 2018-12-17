import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Button1 from '../Material/button'
import ButtonAppBar from '../Material/Appbar'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fire from './Fire'

class Main extends Component {
    constructor(){
        super();
        this.textemail = this.textemail.bind(this)
        this.textpass = this.textpass.bind(this)
        this.signin=this.signin.bind(this)
        this.state={
            email:'',
            pass:''
        }
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
    signin(){
        Fire.auth().signInWithEmailAndPassword(this.state.email,this.state.pass)
        .then(()=>{
            if(this.state.email=="admin@gmail.com"){
                this.props.history.push('/Admin')
            }
            else{
                
                // var uid=Fire.auth().currentUser.uid;
                // console.log(uid)
                // console.log(Fire.auth().currentUser.email)
                // console.log(Fire.auth().currentUser)
                
                
                this.props.history.push('/Student')                
            }
        })
        .catch(()=>{

        })
    }
    render() {
        return (
            <div className="main">
                <div className="main1">
                    <ButtonAppBar top1='Real-time Parking Booking System' />
                    <div style={{ width: "32%", height: "450px", margin: "70px auto", backgroundColor: 'white', borderRadius: "20px" }}>
                        <h1 style={{ textAlign: "center", fontFamily: "Vidaloka", padding: "30px 0px 0px 0px", color: "#673ab7", fontSize: "2.3em" }}>Login</h1>
                        <form style={{ display: 'flex', flexWrap: 'wrap', }} noValidate autoComplete="off">
                            <TextField
                                id="outlined-email-input"
                                label="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                                style={{ width: "80%", margin: "20px auto", fontSize: "4em" }}
                                onChange={(a)=>{
                                    this.textemail(a.target.value)
                                }}
                            />

                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                style={{ width: "80%", margin: "auto", }}
                                onChange={(a)=>{
                                    this.textpass(a.target.value)
                                }}
                            />
                        </form>
                        <div style={{ width: "80%", margin: "20px auto" }}>
                            <Button1  handleOpen={this.signin}  
                            name="Sign In" bgcolor="#673ab7" width1="100%" height1="60px" />
                            <label style={{ fontSize: "0.9em", position: "relative", left: "155px", display: "inline-block", marginTop: "10px" }}>Don't Have account ?
                                 <a style={{color:"#673ab7",fontWeight:"bold"}} onClick={() => this.props.history.push("/signup")} > Sign Up</a>
                            </label>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

export default Main;
