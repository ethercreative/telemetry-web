import React from 'react';
import styles from './Index.module.scss';
import IndexGraphic from '../_svg/IndexGraphic';
import Helmet from 'react-helmet';
import TelemetryIcon from '../_svg/TelemetryIcon';
import Search from '../_components/Search/Search';

const Index = () => (
	<>
		<Helmet>
			<title>Telemetry</title>
		</Helmet>
		<header className={styles.hero}>
			<div className={styles.inner}>
				<div>
					{TelemetryIcon}
					<h1>Telemetry</h1>
					<p>An opt-in platform for anonymous, public sharing of
						‘accurate’ Craft plugin analytics. It includes ‘live’
						current installs and allows you to analyse version and
						edition usage.</p>
					<Search />
					<div className={styles.pill}>
						Are you a plugin author? <a
							href="https://github.com/ethercreative/telemetry/blob/master/README.md"
							target="_blank"
							rel="noopener noreferrer"
						>Add this to your plugin.</a>
					</div>
				</div>
				<div>
					{IndexGraphic}
				</div>
			</div>
		</header>
	</>
);

export default Index;
