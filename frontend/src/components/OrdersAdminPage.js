import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "./Loading";
import Pagination from "./Pagination";
import { useDeleteProductMutation } from "../services/appApi";
import "./OrdersAdminPage.css";
function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);
//   const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const handleClose = () => setShow(false);
  function markShipped(orderId, ownerId) {
    axios
      .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
      .then(({ data }) => setOrders(data))
      .catch((e) => console.log(e));
  }
  function showOrder(productsObj) {
    let productsToShow = products.filter((product) => productsObj[product._id]);
    productsToShow = productsToShow.map((product) => {
      const productCopy = { ...product };
      productCopy.count = productsObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    console.log(productsToShow);
    setShow(true);
    setOrderToShow(productsToShow);
  }
  function deleteOrder(orderId) {
    axios
      .delete(`/orders/${orderId}`)
      .then(({ data }) => {
        setOrders(orders.filter((order) => order._id !== orderId));
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    setLoading(true);
    axios
      .get("/orders")
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (orders.length === 0) {
    return <h1 className="text-center pt-4">No orders yet</h1>;
  }
  function TableRow({ _id, orderId, count, owner, total, status, products, address }) {
    return (
      <tr>
        {/* <td>{_id}</td> */}
        <td>{orderId}</td>
        <td>{owner?.name}</td>
        <td>{count}</td>
        <td>{total}</td>
        <td>{address}</td>
        <td>
          {status === "processing" ? (
            <Button size="sm" onClick={() => markShipped(_id, owner?._id)} id="mark">
              Mark
            </Button>
          ) : (
            <Badge id="shipped">Shipped</Badge>
          )}
        </td>
        <td>
          <span style={{ cursor: "pointer" }} onClick={() => showOrder(products)}>
            <i className="fa fa-eye"></i>
          </span>
        </td>
        <td>
          <Button size="sm" variant="danger" onClick={() => deleteOrder(_id)} id="delete">
            Delete
          </Button>
        </td>
      </tr>
    );
  }
  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Client Name</th>
            <th>Items</th>
            <th>Order Total</th>
            <th>Address</th>
            <th>Status</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <Pagination data={orders} RenderComponent={TableRow} pageLimit={1} dataLimit={10} tablePagination={true} />
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order details</Modal.Title>
        </Modal.Header>
        {orderToShow.map((order) => (
          <div className="order-details__container d-flex justify-content-around py-2">
            <img src={order.pictures[0].url} style={{ maxWidth: 100, height: 100, objectFit: "cover" }} alt="Product" />
            <p>
              <span>{order.count} x </span> {order.name}
            </p>
            <p>Price: ${Number(order.price) * order.count}</p>
          </div>
        ))}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </>
  );
}
export default OrdersAdminPage;