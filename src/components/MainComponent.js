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
import { addComment, fetchDishes } from '../redux/ActionCreaters';

// Using this function to access all the defined property inside the function as props to Main Component
const mapStateToProps = (state) => {
  return {
    dishes : state.dishes,
    comments : state.comments,
    promotions : state.promotions,
    leaders : state.leaders,
  };
}

const mapDispatchToProps = dispatch => ({
  addComment : (dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment)),
  fetchDishes : () => {dispatch(fetchDishes())}
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          leader={this.props.leaders.filter((lead) => lead.featured)[0]} 
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]} />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          addComment = {this.props.addComment}
          />
      );
    }

    return (
      <div>
      <Header />
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route exact path="/aboutus" component={()=> <About leaders={this.props.leaders}/>}/>
        <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} isLoading={this.props.dishes.isLoading} errMess={this.props.dishes.errMess}/>} />
        <Route path="/menu/:dishId" component={DishWithId}/>
        <Route exact path="/contactus" component={Contact} />
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
    );
  }
}

// Connecting Main to the redux store
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));

// The connect() function takes two optional arguments:
// – mapStateToProps(): called every time store state changes.
// Returns an object full of data with each field being a prop
// for the wrapped component
// – mapDispatchToProps(): receives the dispatch() method and
// should return an object full of functions that use dispatch()

