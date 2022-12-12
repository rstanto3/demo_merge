import React, {useState} from 'react';
// import ReactDOM from 'react-dom/client';
import './App.css';
import Axios from "axios";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      meetingName: '',
      date: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  //This occurs after we hit submit, created an alert to make sure it saved the data at least for the alert
  //probably where we want to save to the database from
  handleSubmit(event) {
    alert(this.state.firstName + ' ' + this.state.lastName + 
      ' signed in for ' + this.state.meetingName + ' on ' + this.state.date);
    this.setState("");
    Axios.post(`URL`, {
      'partnerName': this.state.firmName,
      'timeframes': this.state.timeframes,
      'numberOfResults': this.state.numberOfResults,
    },
    {
      headers: {
          "Authorization": `AUTHORIZATION_KEY`,
          "Content-Type": 'application/json'
      }
    }
    )
    .then(res => console.log(res))
    .catch(error => console.err(error))
    event.preventDefault();
  }

  render() {
    const current = new Date();
    this.state.date = (current.getMonth() + 1) + '/' + current.getDate() + '/' + current.getFullYear();
    return(
      <div className="form-box">
      <h1>Meeting Sign-Up Form</h1>
      <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="First Name" name="firstName" value={this.state.firstName}
            onChange={this.handleChange} />
          <input type="text" placeholder="Last Name" name="lastName" value={this.state.lastName}
            onChange={this.handleChange} /> 
          <input type="text" placeholder="Meeting Name" name="meetingName" value={this.state.meetingName}
            onChange={this.handleChange} />
          <button type="submit" className="submitBtn">Submit</button>
      </form>
    </div>
    )
  }
}

export default NameForm;
