import React, { Component } from "react";
import "./ChatBot.css";
import FoodService from "./FoodService";

export default class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food: "",
      answer: undefined,
      order: undefined
    };
    this.foodService = new FoodService();
  }
  getSpecials() {
    this.foodService.newSpecial().then(response => {
      this.setState({
        ...this.state,
        food: response
      });
    });
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ ...this.state, answer: value, formEmpty: false });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const text = this.state.answer;
        if(text === 'yes' || text === 'Yes' || text === 'YES') {
          this.setState(
            {
              ...this.state,
              order: 'yes',
            },
          );
        }
        else if(text === 'no' || text === 'No' || text === 'NO') {
          this.setState(
            {
              ...this.state,
              order: 'no',
            },
          );
        }
        else {
          this.setState(
            {
              ...this.state,
              order: 'error',
            },
          );
        }
  };
  componentDidMount() {
    this.getSpecials();
  }

  render() {
    if (this.state.order === 'yes') {
      return (
        <div className="orderResult">
          <div className="title">
            <h1>Minty Host Bakery Shop</h1>
          </div>
          <div id="info">
            <p>
              We are happy you like it. Please go to the counter to make your
              order.
            </p>
          </div>
        </div>
      );
    } else if (this.state.order === 'no') {
      return (
        <div className="orderResult">
          <div className="title">
            <h1>Minty Host Bakery Shop</h1>
          </div>
          <div id="info">
            <p>
              We are sorry to hear that. Hopefully, you'll like tomorrow's
              special better.
            </p>
          </div>
        </div>
      );
    } else if (this.state.order === 'error') {
      return (
        <div className="bot">
          <div className="title">
            <h1>Minty Host Bakery Shop</h1>
          </div>
          <div id="info">
            <p>
              Hello, today´s special is {this.state.food}. Would you like to
              order?
            </p>
            <p>I didn't understand you. Please, say yes or no.</p>
          </div>
          <div className="input">
            <form onSubmit={e => this.handleFormSubmit(e)}>
              <input
                type="text"
                value={this.state.answer}
                onChange={event =>
                  this.handleChange(event, "answer", "string")
                }
              ></input>
            </form>
          </div>
        </div>
);
    } else {
      return (
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
          <div className="input">
            <form onSubmit={e => this.handleFormSubmit(e)}>
              <input
                type="text"
                value={this.state.answer}
                onChange={event =>
                  this.handleChange(event, "answer", "string")
                }
              ></input>
            </form>
          </div>
        </div>
      );
    }
  }
}
