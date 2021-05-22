import { React, Component } from "react";

import {Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';

class Dishdetail extends Component {
    render() {
        if(this.props.dish != null) {
            var listComments = this.props.dish.comments.map((comment) => {
                return (
                    <div id={comment.id}>
                        <div>
                            <p className="text-primary">{comment.comment}</p>
                            <p className="text-secondary">-- {comment.author}, {Date(comment.date)}</p>
                        </div>
                    </div>
                );
            });
            return (
                <div className="container">
                    <div className="row">
                       <div className="col-12 col-md-5 m-1">
                       <Card>
                           <CardImg src={this.props.dish.image}></CardImg>
                           <CardBody>
                               <CardTitle>{this.props.dish.name}</CardTitle>
                               <CardText>{this.props.dish.description}</CardText>
                           </CardBody>
                       </Card>
                       </div>
                       <div className="col-12 col-md-5 m-1">
                           <h2>Comments</h2>
                           <div>{listComments}</div>
                       </div>
                    </div>
                </div>
           );
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default Dishdetail;