import { request, gql } from 'graphql-request'

const grapghqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            excerpt
            slug
            title
            featuredPicture {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(grapghqlAPI, query)
  console.log(result.postsConnection.edges)
  return result.postsConnection.edges
}

export const getRecentPosts = async () => {
  const query = gql`
  query GetPostDetails() {
    posts(
      orderBy: createdAt_ASC
      last: 3
    ) {
      title
      featuredPicture {
        url
      }
      createdAt
      slug
    }
  }
  `
  const result = await request(grapghqlAPI, query)
  return result.posts
}

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredPicture {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(grapghqlAPI, query, {categories, slug})
  return result.posts
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `
  const result = await request(grapghqlAPI, query)
  return result.categories
}

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        excerpt
        slug
        title
        featuredPicture {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `

  const result = await request(grapghqlAPI, query, {slug})
  return result.post
}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj),
  })

  return result.json();
}

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: {post: {slug: $slug}}) {
        name,
        createdAt,
        comment
      }
    }
  `
  const result = await request(grapghqlAPI, query, {slug})
  return result.comments
}