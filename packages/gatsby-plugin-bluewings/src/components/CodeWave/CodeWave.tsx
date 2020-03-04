import * as React from 'react';
import { useColorMode } from 'theme-ui';
// @ts-ignore
import { CodeWave } from 'gatsby-theme-waves';

function WrapCodeWave(props: any) {
  const [color] = useColorMode();
  const variant = color === 'dark' ? 'dark' : 'default';
  return <CodeWave {...props} variant={variant} />;
}

export default WrapCodeWave;
