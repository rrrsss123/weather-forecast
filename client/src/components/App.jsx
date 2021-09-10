import React, { Component } from "react";
import WeatherForm from './WeatherForm.jsx';
import CurrentLocation from './CurrentLocation.jsx';
import Favorite from './Favorite.jsx';
import HourlyWeather from './HourlyWeather.jsx';
import DayWeather from './DayWeather.jsx';
import data from '../../data/weather.js';
import smapleData from '../../data/oneCall.js';
const axios = require('axios');
const { API_KEY } = require('../../../apiKey.js');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        weather: [],
        main: {}
      },
      forecastData: {
        daily: [],
        hourly: []
      },
      favCities: JSON.parse(localStorage.getItem('cities')),
    }

    this.submitForm = this.submitForm.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
    this.showFavWeather = this.showFavWeather.bind(this);
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      console.log("geolocation Available");
    } else {
      console.log("geolocation Not Available");
    }

    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=imperial`)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.setState({
          data: response.data
        })
      })
      .catch(err => {
        console.log(err);
      })

      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=minutely,current,alerts&appid=${API_KEY}&units=imperial`)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          this.setState({
            forecastData: response.data
          })
        })
        .catch(err => {
          console.log(err);
        })
    });

    // this.setState({
    //   data: data,
    //   forecastData: smapleData
    // })

    if (!localStorage.getItem('cities')) {
      localStorage.setItem('cities', JSON.stringify([]));
    }
  }

  submitForm(data) {
    // console.log(data)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data.city},${data.state},${data.country}&appid=${API_KEY}&units=imperial`)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        this.setState({
          data: response.data
        })
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=minutely,current,alerts&appid=${API_KEY}&units=imperial`)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            this.setState({
              forecastData: response.data
            })
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })

  }

  handleClickAdd(id, name) {
    // console.log(id, name);
    const newFavs = this.state.favCities.concat([{id, name}]);
    this.setState({
      favCities: newFavs
    })
    localStorage.setItem('cities', JSON.stringify(newFavs));
  }

  handleClickRemove(id) {
    // console.log(id);
    const newFavs = this.state.favCities.filter(city => city.id !== id);
    this.setState({
      favCities: newFavs
    })
    localStorage.setItem('cities', JSON.stringify(newFavs));
  }

  showFavWeather(cityName) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        this.setState({
          data: response.data
        })
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=minutely,current,alerts&appid=${API_KEY}&units=imperial`)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            this.setState({
              forecastData: response.data
            })
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <div className="current">
          <CurrentLocation data={this.state.data} handleClickAdd={this.handleClickAdd} favCities={this.state.favCities} handleClickRemove={this.handleClickRemove} />
        </div>
        <div className="main">
          <HourlyWeather data={this.state.forecastData}/>
        </div>
        <div className="main">
          <DayWeather data={this.state.forecastData}/>
        </div>
        <div className="main">
          <WeatherForm submitForm={this.submitForm} />
        </div>
        <div className="main">
          <Favorite favCities={this.state.favCities} showFavWeather={this.showFavWeather} handleClickRemove={this.handleClickRemove}/>
        </div>
      </div>
    )};
}

export default App;