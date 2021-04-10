import React from 'react';
import NavBar from './components/nav_bar';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Button from 'react-bootstrap/Button';
import NotFound from './components/not_found';
import axios from 'axios';
import jwt from 'jwt-simple';
import compactDecrypt from 'jose/dist/browser/jwe/compact/decrypt.js';
import compactEncrypt from 'jose/dist/browser/jwe/compact/encrypt.js';
import parseJwk from 'jose/dist/browser/jwk/parse';
import generateKeyPair from 'jose/dist/browser/util/generate_key_pair.js';
import fromKeyLike from 'jose/dist/browser/jwk/from_key_like.js';
import { withRouter, Switch, Route} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      token: '',
      userPrvKey: '',
      userPubKey: '',
      serverPubKey: '',
    }
  }

  async decrypt(jwe_token) {
      const decoder = new TextDecoder();
      const jwe = jwe_token;
      const key = this.state.userPrvKey
      const {plaintext, protectedHeader} = await compactDecrypt(jwe, key);
      const signedPayload = await decoder.decode(plaintext);
      console.log(signedPayload);
      const {token , msg} = jwt.decode(signedPayload, "8kypu93zgd9w-=(7cvao=f3n*$to(gq+^178p##7=1+@x2@gn0");
      this.setState({token: token});
      this.setState({loggedIn: true});
      this.props.history.push("/dashboard");

    }

 async encrypt(payload){
      const encoder = new TextEncoder();
      const json_key = JSON.parse(this.state.serverPubKey);
      const publicKey = await parseJwk(json_key, 'RSA-OAEP-256');
      const token = jwt.encode(payload, "8kypu93zgd9w-=(7cvao=f3n*$to(gq+^178p##7=1+@x2@gn0");
      console.log("JWT THE DATA IS SIGNED");
      console.log(token);
      const jwe = await new compactEncrypt(encoder.encode(token)).setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM', username: this.state.username}).encrypt(publicKey)
      console.log("JWE THE DATA THAT IS SENT")
      console.log(jwe);
      return jwe;
 }

 async generalEncrypt(payload, key, username){
      const encoder = new TextEncoder();
      const json_key = JSON.parse(key);
      const publicKey = await parseJwk(json_key, 'RSA-OAEP-256');
      const token = jwt.encode(payload, "8kypu93zgd9w-=(7cvao=f3n*$to(gq+^178p##7=1+@x2@gn0");
      console.log("JWT THE DATA IS SIGNED");
      console.log(token);
      const jwe = await new compactEncrypt(encoder.encode(token)).setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM', username: username}).encrypt(publicKey)
      console.log("JWE THE DATA THAT IS SENT")
      console.log(jwe);
      return jwe;
}

async generalDecrypt(jwe_token, key) {
    const decoder = new TextDecoder();
    const jwe = jwe_token;
    const {plaintext, protectedHeader} = await compactDecrypt(jwe, key);
    const signedPayload = await decoder.decode(plaintext);
    const {data, msg}= jwt.decode(signedPayload, "8kypu93zgd9w-=(7cvao=f3n*$to(gq+^178p##7=1+@x2@gn0");
    return data;
  }


  handleUsernameChange = (event) => {
    this.setState({username: event.target.value});
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  handleLogin = async() => {
    const url_login = "http://localhost:8000/api/test-login/";
    const data = {
      username: this.state.username,
      password: this.state.password,
    }
    const jwe = this.encrypt(data);
    const payload = {
      data: await jwe
    }
    const headers = {
      headers: { 'Content-Type': 'application/json',}}
    await axios.post(url_login,payload,headers).then(res => {
      let jwe = res.data.enc;
      this.decrypt(jwe);
    }).catch(error => {
      console.log(error.response);
    });
  }

  handleSubmit = async(event) => {
    event.preventDefault();
    const loggedIn = await this.handleKeyRetrieval();
    console.log("LOG ON ");
    console.log(loggedIn);
    if(loggedIn === false){
      this.handleLogin();
    } else {
      this.notify("You're Already Logged In on Another Device");
    }
  }

async handleKeyRetrieval(){
    const {publicKey, privateKey } = await generateKeyPair('RSA-OAEP-256');
    const publicJwk = await fromKeyLike(publicKey);
    this.setState({userPubKey: publicJwk});
    this.setState({userPrvKey: privateKey})
    const url_key = "http://localhost:8000/api/establish_key/";
    const payload = {
      username: this.state.username,
      key: publicJwk
    }
    let prevLogOn = false;
    const headers = { headers: { 'Content-Type': 'application/json'}}
    await axios.post(url_key,payload,headers).then(res => {
        if(res.data.msg === "error"){
          prevLogOn = true;
        } else if (res.data.msg === "success") {
          this.setState({serverPubKey: res.data.key})
        }
    }).catch(error => {
      console.log(error.response);
    });
    return prevLogOn;
  }

  pushLogin = () => {
    this.props.history.push("/login");
  }

  handleLogout = (event) => {
    const url = "http://localhost:8000/api/logout/";
    const payload = {
      Token: this.state.token,
    }
    const headers = {
      headers: { 'Content-Type': 'application/json',
                  'Authorization': `Token ${this.state.token}`, }}
    axios.post(url,payload,headers).then(res => {
      this.setState({loggedIn: false});
      this.props.history.push("/login");
    }).catch(error => {
    console.log(error.response)
  });
  }

  notify = (message) => {
    toast.configure();
    toast(message);
  }


  handleNavbar = () => {
    let logout = <Button className="btn btn-dark" onClick={this.handleLogout}>Logout</Button> ;
    let login = <Button className="btn btn-dark" onClick={this.pushLogin}>Login</Button>
    if (this.state.loggedIn === true){
      return logout;
    }
    return login;
  }


  render(){
    return (
      <React.Fragment>
        <NavBar label={this.handleNavbar()}/>
        <Switch>
        <Route path="/dashboard"
        render={() => (
          <Dashboard loggedIn={this.state.loggedIn} username={this.state.username} token={this.state.token} encrypt={this.generalEncrypt} decrypt={this.generalDecrypt} privKey={this.state.userPrvKey} serverPubKey={this.state.serverPubKey}/>
          )} exact={true}/>
          <Route path="/login"
          render={() => (
            <Login
              unameChange={this.handleUsernameChange}
              pswdChange={this.handlePasswordChange}
              submit={this.handleSubmit}
              loggedIn={this.state.loggedIn}
              />
           )} exact={true}/>
           <Route path="*"
           render={() => (
             <NotFound />
            )} exact={true}/>
        </Switch>
      </React.Fragment>
    )
  }
}

export default withRouter(App);
