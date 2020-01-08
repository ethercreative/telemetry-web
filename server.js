require('dotenv').config();

const express = require('express')
	, nunjucks = require('nunjucks')
	, postgres = require('postgres')
	, fs = require('fs');

const { DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const app = express()
	, sql = postgres(`postgres://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_DATABASE}`);

nunjucks.configure('templates', {
	autoescape: true,
	express: app
});

app.set('templates','./templates');
app.set('view engine', 'html');
app.use(express.static('web'));

// Helpers
// =========================================================================

function manifest () {
	return JSON.parse(fs.readFileSync('manifest.json').toString());
}

// Routes
// =========================================================================

app.get('/', async (req, res) => {
	let data;

	try {
		data = await sql`
		  select * from stats
		`;
	} catch (e) {
		data = e;
	}

	res.render('index.twig', {
		data,
		manifest: manifest(),
	});
});

// Listen
// =========================================================================

app.listen(3000);
