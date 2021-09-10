import React from 'react';

class DayWeather extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return (
      <div>
        <div className="daily">
          {this.props.data.daily.slice(0, 7).map(item => {
            return (
              <div className="dailyCard">
                <h2>{days[new Date(item.dt * 1000).getDay()]}</h2>
                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="Weather Icon"/>
                <h2>{item.temp.day} F</h2>
              </div>
            )
          })}
        </div>
      </div>
    )};
}

export default DayWeather;