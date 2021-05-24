import React,{Component} from 'react';
import {Breadcrumb,BreadcrumbItem, Form, FormGroup, Col, Label, Input, Button, FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname : '',
            lastname : '',
            telnum : '',
            email : '',
            agree : false,
            contactType : 'Tel',
            message : '',
            touched : {
                firstname : false,
                lastname : false,
                telnum : false,
                email : false,
                message : false,
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name] : value,
        });
    } 

    handleSubmit(event) {
        console.log("Form submitted\n"+ JSON.stringify(this.state));
        alert("Form submitted\n" + JSON.stringify(this.state));
        event.preventDefault();
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched : {...this.state.touched,[field] : true}
        })
    }

    handleValidation (firstname,lastname,telnum,email,message) {
        const errors = {
            firstname : '',
            lastname : '',
            telnum : '',
            email : '',
            message : ''
        }
        if(this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First Name should be >=3 characters';
        else if(this.state.touched.firstname && firstname.length > 10)
            errors.firstname = 'First Name should be <=10 characters';
        
        if(this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'Last Name should be >=3 characters';
        else if(this.state.touched.lastname && lastname.length > 10)
            errors.lastname = 'Last Name should be <=10 characters';
        
        //todo recheck the regular expression after doing reg ex in python
        const regEx = /^\d+$/;
        if(this.state.touched.telnum && !regEx.test(telnum))
            errors.telnum = 'Tel Number should contain only numbers';
        
        if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Email should contain a @';
        
        if(this.state.touched.message && message.length < 1)
            errors.message = 'Message should not be empty!';
        
        return errors;
        
    }

    render() {

        const errors = this.handleValidation(this.state.firstname,this.state.lastname,this.state.telnum,this.state.email,this.state.message);

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info" href="skype.com"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us Your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" name="firstname" id="firstname" placeholder="First Name" 
                                        value={this.state.firstname} onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('firstname')}
                                        valid={errors.firstname === ''}
                                        invalid={errors.firstname !== ''}
                                    />
                                    <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lasttname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" name="lastname" id="lastname" placeholder="Last Name" 
                                        value={this.state.lastname} onChange={this.handleInputChange}
                                        valid={errors.lastname === ''}
                                        invalid={errors.lastname !== ''}
                                        onBlur={this.handleBlur('lastname')}    
                                    />
                                    <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telnum" md={2}>Tel. Phone</Label>
                                <Col md={10}>
                                    <Input type="tel" name="telnum" id="telnum" placeholder="Tel. Phone" 
                                        value={this.state.telnum} onChange={this.handleInputChange}
                                        valid={errors.telnum === ''}
                                        invalid={errors.telnum !== ''}
                                        onBlur={this.handleBlur('telnum')}
                                    />
                                    <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" name="email" id="email" placeholder="Email" 
                                        value={this.state.email} onChange={this.handleInputChange}
                                        valid={errors.email === ''}
                                        invalid={errors.email !== ''}
                                        onBlur={this.handleBlur('email')}
                                    />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{offset:2,size:6}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input id="agree" name="agree" type="checkbox" 
                                                checked={this.state.agree} onChange={this.handleInputChange}></Input>{' '}
                                                <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{offset:1,size:3}}>
                                    <Input type="select" id="contactType" name="contactType" value={this.state.contactType}
                                        onChange={this.handleInputChange}>
                                            <option>Tel</option>
                                            <option>Email</option>
                                        </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" name="message" id="messge" rows="6" 
                                        value={this.state.message} onChange={this.handleInputChange}
                                        valid={errors.message === ''}
                                        invalid={errors.message !== ''}
                                        onBlur={this.handleBlur('message')}
                                    />
                                    <FormFeedback>{errors.message}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{offset:2,size:10}}>
                                    <Button type="submit" color="primary" disabled={
                                        (errors.firstname !== '' || !this.state.touched.firstname) ||
                                        (errors.lastname !== '' || !this.state.touched.lastname) ||
                                        (errors.telnum !== '' || !this.state.touched.telnum) ||
                                        (errors.email !== '' || !this.state.touched.email) ||
                                        (errors.message !== '' || !this.state.touched.message)
                                    }>Submit Feeback</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;