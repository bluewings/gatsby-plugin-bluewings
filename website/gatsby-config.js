module.exports = {
  pathPrefix: '/gatsby-plugin-bluewings',
  // Customize your site metadata:
  siteMetadata: {
    title: [
      ["ko", "개츠비 스타터 MDX"],
      ["en", "Gatsby Starter MDX"],
    ],
    author: "My Name",
    description: [
      ["ko", "사이트 설명...\n사이트 설명..."],
      ["en", "My site description...\nMy site description..."],
    ],
    social: [{
        name: "twitter",
        url: "https://twitter.com/gatsbyjs",
      },
      {
        name: "github",
        url: "https://github.com/gatsbyjs",
      },
    ],
  },
  plugins: [
    // "gatsby-theme-blog",
    {
      resolve: "gatsby-plugin-bluewings",
      options: {
        langKeyDefault: "ko",
        editOnGithub: {
          url: "https://github.com/bluewings/gatsby-plugin-bluewings",
          directory: "website",
          branch: "master",
        },
        disqusShortname: "gatsby-starter-mdx-blog",
      },
    },
  ],
}