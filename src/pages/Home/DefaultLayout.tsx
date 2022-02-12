import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

export const DefaultLayout = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.main`
  position: relative;

  overflow-x: hidden;
  overflow-y: scroll;

  width: 100%;
  height: 100vh;

  box-sizing: border-box;
`;
