import React from 'react';

class WeatherForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      state: '',
      country: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  render() {
    return (
      <div className="attendee-form">
        <h2>Weather Check</h2>
        <label>City: </label>
        <input type="text" id="city" onChange={this.handleChange}></input>
        <label>State: </label>
        <input type="text" id="state" onChange={this.handleChange}></input>
        <label>Country: </label>
        <input type="text" id="country" onChange={this.handleChange}></input>
        <button onClick={() => this.props.submitForm(this.state)}>Search</button>
      </div>
    );
  }
}

export default WeatherForm;