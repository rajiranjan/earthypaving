// NewProduct.js
import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./NewProduct.css";
import Navigation from "../components/Navigation";
// import { createUploadWidget } from "cloudinary-react";

function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); 
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();
  const [customId, setCustomId] = useState(""); // Added state for custom ID

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length || !customId) {
      return alert("Please fill out all the fields");
    }
    createProduct({ name, description, price, category, images, customId }) // Pass the customId field
      .then(({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate("/admin");
          }, 1500);
        }
      });
  }
  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dy1pydfmg",
        uploadPreset: "xb5nzveu",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
        }
      }
    );
    widget.open();
  }

  return (
    <p>
      <Navigation/>
    <Container className="product">
      <Row>
        <Col md={6} className="new-product__form--container" style={{ marginLeft: "340px" }}>
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 style={{color:"#000", "font-family":'Raleway', color:"#BA9463"}} className="mt-4">Create a product</h1>
            {isSuccess && <Alert variant="success">Product created with success</Alert>}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Product name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" value={name} required onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product description</Form.Label>
              <Form.Control as="textarea" placeholder="Product description" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price(Rs)</Form.Label>
              <Form.Control type="number" placeholder="Price (Rs)" value={price} required onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
              <Form.Label>Category</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select One --
                </option>
                <option value="grasses">Grasses</option>
                <option value="stones">Stones</option>
                <option value="works">Works</option>
                {/* <option value="laptops">laptops</option> */}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Custom ID</Form.Label>
              <Form.Control type="text" placeholder="Custom ID" value={customId} required onChange={(e) => setCustomId(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-4">
              <Button className="but" type="button" onClick={showWidget}>
                Upload Images
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} alt="Product" />
                    {imgToRemove !== image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Button className="but"  type="submit" disabled={isLoading || isSuccess}>
                Create Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
        {/* <Col md={6} className="new-product__image--container"></Col> */}
      </Row>
      <br />
    </Container>
    </p>
  );
}

export default NewProduct;
