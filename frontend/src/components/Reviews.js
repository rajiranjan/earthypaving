import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteReviewsMutation } from "../services/appApi";
import axios from "../axios";
import Loading from "./Loading";
function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [deleteReviews, { isLoading, isSuccess }] = useDeleteReviewsMutation();
  function handleDeleteReview(id) {
    if (window.confirm("Are you sure?")) {
      deleteReviews({ reviewId: id, userId: user._id })
        .unwrap()
        .then(() => {
          setReviews((prevReviews) => prevReviews.filter((review) => review._id !== id));
        })
        .catch((error) => {
          console.log("Delete review error:", error);
        });
    }
  }
  // function handleDeleteReview(id) {
  //   if (window.confirm("Are you sure?")) {
  //     deleteReviews({ reviewId: id })
  //       .then(() => {
  //         // Perform any necessary actions after successful deletion
  //         // For example, you can update the state or show a success message
  //         console.log("Review deleted successfully");
  //       })
  //       .catch((error) => {
  //         // Handle the error if deletion fails
  //         console.log(error);
  //       });
  //   }
  // }
  useEffect(() => {
    setLoading(true);
    axios
      .get("/reviews")
      .then(({ data }) => {
        setLoading(false);
        setReviews(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);
  if (loading) return <Loading />;
  if (reviews?.length === 0) return <h2 className="py-2 text-center">No Reviews yet</h2>;
  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Rating</th>
          <th>Comment</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => (
          <tr key={review._id}>
            <td>{review._id}</td>
            <td>{review.rating}</td>
            <td>{review.comment}</td>
            <td>
              <Button onClick={() => handleDeleteReview(review._id)} disabled={isLoading}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default Reviews;