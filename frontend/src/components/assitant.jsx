import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { toast } from 'react-toastify';
import image from './robot.png';
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition();

class Assitant extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      input: "",
      response: "",
      listening: false,
    };
  }

  handleWorkFlow = () => {
    recognition.start();
    recognition.onresult = (event) => {
      let input = event.results[0][0].transcript;
      recognition.stop();
      this.knowledgeRequestBackend(input);
      this.setState({input: input});
   }
  }

  handleSpeech = (response) => {
    const assit = new SpeechSynthesisUtterance();
    const voices = window.speechSynthesis.getVoices();
    assit.voice = voices[4]; // Female Voice
    assit.text = response;
    window.speechSynthesis.speak(assit);
  }

  knowledgeRequestBackend = async(input) => {
    const url = "http://localhost:8000/api/knowledge/test-analyse-input/";
    const payload = {
      text: input,
    }
    const headers = {
      headers: { 'Content-Type': 'application/json',
                  'Authorization': `Token ${this.props.token}`, }}
    axios.post(url,payload,headers).then(res => {
      this.handleSpeech(res.data.msg);
    }).catch(error => {
    console.log(error.response)
  });
  }



  render (){
    return (
      <Card style={{height:"10rem", border: "none", marginBottom:"0.5rem"}}>
      <Card.Body>
      <center>
      <img src={image} style={{display: "inline-flex", height: "150px",  width: "150px"}} />
      <IconButton style={{display: "inline-block"}} onClick={() => this.handleWorkFlow()}> <KeyboardVoiceIcon fontSize="large" color="action"/> </IconButton>
      <Card.Text> {this.state.input} </Card.Text>
      </center>
      </Card.Body>
      </Card>
    );
  }
}

export default withRouter(Assitant);
