import React, { Component } from "react";
import "./ChatBot.css";
import FoodService from "./FoodService";

export default class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food: ""
    };
    this.foodService = new FoodService();
  }
  getSpecials() {
    this.foodService.newSpecial().then(response => {
      this.setState({
        ...this.state,
        food: response,
        order: undefined,
      });
    });
  }
 messageSuccess = event => {
    this.setState({ order: true });
  }; 
  messageFail = event => {
    this.setState({ order: false });
  }; 
  componentDidMount() {
    this.getSpecials();
  }
  render() {
    if(this.state.order === true) {return (
      <div className="orderResult">
      <div className="title">
        <h1>Minty Host Bakery Shop</h1>
      </div>
      <div id="info">
        <p>
          We are happy you like it. Please go to the counter to make your order.
        </p>
      </div>
      </div>
    )}
    else if(this.state.order === false) {    return (
      <div className="orderResult">
      <div className="title">
        <h1>Minty Host Bakery Shop</h1>
      </div>
      <div id="info">
        <p>
          We are sorry to hear that. Hopefully, you'll like tomorrow's special better.
        </p>
      </div>
      </div>
      )}
      else {return(
        <div className="bot">
        <div className="title">
          <h1>Minty Host Bakery Shop</h1>
        </div>
        <div id="info">
          <p>
            Hello, today´s special is {this.state.food}. Would you like to
            order?
          </p>
        </div>
        <form onSubmit={e => this.handleFormSubmitAnswer(e)}>
          <div className="input">
            <input
              type="button"
              value="Yes"
              onClick={e => this.messageSuccess(e)}
            ></input>
            <input
              type="button"
              value="No"
              onClick={e => this.messageFail(e)}
            ></input>
          </div>
        </form>
      </div>
      
      )}

  }
}
