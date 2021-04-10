import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'react-multi-carousel/lib/styles.css';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CachedIcon from '@material-ui/icons/Cached';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker, MuiPickersUtilsProvider, TimePicker, DatePicker} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

class Scheduler extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      events : [],
      open: false,
      selectedDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      title: "",
      finalDate: "",
      finalEndTime: "",
      finalStartTime: "",
    };
  }

  async componentDidMount(){
    let data;
    const config = {
      headers: {'Authorization': `Token ${this.props.token}`},
    }
    await axios.get('http://localhost:8000/api/events/', config).then(res => {
        data = res.data.msg;
    }).catch(error => {
    console.log(error.response)
    });
    this.renderEvents(data);
  }

  renderEvents = (data) => {
    let events = this.state.events;
    data.map(current => {
      events.push({id: current.title, title: current.title, date: current.date, start_time: current.start_time, end_time: current.end_time});
      this.setState({events});
    });
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleDateChange = (date) => {
    // add 1 to month since its an array and starts from 0
    const finaldate = date.getFullYear() + '-' +  (date.getMonth() + 1)  + '-' + date.getDate();
    this.setState({selectedDate: date});
    this.setState({finalDate: finaldate});
    // console.log(this.state.finalDate);
  }

  // Start Time hence STime
  handleSTimeChange = (time) => {
    const finaltime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    this.setState({startTime: time});
    this.setState({finalStartTime: finaltime});
    // console.log(this.state.startTime);
  }

  // End Time hence ETime
  handleETimeChange = (time) => {
    const finaltime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    this.setState({endTime: time})
    this.setState({finalEndTime: finaltime});
    // console.log(this.state.endTime);
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  handleSubmit = async(event) => {
    event.preventDefault();
    console.log(this.state);
    let data = {
      "title": this.state.title,
      "date": this.state.finalDate,
      "start_time": this.state.finalStartTime,
      "end_time": this.state.finalEndTime
    }
    await this.addBackendEvent(data);
    this.handleClose();
  }

  addBackendEvent = async(object) => {
    const url = "http://localhost:8000/api/events/";
    const headers = {
      headers: { 'Content-Type': 'application/json',
                  'Authorization': `Token ${this.props.token}`, }}
    axios.post(url,object,headers).then(res => {
      console.log(res.data.msg)
    }).catch(error => {
    console.log(error.response)
   });
  }

  render(){
    if(this.state.open === false){
      return (
        <Card style={{height:"24rem", border: "none", marginTop:"0.5rem"}}>
        <AddIcon onClick={this.handleOpen}/>
        {this.state.events.map(element =>
          <div key={element.id}>
          <center>
          <Card.Text>{element.title} {element.date} {element.start_time} {element.end_time}</Card.Text>
          </center>
          </div>
        )}
        </Card>
      )
    } else {
      return (
      <Card style={{height:"24rem", border: "none", marginTop:"0.5rem"}}>
      <AddIcon onClick={this.handleClose}/>
      <center>
      <form noValidate>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TextField
       label="Event Title"
       defaultValue="Example Title"
       style={{top: 35, left: 225, position: "absolute"}}
       onChange={this.handleTitleChange}
      />
      <DatePicker
        style={{top: 110, left: 225, position: "absolute"}}
        label="Event Date"
        clearable
        value={this.state.selectedDate}
        onChange={this.handleDateChange}
      />
      <TimePicker
        style={{top: 185, left: 225, position: "absolute"}}
        ampm={false}
        label="Event Start Time"
        value={this.state.startTime}
        onChange={this.handleSTimeChange}
       />
       <TimePicker
        style={{top: 260, left: 225, position: "absolute"}}
        ampm={false}
        label="Event End Time"
        value={this.state.endTime}
        onChange={this.handleETimeChange}
       />
      </MuiPickersUtilsProvider>
      <Button style={{top: 330, left: 225, position: "absolute"}} size="sm" variant="dark" onClick={this.handleSubmit}>Submit</Button>
      </form>
      </center>
      </Card>
    )
    }
  }
}

export default withRouter(Scheduler);
