import styled, { createGlobalStyle } from 'styled-components';

export const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2rem;
`;

export const Product = styled.div`
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  cursor: pointer;

  h2 {
    padding: 0.5rem 0rem;
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`;
