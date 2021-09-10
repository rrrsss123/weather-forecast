import React from 'react';
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCities: false
    }
    this.showFavs = this.showFavs.bind(this);
  }

  showFavs() {
    const change = !this.state.showCities;
    this.setState({
      showCities: change
    })
  }

  render() {
    return (
      <div className="attendees">
        <h2 onClick={this.showFavs}>Favorites {this.state.showCities ? <BiPlusCircle /> : <BiMinusCircle /> } </h2>
        {this.props.favCities.map(city => {
          return (
            <div className="flow">
              <h3 style={{display: this.state.showCities ? 'block' : 'none' }} onClick={() => this.props.showFavWeather(city.name)}>{city.name}</h3>
              <RiDeleteBinLine style={{display: this.state.showCities ? 'block' : 'none' }} onClick={() => this.props.handleClickRemove(city.id)}/>
            </div>
          )
        })}
      </div>
    )};
}

export default Favorite;