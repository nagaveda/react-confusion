import React, { Component } from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';
class DishDetail extends Component{
    
    renderDish(dish){
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
    renderComments(dish){
        
        if(dish!=null){
            let options = {year:'numeric', month:'short', date:'numeric'};
            const commentsArray = dish.comments.map((item)=>{
                return(
                    <div key={item.id} >
                       <ul className="list-unstyled">
                           <li>{item.comment}</li><br/>
                           <li><p>--{item.author},&nbsp; {new Date(item.date).toLocaleDateString("en-US", options )}</p></li>
                       </ul>
                    </div>
                );
            })
            return(
                <div>
                    <h4>Comments</h4>
                    {commentsArray}
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
    render(){
        return(
            <div className="row">    
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish)} 
                </div>   
            </div>

        );
        
    }
}

export default DishDetail;