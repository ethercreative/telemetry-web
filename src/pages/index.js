import React from 'react';
import css from '../_scss/index.module.scss';
import { Helmet } from 'react-helmet';
import TelemetryIcon from "../_svg/TelemetryIcon";
import IndexGraphic from "../_svg/IndexGraphic";
import Search from "../_components/Search";
import IndexDivider from "../_svg/IndexDivider";
import List from "../_components/List";
import Layout from "../_components/Layout";

const Section = ({ children, dark }) => (
	<section className={[css.section, dark ? css.dark : null].filter(Boolean).join(' ')}>
		<div className={[css.container, css.grid].join(' ')}>
			{children}
		</div>
	</section>
);

const Docs = ({ children }) => (
	<a
		href="https://github.com/ethercreative/telemetry/blob/master/README.md"
		target="_blank"
		rel="noopener noreferrer"
	>
		{children}
	</a>
);

export default () => (
	<Layout>
		<Helmet>
			<title>Telemetry</title>
		</Helmet>
		<header className={css.hero}>
			<div className={css.inner}>
				<div>
					{TelemetryIcon}
					<h1>Telemetry</h1>
					<p>An opt-in platform for anonymous, public sharing of
						‘accurate’ Craft plugin analytics. It includes ‘live’
						current installs and allows you to analyse version and
						edition usage.</p>
					<Search />
					<div className={css.pill}>
						Are you a plugin author? <Docs>Add this to your plugin.</Docs>
					</div>
				</div>
				<div>
					{IndexGraphic}
				</div>
			</div>
		</header>
		{IndexDivider}
		<Section>
			<div>
				<h2>What is this</h2>
				<p>It’s a really simple way for Craft CMS plugin authors to get
					accurate, anonymous analytical usage of their plugins. We
					only send the bare minimum data and none of it is tied back
					to any particular Craft install. We collect the following
					data:</p>
				<List>
					<li>The plugin handle</li>
					<li>The plugin version</li>
					<li>The plugin edition that’s installed</li>
					<li>The available editions</li>
					<li>If the plugin is installed</li>
					<li>If the plugin is enabled</li>
					<li>The license key status</li>
					<li>License key issues</li>
					<li>If the plugin is being used in trial mode</li>
					<li>The website environment</li>
					<li>The PHP version</li>
				</List>
			</div>
		</Section>
		<Section dark>
			<div>
				<h2>Okay, fine. But why?</h2>
				<p>There are a couple of reasons, but the main one is that we
					don’t currently accurately know how many active installs our
					plugins have. The only figure we have to go by is the number
					shown on plugins.craftcms.com, which is just the number of
					times it has been installed via packagist.</p>
				<List>
					<li>Sites actively using the plugin</li>
					<li>Sites with the plugin but that have it inactive</li>
					<li>Edition usage information</li>
				</List>
			</div>
		</Section>
		<Section>
			<div>
				<h2>...and this is all public?</h2>
				<p>You betcha. For plugin devs this is opt-in, so they can
					decide if they want to analyse thier plugin data. We don’t
					see any issue with sharing the real numbers; but we get it
					if some have a problem with it.</p>
				<p>As for site owners/developers , since the data is totally
					anonymous we can’t see a reason why anyone would object to
					the tracking. If you really don’t want to, there’s a config
					setting that’ll opt you out.</p>
				<p>Fancy giving it a whirl? <Docs>Head over to the docs.</Docs></p>
			</div>
		</Section>
	</Layout>
);
