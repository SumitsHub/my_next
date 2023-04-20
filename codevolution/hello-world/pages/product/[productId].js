import React from "react";
import { useRouter } from "next/router";

function ProductDetails() {
  const Router = useRouter();
  const productId = Router.query.productId;
  return <div>Product {productId}</div>;
}

export default ProductDetails;
