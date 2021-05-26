import React from 'react';
import {Card,CardImg, CardBody, CardText, CardTitle, CardSubtitle} from 'reactstrap';
import Loading from './LoadingComponent';

function RenderCard({item,dishLoading,dishErrMess}) {
    if(dishLoading) {
        return (
            <Loading />
        );
    }
    else if (dishErrMess) {
        return (
            <div>
                <h4>{dishErrMess}</h4>
            </div>
        );
    }
    else {
        return(
            <Card>
                <CardImg src={item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation != null ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}


function Home(props) {
    return (
        <div className="container">
            <div className="row row-content">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} dishLoading={props.dishesLoading} dishErrMess={props.dishesErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} />
                </div>
            </div>
        </div>
    );
}

export default Home;