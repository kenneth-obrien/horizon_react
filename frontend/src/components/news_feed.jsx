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

class NewsFeed extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }

  async componentDidMount(){
    const config = {
      headers: {'Authorization': `Token ${this.props.token}`},
    }
    await axios.get('http://localhost:8000/api/news/', config).then(res => {
      let news = this.state.news;
      res.data.msg.map(current => {
        news.push({title: current.title, id: current.id, summary: current.summary});
        this.setState({news})
      });
      console.log(this.state);
    }).catch(error => {
    console.log(error.response)
    });
   }

  render(){

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
    }
  }
  return (

    <Paper style={{padding: "1rem"}}>
    <Carousel  infinite={true} autoPlay={this.props.deviceType !== "mobile" ? true : false} autoPlaySpeed={6000} responsive={responsive}>
     {this.state.news.map( headline =>
      <center>
      <Card style={{height:"10rem", border: "none"}} key={headline.id}>
      <Card.Body>
      <Card.Title>{headline.title}</Card.Title>
      <Card.Text > {headline.summary}</Card.Text>
      </Card.Body>
      </Card>
      </center>
     )}
     </Carousel>
     </Paper>
    );
  }
}

export default withRouter(NewsFeed);
