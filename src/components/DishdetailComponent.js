import { React} from "react";
import {Card, CardBody, CardImg, CardTitle, CardText, Breadcrumb ,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

// 1st way of defining functional components
function CommentsList({comment}) {
    return (
        <div id={comment.id}>
            <div>
                <p className="text-primary">{comment.comment}</p>
                <p className="text-secondary">-- {comment.author}, {Date(comment.date)}</p>
            </div>
        </div>
    );
}

function DishItemCard({dish}) {
    return (
        <Card>
            <CardImg src={dish.image}></CardImg>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

// 2nd way of defining functional components
const Dishdetail = (props) => {
    if(props.dish != null) {
        var listComments = props.comments.map((comment) => {
            return (
                <CommentsList comment={comment} />
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                   <div className="col-12 col-md-5 m-1">
                       <DishItemCard dish={props.dish} />
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

export default Dishdetail;