import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import CardColumns from 'react-bootstrap/CardColumns';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import CardDeck from 'react-bootstrap/CardDeck';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';

class Clock extends React.Component{
  constructor(props) {
    super(props);
    this.state = { time: new Date() };
  }
  currentTime() {
    this.setState({ time: new Date() });
  }
  componentDidMount() {
    this.interval = setInterval(() => this.currentTime(), 850);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render(){
  return (
     <center>
     <Typography style={{ paddingTop: "1.5rem"}} variant="h1" component="h1">
     {this.state.time.toLocaleTimeString()}
     </Typography>
     <Typography variant="h5" component="h1">
      Birmingham, UK
     </Typography>
     </center>
    );
  }
}

export default withRouter(Clock);
