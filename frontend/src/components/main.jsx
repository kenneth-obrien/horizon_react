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



class Main extends React.Component{
  constructor(props) {
    super(props);
  }

  async componentDidMount(){
    if(this.props.loggedIn === false){
      this.props.history.push("/login");
    }
  }

  render(){
  return (
    <Container style={{marginTop: "2rem"}}>
    <NewsFeed token={this.props.token}/>
    <Row style={{marginTop: "1rem"}}>
      <Col> <WeatherFeed token={this.props.token}/> </Col>
      <Col> <h1> SERVICE 2 </h1> </Col>
    </Row>
    </Container>
    );
  }
}

export default withRouter(Main);
