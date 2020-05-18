import React from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';



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
    function RenderComments({dish}){
        if(dish!=null){
            const commentsArray = dish.comments.map((item)=>{
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
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish = {props.dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments dish = {props.dish}/> 
                </div>   
            </div>     
           </div> 
           

        );
        
    }


export default DishDetail;