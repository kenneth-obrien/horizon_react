import React from 'react';
import Nav from 'react-bootstrap/Nav';


class SideBar extends React.Component{
  render(){
  return (
    <React.Fragment>
    <Nav defaultActiveKey="/home" className="flex-column">
      <Nav.Link href="/home">Active</Nav.Link>
      <Nav.Link eventKey="link-1">Link</Nav.Link>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav>
      </React.Fragment>
    );
  }
}

export default SideBar;
