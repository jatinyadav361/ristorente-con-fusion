import { React, Component } from "react";

import {Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        var listComments = this.props.dish.comments.map((comment) => {
            return (
                <div id={comment.id}>
                    <div>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {comment.date}</p>
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
    }
}

export default Dishdetail;