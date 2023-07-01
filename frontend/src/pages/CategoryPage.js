import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProductPreview from "../components/ProductPreview";
import "./CategoryPage.css";
import Pagination from "../components/Pagination";
import Navigation from "../components/Navigation";
import { FcSearch } from "react-icons/fc";
function CategoryPage() {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/category/${category}`)
      .then(({ data }) => {
        setLoading(false);
        setProducts(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [category]);
  if (loading) {
    return <Loading />;
  }
  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function ProductSearch({ _id, category, name, pictures }) {
    return (
      <ProductPreview
        _id={_id}
        category={category}
        name={name}
        pictures={pictures}
      />
    );
  }
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchBarClick = () => {
    setIsPlaceholderVisible(false);
  };
  const handleSearchBarFocus = () => {
    setIsSearchBarFocused(true);
  };
  const handleSearchBarBlur = () => {
    setIsSearchBarFocused(false);
    if (searchTerm === "") {
      setIsPlaceholderVisible(true);
    }
  };
  return (
    <div>
      <Navigation />
      <div
        className={`pt-3 ${category}-banner-container category-banner-container`}
        id="icon"
        style={{ color: "white" }}
      >
        <h1 className="text-center">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
      </div>
      <div
        className="filters-container d-flex justify-content-center pt-4 pb-4"
        style={{
          width: "19%",
          marginLeft: "42%",
          marginTop: "20px"
        }}
      >
        <input
          type="search"
          placeholder={isPlaceholderVisible ? "   Search..." : ""}
          value={searchTerm}
          onChange={handleSearchTermChange}
          onClick={handleSearchBarClick}
          onFocus={handleSearchBarFocus}
          onBlur={handleSearchBarBlur}
        />
        {!isSearchBarFocused && (
          <span className="search-icon">
            <FcSearch />
          </span>
        )}
      </div>
      {productsSearch.length === 0 ? (
        <h1>No products to show</h1>
      ) : (
        <Container className="Col">
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <Pagination
                data={productsSearch}
                RenderComponent={ProductSearch}
                pageLimit={1}
                dataLimit={5}
                tablePagination={false}
              />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
export default CategoryPage;