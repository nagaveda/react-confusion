import React, {Component, Fragment} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Row,Col, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, Errors, LocalForm} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }
    handleSubmit(values){
        this.toggleModal();
        console.log("Current State: "+JSON.stringify(values));
        alert("Current State: "+JSON.stringify(values)); 
    }
    render(){
        
        return(
            <Fragment>
                <Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal}>
                    <ModalHeader toggle = {this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit = {(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor = "rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>   
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor = "name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" className="form-control" id="name" name="name" placeholder="Your Name"
                                         validators={{
                                            required, minLength:minLength(3), maxLength:maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required:'Required',
                                            minLength:'Must be greater than 2 characters',
                                            maxLength:'Must be 15 characters or Less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor = "comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea rows={12} model=".message" className="form-control" id="comment" name="comment" />
                                </Col>
                            </Row>
                            
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline onClick={this.toggleModal} >
                    <span className="fa fa-pencil fa-lg"></span>{' '}Submit Comment
                </Button>
            </Fragment>
        );
    }
}
   function RenderDish({dish}){
        if(dish != null){
            return(
                <Card>
                    <CardImg width="100%" src = {dish.image} alt = {dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
    function RenderComments({comments}){
        if(comments!=null){
            const commentsArray = comments.map((item)=>{
                return(
                    <div key={item.id} >
                       <ul className="list-unstyled">
                           <li>{item.comment}</li><br/>
                           <li><p>--{item.author},&nbsp; {new Intl.DateTimeFormat('en-US',{year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(item.date)))}</p></li>
                       </ul>
                    </div>
                );
            })
            return(
                <div>
                    <h4>Comments</h4>
                    {commentsArray}
                    <CommentForm/>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
    const DishDetail = (props)=>{
        
        return(
           <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                         <h3>{props.dish.name}</h3>
                         <hr/>
                    </div>
                </div>
                <div className="row">    
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish = {props.dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments = {props.comments}/> 
                </div>   
            </div>     
           </div> 
           

        );
        
    }


export default DishDetail;