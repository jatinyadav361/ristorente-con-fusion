import {React, Component } from 'react';
import {Switch, Redirect, Route, withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponene';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';

// Using this function to access all the defined property inside the function as props to Main Component
const mapStateToProps = (state) => {
  return {
    dishes : state.dishes,
    comments : state.comments,
    promotions : state.promotions,
    leaders : state.leaders,
  };
}

class Main extends Component {

  render() {

    const HomeScreen = () => {
      return (
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]} 
        leader={this.props.leaders.filter((lead) => lead.featured)[0]} 
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]} />
      );
    }

    const DishDetailScreen = ({match}) => {
      return(
        <Dishdetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          />
      );
    }

    return (
      <div>
      <Header />
      <Switch>
        <Route path="/home" component={HomeScreen} />
        <Route exact path="/aboutus" component={()=> <About leaders={this.props.leaders}/>}/>
        <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
        <Route path="/menu/:dishId" component={DishDetailScreen}/>
        <Route exact path="/contactus" component={Contact} />
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
    );
  }
}

// Connecting Main to the redux store
export default withRouter(connect(mapStateToProps)(Main));

// The connect() function takes two optional arguments:
// – mapStateToProps(): called every time store state changes.
// Returns an object full of data with each field being a prop
// for the wrapped component
// – mapDispatchToProps(): receives the dispatch() method and
// should return an object full of functions that use dispatch()

