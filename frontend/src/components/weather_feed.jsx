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


class WeatherFeed extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      temp: '',
      status: '',
    };
  }

  async componentDidMount(){
    const config = {
      headers: {'Authorization': `Token ${this.props.token}`},
    }
    await axios.get('http://localhost:8000/api/weather/', config).then(res => {
      this.setState({temp: res.data.temp});
      this.setState({status: res.data.status});
      console.log(this.state);
    }).catch(error => {
    console.log(error.response)
    });
   }

  render(){
  return (
     <Paper style={{padding: "1rem"}}>
      <center>
      <Card style={{height:"10rem", border: "none"}}>
      <Card.Body>
      <Card.Title>{this.state.status}</Card.Title>
      <Card.Text> {`${this.state.temp}°C `} </Card.Text>
      </Card.Body>
      </Card>
      </center>
     </Paper>
    );
  }
}

export default withRouter(WeatherFeed);
