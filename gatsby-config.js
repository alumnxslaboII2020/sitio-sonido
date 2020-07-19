// TODO revise
module.exports = {
  siteMetadata: {
    title: `AAEE DISCO 2020`,
    author: {
      name: `Resonancia colectiva: encuentros electroacústicos en laboratorios improvisados`,
    },
    description: `Proyecto fonográfico LABO II 2020`,
    siteUrl: `https://pandemi-ae.vercel.app/`,
    links: [
      {
        site: "youtube",
        name: "Alumnxs Labo II",
        url:
          "https://www.youtube.com/channel/UCHPCyWLViJmn7FRdauLJMrw/featured",
      }
    ]
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
          families: ["Poppins"],
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
