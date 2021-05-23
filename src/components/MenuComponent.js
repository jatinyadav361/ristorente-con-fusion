import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';

    // We don't need to use constructor to use props
    // We only need constructor if we want to maintain state

function MenuComponentDishItem({dish}) {
    return (
        <Card key={dish.id}>
            <CardImg width="100%" src={dish.image} alt={dish.label} />
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

const Menu = (props) => {
    const menu = props.dishes.map((dish) => {
        return (
            <div className="col-12 col-md-5 m-1">
                <MenuComponentDishItem dish={dish} />
            </div>
        );
    });

    return(
        <div className="container">
            <div className="row">
                {menu}
            </div>
        </div>
    );
}

export default Menu;