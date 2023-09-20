import { gql } from 'urql';

export const PRODUCT_QUERY = gql`
  query {
    products {
      data {
        attributes {
          description
          title
          slug
          price
          image {
            data {
              attributes {
                formats
              }
            }
          }
        }
      }
    }
  }
`;
