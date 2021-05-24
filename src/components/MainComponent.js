import {React, Component } from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import {COMMENTS} from '../shared/comments';
import Header from './HeaderComponent';
import Footer from './FooterComponene';
import Contact from './ContactComponent';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes : DISHES,
      comments : COMMENTS,
      leaders : LEADERS,
      promotions : PROMOTIONS
    };
  }

  render() {

    const HomeScreen = () => {
      return (
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
        leader={this.state.leaders.filter((lead) => lead.featured)[0]} 
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]} />
      );
    }

    const DishDetailScreen = ({match}) => {
      return(
        <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          />
      );
    }

    return (
      <div>
      <Header />
      <Switch>
        <Route path="/home" component={HomeScreen} />
        <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
        <Route path="/menu/:dishId" component={DishDetailScreen}/>
        <Route exact path="/contactus" component={Contact} />
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
    );
  }
}

export default Main;
