import React from 'react'
import { useRouter } from 'next/router'

function Review() {
    const Router = useRouter();
    const {productId, reviewId} = Router.query;
    
  return (
    <div>Review {reviewId} for product {productId}</div>
  )
}

export default Review