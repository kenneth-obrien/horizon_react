import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewsFeed from './news_feed';
import WeatherFeed from './weather_feed';
import Paper from '@material-ui/core/Paper';
import { sizing } from '@material-ui/system';
import Container from 'react-bootstrap/Container';
import NasaFeed from './nasa_feed';
import Clock from './clock';
import ToDoCard from './to_do_card';
import Assitant from './assitant';
import Scheduler from './scheduler';

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {test: "this-is-a-test"};
  }

  async componentDidMount(){
    if(this.props.loggedIn === false){
      this.props.history.push("/login");
    }
  }

  render(){
  return (
  <Container style={{marginTop: "0.5rem"}} fluid>
    <Row>
    <Col>
      <Paper style={{height: "14rem" , border: 'none'}} elevation={10}> <Assitant token={this.props.token}/> </Paper>
      <Paper style={{border: 'none'}} elevation={10}> <Scheduler token={this.props.token}/> </Paper>
    </Col>
    <Col xs={8}>
      <NewsFeed token={this.props.token}/>
      <Row>
        <Col> <Paper style={{height: "24rem", border: 'none', marginTop:"0.5rem"}} elevation={10}> <Clock /> <WeatherFeed token={this.props.token} test={this.state.test}/> </Paper> </Col>
        <Col> <NasaFeed token={this.props.token}/> </Col>
      </Row>
       <ToDoCard token={this.props.token} decrypt={this.props.decrypt} privKey={this.props.privKey} encrypt={this.props.encrypt} serverPubKey={this.props.serverPubKey} username={this.props.username}/>
    </Col>
    </Row>
  </Container>
    );
  }
}

export default withRouter(Dashboard);
