require('dotenv').config();

const express = require('express')
	, Twig = require('twig')
	, postgres = require('postgres')
	, fs = require('fs')
	, querystring = require('querystring')
	, crypto = require('crypto')
	, https = require('https');

const { DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const app = express()
	, sql = postgres(`postgres://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_DATABASE}`);

app.set('twig options', {
	allow_async: true,
	strict_variables: false,
});
app.use(express.static('web'));

// Helpers
// =========================================================================

async function getJson (url) {
	return new Promise((resolve, reject) => {
		https.get(url, res => {
			let body = '';

			res.on('data', chunk => {
				body += chunk;
			});

			res.on('end', () => {
				resolve(JSON.parse(body));
			});
		}).on('error', reject);
	});
}

const globals = async () => ({
	plugins: await sql`
		select handle, name, developer, icon from plugins
	`,
	manifest: JSON.parse(fs.readFileSync('manifest.json').toString()),
});

// Routes
// =========================================================================

// Routes: Index
// -------------------------------------------------------------------------

app.get('/', async (req, res) => {
	res.render('index.twig', {
		...await globals(),
	});
});

// Routes: Plugin
// -------------------------------------------------------------------------

app.get('/:handle', async (req, res) => {
	const handle = sql(req.params.handle.toLowerCase());

	// Get plugin meta
	// -------------------------------------------------------------------------

	let plugin = await sql`
		select * from plugins where handle = '${handle}'
	`;

	if (plugin.length === 0) {
		return res.status(404).render('404.twig', {
			...await globals(),
		});
	}

	plugin = plugin[0];
	plugin.editionsByKey = plugin.editions.reduce((a, b) => {
		a[b.handle] = b.name;
		return a;
	}, {});

	// Get stats
	// -------------------------------------------------------------------------

	const stats = {};

	// Overall installs

	const overall = await sql`
		select count(1), edition from public.stat_query(0)
		where handle = '${handle}'
		  and installed = true
		group by edition, created_at
		order by created_at desc
	`;

	stats.overall = overall.reduce((a, b) => {
		a._all += b.count;
		a[b.edition] = b.count;
		return a;
	}, { _all: 0 });

	// Past month

	const month = await sql`
		select count(1), edition, created_at from public.stat_query(30)
		where handle = '${handle}'
		  and installed = true
		group by edition, created_at
		order by created_at desc
	`;

	const CHART_COLOURS = [
		'#FFDD00',
		'#FF0000',
		'#008EFF',
	];

	const datasets = {};
	let colourIndex = 0;

	month.forEach(v => {
		if (!datasets.hasOwnProperty(v.edition)) {
			datasets[v.edition] = {
				label: plugin.editionsByKey[v.edition],
				borderColor: CHART_COLOURS[colourIndex++],
				data: [],
			};
		}

		datasets[v.edition].data.unshift(v.count);
	});

	const keys = Object.keys(datasets);
	for (let i = 0, l = keys.length; i < l; i++) {
		const l = datasets[keys[i]].data.length;
		if (l < 30) {
			datasets[keys[i]].data = [
				...datasets[keys[i]].data.reverse(),
				...Array.from({ length: 30 - l }, () => 0),
			];
		}
		datasets[keys[i]].data.reverse();
	}

	const formatter = new Intl.DateTimeFormat(
		'en-GB',
		{ year: 'numeric', month: 'long', day: 'numeric' }
	);

	stats.month = {
		labels: Array.from({ length: 30 }, (_, i) => {
			const d = new Date();
			d.setDate(d.getDate() - i);
			return formatter.format(d);
		}).reverse(),
		datasets: Object.values(datasets),
	};

	// TODO: Force length to be 30 days (even if those days are empty)?

	// Render
	// -------------------------------------------------------------------------

	res.status(200).render('_view.twig', {
		plugin,
		stats,
		...await globals(),
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

	// Parse the data
	// -------------------------------------------------------------------------
	const info = querystring.parse(data.replace(/%5B(\d*)%5D/g, ''));

	const allowedKeys = [
		'key',
		'handle',
		'version',
		'edition',
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

	info.handle = info.handle.toLowerCase();

	// Store the data
	// -------------------------------------------------------------------------

	await sql`
		insert into stats ${sql(info)}
		on conflict (key, handle, created_at) do update set ${sql(info)}
	`;

	// Store the plugin
	// -------------------------------------------------------------------------

	const url = `https://api.craftcms.com/v1/plugin-store/plugin/${info.handle}`;
	const pluginData = await getJson(url);

	// Do nothing on error (the plugin might not have been published yet)
	if (!pluginData || pluginData.hasOwnProperty('error'))
		return;

	const plg = {
		handle: pluginData.handle.toLowerCase(),
		name: pluginData.name,
		developer: pluginData.developerName,
		developer_url: pluginData.developerUrl,
		icon: pluginData.iconUrl,
		editions: sql.json(pluginData.editions.map(e => ({ name: e.name, handle: e.handle }))),
	};

	await sql`
		insert into plugins ${sql(plg)}
		on conflict (handle) do update set ${sql(plg)}
	`;
});

// Listen
// =========================================================================

app.listen(3000);
