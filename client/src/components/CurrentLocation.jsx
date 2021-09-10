import React from 'react';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="attendees">
        <h2>City: {this.props.data.name} {this.props.data.name ? (this.props.favCities.map(city => city.id).indexOf(this.props.data.id) === -1 ? <AiOutlineStar onClick={() => this.props.handleClickAdd(this.props.data.id, this.props.data.name)}/> : <AiFillStar onClick={() => this.props.handleClickRemove(this.props.data.id)}/>) : <div></div>}</h2>
        <h2>
          Weather: {this.props.data.weather.map(item => {
            return item.main;
          }).join(', ')}<br/>
          {this.props.data.weather.map(item => {
            return <img src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="Weather Icon"/>
          })}
        </h2>
        <h2>Temperature: {this.props.data.main.temp} F</h2>
        <h3>Feels like: {this.props.data.main.feels_like} F</h3>
        <h3>Minimum Temperature: {this.props.data.main.temp_min} F</h3>
        <h3>Maximum Temperature: {this.props.data.main.temp_max} F</h3>
        <h3>Humidity: {this.props.data.main.humidity}</h3>
      </div>
    )};
}

export default CurrentLocation;