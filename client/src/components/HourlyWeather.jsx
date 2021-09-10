import React from 'react';

class HourlyWeather extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(JSON.stringify(this.props.data, null, 2))
    const arr = this.props.data.hourly.slice(0, 24);
    const tempArr = []
    for (let i = 0; i < arr.length; i += 3) {
      tempArr.push(arr[i]);
    }
    // console.log(JSON.stringify(tempArr, null, 2));
    return (
      <div>
        <div className="hourly">
          {tempArr.map(item => {
            return (
              <div className="hourlyCard">
                <h2>{new Date(item.dt * 1000).toLocaleTimeString()}</h2>
                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="Weather Icon"/>
                <h2>{item.temp} F</h2>
              </div>
            )
          })}
        </div>
      </div>
    )};
}

export default HourlyWeather;