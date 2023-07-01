import React from "react";
import "./Pagination.css";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./ProductPreview.css"

function ProductPreview({ _id, category, name, pictures }) {
    return (
        <LinkContainer className="sathu" to={`/product/${_id}`} style={{ cursor: "pointer", width: "13rem", margin: "10px", }}>
            <Card style={{ width: "20rem", margin: "10px" }}>
                <Card.Img variant="top" className="product-preview-img" src={pictures[0].url} style={{ height: "15rem", width: "16rem", objectFit: "cover" }} />
                <Card.Body>
                    <Card.Title className="title">{name}</Card.Title>
                    <Badge className="badge" style={{color:"#BA9364"}}>
                        {category}
                    </Badge>
                </Card.Body>
            </Card>
        </LinkContainer>
    );
}

export default ProductPreview;
