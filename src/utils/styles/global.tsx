import { css, Global } from '@emotion/react';

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        margin: 0;
        min-height: 100%;

        font-family: InterSpo, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        -webkit-font-smoothing: subpixel-antialiased;

        flex-direction: column;
        flex: 1;
        display: flex;

        .reset-typography {
          font-size: initial;
          font-weight: normal;
          margin: 0;
          padding: 0;
        }
      }
    `}
  />
);
