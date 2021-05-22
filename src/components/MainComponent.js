import {React, Component } from 'react';
import { Navbar, NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';

import {DISHES} from '../shared/dishes';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes : DISHES,
      selectedDish : null
    }
  }

  selectDish(dishId) {
    this.setState({
        selectedDish : dishId
    });
  }

  render() {
    return (
      <div>
      <Navbar dark color="primary">
        <div className="container">
        <NavbarBrand href="/">
          Ristorente con Fusion
        </NavbarBrand>
        </div>
      </Navbar>
      <Menu dishes={this.state.dishes} onClick={(dishId) => {this.selectDish(dishId)}}></Menu>
      <Dishdetail dish={this.state.dishes.filter((dish) => this.state.selectedDish === dish.id)[0]}/>
    </div>
    );
  }
}

export default Main;
