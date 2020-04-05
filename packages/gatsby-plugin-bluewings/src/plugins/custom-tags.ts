const grid = {
  import: [`import { Bluewings } from 'gatsby-plugin-bluewings'`],
  open: ({ isFirst, args, params: { layoutFixed, xs }, style }: any) => ({
    type: 'jsx',
    value: `${isFirst ? '<Bluewings.Row>' : ''}<Bluewings.Column args={${JSON.stringify(args)}} 
    layoutFixed={${!!layoutFixed}} 
    xs={${JSON.stringify(xs)}}
    style={${JSON.stringify(style)}}
    >`,
  }),
  close: ({ finale }: any) => ({
    type: 'jsx',
    value: `</Bluewings.Column>${finale ? '</Bluewings.Row>' : ''}`,
  }),
};

const section = {
  import: null,
  open: ({ className, dataProps, style }: any) => ({
    type: 'jsx',
    value: `<section
      ${className ? `className="${className}"` : ''}
      ${dataProps} 
      style={${JSON.stringify(style)}}
    >`,
  }),
  close: {
    type: 'jsx',
    value: '</section>',
  },
};

const context = {
  import: `import { Bluewings } from 'gatsby-plugin-bluewings'`,
  open: {
    type: 'jsx',
    value: '<Bluewings.DataProvider>',
  },
  close: {
    type: 'jsx',
    value: '</Bluewings.DataProvider>',
  },
};

const customTags = {
  grid,
  section,
  context,
};

export default customTags;
