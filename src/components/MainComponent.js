import {React, Component } from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import Home from './HomeComponent';
import Menu from './MenuComponent';

import {DISHES} from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponene';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes : DISHES,
    }
  }

  render() {
    function HomeScreen() {
      return (
        <Home>
        </Home>
      );
    }
    return (
      <div>
      <Header />
      <Switch>
        <Route path="/home" component={HomeScreen} />
        <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
    );
  }
}

export default Main;
