import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class NavBar extends React.Component{
  render(){
  return (
      <React.Fragment>
      <Navbar bg="dark" variant="dark" sticky="top">
      <Navbar.Brand>Horizon</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      {this.props.label}
      </Navbar.Collapse>
      </Navbar>
      </React.Fragment>
    );
  }
}

export default NavBar;
