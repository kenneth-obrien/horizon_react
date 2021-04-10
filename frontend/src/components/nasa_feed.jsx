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
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

class NasaFeed extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      explanation: '',
    };
  }

  async componentDidMount(){
    const config = {
      headers: {'Authorization': `Token ${this.props.token}`},
    }
    await axios.get('http://localhost:8000/api/nasa/', config).then(res => {
        this.setState({url: res.data.url});
        this.setState({explanation: res.data.explanation});
    }).catch(error => {
    console.log(error.response)
    });
   }


  render(){
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Explanation</Popover.Title>
      <Popover.Content>
        {this.state.explanation}
      </Popover.Content>
    </Popover>
  );

  return (
     <Paper style={{border: 'none'}} elevation={10}>
     <OverlayTrigger
     placement="left"
     delay={{ show: 250, hide: 400 }} overlay={popover}>
     <Card style={{height:"24rem", border: "none", marginTop:"0.5rem"}}>
       <img style={{display: "inline-flex", maxHeight: "100%",  maxWidth: "100%", borderRadius: "4px"}} src={this.state.url} alt="loading..."/>
     </Card>
     </OverlayTrigger>
     </Paper>
    );
  }
}

export default withRouter(NasaFeed);
