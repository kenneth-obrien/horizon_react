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
import IconButton from '@material-ui/core/IconButton';
import CachedIcon from '@material-ui/icons/Cached';


class WeatherFeed extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      temp: '',
      status: '',
      url: '',
      wind: '',
      like: '',
    };
  }

  async componentDidMount(){
    const config = {
      headers: {'Authorization': `Token ${this.props.token}`},
    }
    await axios.get('http://localhost:8000/api/weather/', config).then(res => {
      this.setState({temp: res.data.temp});
      this.setState({status: res.data.status});
      this.setState({url: res.data.url});
      this.setState({wind: res.data.wind});
      this.setState({like: res.data.like});
    }).catch(error => {
    console.log(error.response)
    });
   }

   handleUpdate = async() => {
     const config = {
       headers: {'Authorization': `Token ${this.props.token}`},
     }
     await axios.get('http://localhost:8000/api/weather/', config).then(res => {
       this.setState({temp: res.data.temp});
       this.setState({status: res.data.status});
       this.setState({url: res.data.url});
       this.setState({wind: res.data.wind});
       this.setState({like: res.data.like});
     }).catch(error => {
     console.log(error.response)
     });
   }

  render(){
  return (
     <React.Fragment>
     <IconButton color="primary" size="small" onClick={this.handleUpdate}><CachedIcon /> </IconButton>
     <CardGroup>
      <Card style={{height:"9rem", border: "none"}}>
      <Card.Body>
      <center>
      <img style={{display: "inline-flex"}} src={this.state.url}  alt="loading..."/>
      <Card.Title style={{display: "block"}}>{this.state.status}</Card.Title>
      </center>
      </Card.Body>
      </Card>
      <Card style={{height:"9rem", border: "none", marginBottom:"0.5rem"}}>
      <Card.Body>
      <Card.Title style={{display: "block"}}>Current Data</Card.Title>
      <Card.Text> {`Temperature ${this.state.temp}°C `} </Card.Text>
      <Card.Text> {`Wind Speed ${this.state.wind} MPH `} </Card.Text>
      <Card.Text> {`Feels Like ${this.state.like}°C `} </Card.Text>
      </Card.Body>
      </Card>
      </CardGroup>
     </React.Fragment>
    );
  }
}

export default withRouter(WeatherFeed);
