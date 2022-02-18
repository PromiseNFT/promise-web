import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';

type DetailHeaderProps = HTMLAttributes<HTMLDivElement>;

export const Header = (props: DetailHeaderProps): JSX.Element => {
  return <Wrapper {...props} />;
};

const Wrapper = styled.header`
  z-index: 10;

  position: sticky;

  top: 0;

  width: 100%;
  height: 3.125rem;

  box-sizing: border-box;

  display: flex;
  align-items: center;

  padding-right: 1.375rem;
  padding-left: 1.375rem;
`;

const Center = styled.div`
  margin: 0;

  width: 100%;

  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: -0.8px;

  text-align: center;
`;

const Left = styled.div`
  position: absolute;
  padding: inherit;
  left: 0;
`;

const Right = styled.div`
  position: absolute;
  padding: inherit;
  right: 0;
`;

Header.Center = Center;
Header.Left = Left;
Header.Right = Right;
