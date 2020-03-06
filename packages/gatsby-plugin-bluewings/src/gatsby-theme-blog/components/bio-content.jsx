// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/bio-content.js
import React, { Fragment, useMemo } from 'react';
import { getLocalText } from './util';

/**
 * Shadow me to add your own bio content
 */

export default ({ description, pageContext = {} }) => {
  const desc = useMemo(
    () =>
      getLocalText(description, pageContext)
        .split(/\n/)
        .reduce((accum, e, i) => [...accum, i > 0 ? <br /> : null, e].filter((e) => e), []),
    [description, pageContext.langKey, pageContext.langKeyDefault],
  );
  return <Fragment>{desc}</Fragment>;
};
