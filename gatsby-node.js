const TEMP_suggestions = [
	{ text: 'Apple', handle: 'apple' },
	{ text: 'Banana', handle: 'banana' },
	{ text: 'Cherry', handle: 'cherry' },
	{ text: 'Grapefruit', handle: 'grapefruit' },
	{ text: 'Lemon', handle: 'lemon' },
];

exports.createPages = ({ actions }) => {
	const { createPage } = actions;

	TEMP_suggestions.forEach(dog => {
		createPage({
			path: `/${dog.handle}`,
			component: require.resolve(`./src/templates/view.js`),
			context: { handle: dog.handle },
		});
	});
};
