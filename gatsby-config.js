/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require('dotenv').config();

const { DB_USER, DB_PASS, DB_DATABASE } = process.env;

module.exports = {
	plugins: [
		'gatsby-plugin-sass',
		'gatsby-plugin-react-helmet',
		// {
		// 	resolve: 'gatsby-source-pg',
		// 	options: {
		// 		connectionString: `postgres://${DB_USER}:${DB_PASS}@postgres:5432/${DB_DATABASE}`,
		// 		schema: 'public',
		// 		refetchInterval: 60,
		// 	},
		// },
	],
};
