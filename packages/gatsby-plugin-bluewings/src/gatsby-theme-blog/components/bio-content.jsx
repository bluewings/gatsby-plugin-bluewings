// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/bio-content.js
import React, { Fragment, useMemo } from 'react';
import { getLocalText } from './util';

/**
 * Shadow me to add your own bio content
 */

export default ({ description, pageContext = {} }) => {
  const { langKey, langKeyDefault } = pageContext;
  const desc = useMemo(
    () =>
      getLocalText(description, { langKey, langKeyDefault })
        .split(/\n/)
        .reduce((accum, e, i) => [...accum, i > 0 ? <br /> : null, e].filter((e) => e), [])
        .map((e, i) => <Fragment key={i}>{e}</Fragment>),
    [description, langKey, langKeyDefault],
  );
  return <Fragment>{desc}</Fragment>;
};
