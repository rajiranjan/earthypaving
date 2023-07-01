// import React from "react";
// import { Table, Button } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { useDeleteProductMutation } from "../services/appApi";
// import "./DashboardProducts.css";
// import Pagination from "./Pagination";

// function DashboardProducts() {
//     const products = useSelector((state) => state.products);
//     const user = useSelector((state) => state.user);
//     // removing the product
//     const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
//     function handleDeleteProduct(id) {
//         // logic here
//         if (window.confirm("Are you sure?")) deletProduct({ product_id: id, user_id: user._id });
//     }

//     function TableRow({ pictures, _id, name, price }) {
//         return (
//             <tr>
//                 <td>
//                     <img src={pictures[0].url} className="dashboard-product-preview" />
//                 </td>
//                 <td>{_id}</td>
//                 <td>{name}</td>
//                 <td>{price}</td>
//                 <td>
                    
//                     <Link to={`/product/${_id}/edit`} className="btnn btn-warning">
//                         Edit
//                     </Link><br /><br />
//                     <Button className = "deleteNotChange"onClick={() => handleDeleteProduct(_id, user._id)} disabled={isLoading}>
//                         Delete
//                     </Button>
//                 </td>
//             </tr>
//         );
//     }

//     return (
//         <Table striped bordered hover responsive>
//             <thead>
//                 <tr>
//                     <th></th>
//                     <th>Product ID</th>
//                     <th>Product Name</th>
//                     <th>Product Price</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <Pagination data={products} RenderComponent={TableRow} pageLimit={1} dataLimit={5} tablePagination={true} />
//             </tbody>
//         </Table>
//     );
// }

// export default DashboardProducts;


// DashboardProducts.js
import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import "./DashboardProducts.css";
import Pagination from "./Pagination";

function DashboardProducts() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  function handleDeleteProduct(id) {
    if (window.confirm("Are you sure?")) deleteProduct({ product_id: id, user_id: user._id });
  }

  function TableRow({ pictures, _id, name, price }) {
    const customId = useSelector((state) => {
      const product = state.products.find((product) => product._id === _id);
      return product ? product.customId : "";
    });
    return (
      <tr>
        <td>
          <img src={pictures[0].url} className="dashboard-product-preview" alt="Product" />
        </td>
        <td>{customId}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td><br/>
          <Link to={`/product/${_id}/edit`} className="Color btn-warning">
            Edit
          </Link>
          <br />
          <br />
          <Button className="deleteNotChange" onClick={() => handleDeleteProduct(_id, user._id)} disabled={isLoading}>
            Delete
          </Button>
        </td>
      </tr>
    );
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Product</th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <Pagination data={products} RenderComponent={TableRow} pageLimit={1} dataLimit={5} tablePagination={true} />
      </tbody>
    </Table>
  );
}

export default DashboardProducts;
