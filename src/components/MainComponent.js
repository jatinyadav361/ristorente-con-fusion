import {React, Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';

import {DISHES} from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponene';

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
      <Header />
      <Menu dishes={this.state.dishes} onClick={(dishId) => {this.selectDish(dishId)}}></Menu>
      <Dishdetail dish={this.state.dishes.filter((dish) => this.state.selectedDish === dish.id)[0]}/>
      <Footer />
    </div>
    );
  }
}

export default Main;
