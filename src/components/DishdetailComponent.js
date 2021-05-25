import React, { Component} from "react";
import {Card, CardBody, CardImg, CardTitle, CardText, Breadcrumb ,BreadcrumbItem, Button, 
    Modal, ModalHeader, ModalBody, Row, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { LocalForm, Control , Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen : false,
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen : !this.state.isModalOpen,
        })
    }

    handleCommentSubmit(values) {
        console.log("Form submitted " + JSON.stringify(values));
        this.toggleModal();
        // to initiate the action upon the user submitting the comment form
        this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
        // alert("Form submitted " + JSON.stringify(values));
    }

    render() {
        return (
             <div className="container mb-4">
                 <Button outline role="button" onClick={this.toggleModal}>
                    <span className="fa fa-edit f-lg"></span> Add Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add Comment</ModalHeader>
                    <ModalBody className="m-3">
                        <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
                            <Row className="form-group">
                                <Label for="rating">Rating</Label>
                                <Control component="select" className="form-control" model=".rating" name="rating" 
                                    id="rating">
                                    <option>Select Rating</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control>
                            </Row>
                            <Row className="form-group">
                                <Label for="author">Your Name</Label>
                                <Control className="form-control" model=".author" name="author" id="author"
                                    placeholder="Your Name"
                                    validators={
                                        {
                                            required,
                                            maxLength : maxLength(15),
                                            minLength : minLength(3),
                                        }
                                    }
                                ></Control>
                                <Errors className="text-danger" model=".author" show="touched" 
                                    messages={{
                                        required : 'Required Field ',
                                        maxLength : 'Must be less than or equal to 15 characters',
                                        minLength : 'Must be more than 2 characters'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label for="rating">Comment</Label>
                                <Control component="textarea" className="form-control" model=".comment" name="comment"
                                    id="comment" rows="6"></Control>
                            </Row>
                            <Row className="form-group">
                                <Button role="submit" color="primary">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
             </div>
        );
    }
}

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
                       <CommentForm dishId={props.dish.id} addComment={props.addComment}/>
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