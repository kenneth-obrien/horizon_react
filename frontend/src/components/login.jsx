import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom'


class Login extends React.Component{
  render(){
  return (
    <React.Fragment>
     <div className='container w-25' style={{ marginTop: "300px"}}>
      <Form onSubmit={this.props.submit}>
       <Form.Control type="username" placeholder="Username" onChange={this.props.unameChange}/>
        <Form.Group controlId="formBasicPassword">
         <Form.Control style={{ marginTop: "2%"}} type="password" placeholder="Password" onChange={this.props.pswdChange} />
        </Form.Group>
         <center>
          <Button variant="dark btn-block" type="submit">Submit</Button>
         </center>
       </Form>
     </div>
    </React.Fragment>
    );
  }
}

export default Login;
