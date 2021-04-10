import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CachedIcon from '@material-ui/icons/Cached';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup';
import AddIcon from '@material-ui/icons/Add';
import Carousel from 'react-multi-carousel';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';


class ToDoCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      toDoList: [],
      item: "",
    };
  }

  addItem = async(event) => {
    event.preventDefault();
    let toDoList = this.state.toDoList;
    let item = this.state.item;
    if(toDoList.length === 7){
      toast.configure();
      toast("Too Many Tasks Finish and/or Remove Some Tasks Before Adding More");
    } else {
      let data = {id: item, title: item};
      toDoList.push(data);
      this.setState({toDoList});
      await this.addBackendItem(data);
   }
  }

  deleteItem = async(itemId) => {
    const item = this.state.toDoList.find(element => element.id === itemId);
    const elements = this.state.toDoList.filter(item => item.id !== itemId);
    this.setState({toDoList: elements});
    this.deleteBackedItem(item);
  }

  updateItem = (event) => {
   this.setState({item: event.target.value});
  }

  // AXIOS PUT
  addBackendItem = async(object) => {
    const config = {
        headers: {'Authorization': `Token ${this.props.token}`},
    }
    const key = this.props.serverPubKey;
    const username = this.props.username;
    const item = await this.props.encrypt(object,key,username);
    await axios.put('http://localhost:8000/api/notes/',{"enc":item},config).then().catch(error => {
    console.log(error.response)
    });
  }

  // AXIOS DELETE
  deleteBackedItem = async(object) => {
    let toDoList = this.state.toDoList;
    const key = this.props.serverPubKey;
    const username = this.props.username;
    const item = await this.props.encrypt(object,key,username);
    const config = {
        headers: {'Authorization': `Token ${this.props.token}`},
        data: {
          params: item
        }
    }
    await axios.delete('http://localhost:8000/api/notes/',config).then(res => {
      console.log(res.data);
    }).catch(error => {
    console.log(error.response)
    });
  }

  componentDidMount = async() => {
    let data;
    const config = {
        headers: {'Authorization': `Token ${this.props.token}`}
    }
    await axios.get('http://localhost:8000/api/notes/', config).then(res => {
      data = res.data.enc
    }).catch(error => {
    console.log(error.response)
    });
    const notes = await this.props.decrypt(data, this.props.privKey);
    this.renderNotes(notes);
  }

  renderNotes = (notes) => {
    let toDoList = this.state.toDoList;
    notes.map(current => {
      toDoList.push({id: current.title, title: current.title});
      this.setState({toDoList});
    });
  }

  componentWillUnmount(){
    console.log("Unmounted Notes");
  }

  render() {
  return (
    <Paper style={{height: "19rem", marginTop: "0.5rem" , marginBottom: "0.5rem", border: 'none'}} elevation={10}>
    <CardGroup>
    <Card style={{height:"10rem", border: "none", marginBottom:"1rem"}}>
    <Card.Body>
    <center>
    <TextField style={{marginTop: "5rem", width: "18rem"}}id="standard-basic" label="New Item" onChange={this.updateItem}/>
    <AddIcon style={{marginTop: "6rem"}} onClick={this.addItem}/>
    </center>
    </Card.Body>
    </Card>

    <Card style={{height:"10rem", border: "none", marginBottom:"1rem"}}>
    <Card.Body>
    {this.state.toDoList.map(element =>
      <div key={element.id} style={{display: "flex", justifyContent: "space-between"}}  alt="loading..."> <Card.Text>{element.title}</Card.Text> <DeleteIcon onClick={() => this.deleteItem(element.id)}/> </div>
    )}
    </Card.Body>
    </Card>
    </CardGroup>
    </Paper>

  );

  }
}

export default withRouter(ToDoCard);
