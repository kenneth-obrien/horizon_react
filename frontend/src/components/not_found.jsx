import React from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class NotFound extends React.Component{

  render(){
  return (
    <React.Fragment>
     <center>
      <h1>Page Not Found</h1>
    </center>
    </React.Fragment>
    );
  }
}

export default withRouter(NotFound);
