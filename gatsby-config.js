// TODO revise
module.exports = {
  siteMetadata: {
    title: `Resonancia Colectiva`,
    description: `Encuentros electroacústicos en laboratorios improvisados`,
    siteUrl: `https://pandemi-ae.vercel.app/`,
    links: [
      {
        icon: "youtube",
        description: "Canal de YouTube",
        url:
          "https://www.youtube.com/channel/UCHPCyWLViJmn7FRdauLJMrw/featured",
      },
      {
        icon: "instagram",
        description: "@Pandemi.ae",
        url: "https://www.instagram.com/pandemi.ae/",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/temas`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590, // TODO revise
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    // `gatsby-plugin-feed`, // TODO revise
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Resonancia Colectiva`,
        short_name: `Pandemi.ae`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Major Mono Display"],
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    "gatsby-plugin-eslint",
    "gatsby-plugin-transition-link",
    "gatsby-plugin-emotion",
  ],
}
