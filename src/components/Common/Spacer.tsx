import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  size: string;
  direction?: 'vertical' | 'horizontal';
}

export const Spacer = (props: Props): JSX.Element => {
  return <SpacerWrapper {...props} />;
};

const SpacerWrapper = styled.div<Props>`
  ${({ size, direction = 'vertical' }): SerializedStyles =>
    direction === 'vertical'
      ? css`
          width: 100%;
          height: ${size};
        `
      : css`
          width: ${size};
          height: 100%;
        `}
`;
