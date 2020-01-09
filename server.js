require('dotenv').config();

const express = require('express')
	, nunjucks = require('nunjucks')
	, postgres = require('postgres')
	, fs = require('fs')
	, querystring = require('querystring')
	, crypto = require('crypto');

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

// Routes: Index
// -------------------------------------------------------------------------

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

// Routes: Plugin
// -------------------------------------------------------------------------

app.get('/:handle', async (req, res) => {
	// TODO: Lookup handle in DB
	const plugin = {
		handle: req.params.handle,
		name: req.params.handle.toUpperCase(),
	};

	// TODO: If plugin doesn't exist, 404

	res.status(200).render('_view.twig', {
		plugin,
		manifest: manifest(),
	});
});

// Routes: Tell
// -------------------------------------------------------------------------

app.post('/', async (req, res) => {
	const data = req.get('X-Telemetry');

	if (data === '') {
		const key = crypto.randomBytes(128).toString('hex');
		// TODO: Check key against DB?
		res.status(200).send(key);
		return;
	}

	// End the request immediately to prevent any unnecessary slowness from
	// our end
	res.status(200).end();

	const info = querystring.parse(data.replace(/%5B(\d*)%5D/g, ''));

	if (!Array.isArray(info.editions))
		info.editions = [info.editions];

	const allowedKeys = [
		'key',
		'handle',
		'version',
		'edition',
		'editions',
		'installed',
		'enabled',
		'license',
		'issues',
		'env',
		'php',
	];

	Object.keys(info).forEach(key => {
		if (allowedKeys.indexOf(key) === -1)
			delete info[key];
	});

	info.editions = sql.array(info.editions);

	sql`insert into stats ${sql(info)}`;
	
	// TODO: If no plugin exists with the given handle in our DB try to get it
});

// Listen
// =========================================================================

app.listen(3000);
