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
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreaters';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
  postComment : (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment)),
  fetchDishes : () => {dispatch(fetchDishes())},
  // reset a react redux form with a model = 'feedback'
  resetFeedbackForm : () => {dispatch(actions.reset('feedback'))},
  fetchComments : () => {dispatch(fetchComments())},
  fetchPromos : () => {dispatch(fetchPromos())},
  fetchLeaders : () => {dispatch(fetchLeaders())},
  postFeedback : (firstname,lastname,telnum,email,agree,contactType,message) => {dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message))}
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          leader={this.props.leaders.leaders.filter((lead) => lead.featured)[0]}
          leaderLoading = {this.props.leaders.isLoading}
          leaderErrMess = {this.props.leaders.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]} 
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          commentErrMess={this.props.comments.errMess}
          postComment = {this.props.postComment}
        />
      );
    }

    return (
      <div>
      <Header />
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={400}>
          <Switch location={this.props.location}>
            <Route path="/home" component={HomePage} />
            <Route exact path="/aboutus" component={()=> <About leaders={this.props.leaders.leaders} isLoading={this.props.leaders.isLoading} errMess={this.props.leaders.errMess}/>}/>
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} isLoading={this.props.dishes.isLoading} errMess={this.props.dishes.errMess}/>} />
            <Route path="/menu/:dishId" component={DishWithId}/>
            <Route exact path="/contactus" component={() =>  <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
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

