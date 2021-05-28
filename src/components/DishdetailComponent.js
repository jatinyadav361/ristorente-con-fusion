import React, { Component} from "react";
import {Card, CardBody, CardImg, CardTitle, CardText, Breadcrumb ,BreadcrumbItem, Button, 
    Modal, ModalHeader, ModalBody, Row, Label, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import { LocalForm, Control , Errors } from "react-redux-form";
import Loading from "./LoadingComponent";
import {baseUrl} from '../shared/baseUrl';
import { Fade, FadeTransform, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

// 1st way of defining functional components
function DishItemCard({dish}) {
    return (
        <div className="col-12 col-md-5 m-1">
            <FadeTransform in 
                transformProps = {{
                    exitTransform : 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg src={baseUrl+ dish.image}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
}


function RenderComments({comments,postComment,dishId}) {
    if(comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                    <li key={comment.id}>
                                        <p className="text-primary">{comment.comment}</p>
                                        <p className="text-secondary">-- {comment.author}, {Date(comment.date)}</p>
                                    </li>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
}

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
        this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
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
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label for="rating">Rating</Label>
                                    <Control.select className="form-control" model=".rating" name="rating" 
                                        id="rating">
                                        <option>Select Rating</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label for="author">Your Name</Label>
                                    <Control.text className="form-control" model=".author" name="author" id="author"
                                        placeholder="Your Name"
                                        validators={
                                            {
                                                required,
                                                maxLength : maxLength(15),
                                                minLength : minLength(3),
                                            }
                                        } />
                                    <Errors className="text-danger" model=".author" show="touched" 
                                        messages={{
                                            required : 'Required Field ',
                                            maxLength : 'Must be less than or equal to 15 characters',
                                            minLength : 'Must be more than 2 characters'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label for="rating">Comment</Label>
                                    <Control.textarea className="form-control" model=".comment" name="comment"
                                        id="comment" rows="6" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button role="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
             </div>
        );
    }
}

// 2nd way of defining functional components
const Dishdetail = (props) => {
    if(props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 align-self-center">
                        <Loading />
                    </div>
               </div>
            </div>
        );
    }
    else if(props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 align-self-center">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else if(props.dish != null) {
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
                    <DishItemCard dish={props.dish} />
                    <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
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