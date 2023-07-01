import React, { useEffect, useState } from "react";
import { Badge, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import "./OrdersPage.css";
import Navigation from "../components/Navigation";

function OrdersPage() {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/users/${user._id}/orders`)
            .then(({ data }) => {
                setLoading(false);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return <h1 className="text-center pt-3">No orders yet</h1>;
    }

    return (
        <div>
          <Navigation/>
        <Container className="orders">
            <div className="orderpage">
            <h1 className="text-center">My Orders</h1><br/><br/>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr>
                            <td>{order.orderId}</td>
                            <td>
                                <Badge bg={`${order.status === "processing" ? "warning" : "success"}`} text="white">
                                    {order.status}
                                </Badge>
                            </td>
                            <td>{order.date}</td>

                            <td>Rs{order.total}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
        </Container><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    );
}

export default OrdersPage;
