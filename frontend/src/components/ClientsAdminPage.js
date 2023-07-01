import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "../axios";
import { Badge, Button, Modal } from "react-bootstrap";
import Loading from "./Loading";
function ClientsAdminPage() {
  const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    function deleteUser(userId) {
        axios
          .delete(`/users/${userId}`)
          .then(({ data }) => {
            setUsers(users.filter((user) => user._id !== userId));
          })
          .catch((e) => console.log(e));
      }
    useEffect(() => {
        setLoading(true);
        axios
            .get('/users')
            .then(({ data }) => {
                setLoading(false);
                setUsers(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, []);
    if (loading) return <Loading />;
    if (users?.length == 0) return <h2 className="py-2 text-center">No users yet</h2>;
    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>Client Id</th>
                    <th>Client Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                        <Button size="sm" variant="danger" onClick={() => deleteUser(user._id)} id="delete">
            Delete
          </Button>
                        </td>
                    </tr>
                ))}
            </tbody><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </Table>
    );
    return <div>ClientsAdminPage</div>;
}
export default ClientsAdminPage;