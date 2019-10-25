import React from 'react';
import styles from './Index.module.scss';
import indexGraphic from '../_svg/indexGraphic';
import Helmet from 'react-helmet';

const Index = () => (
	<>
		<Helmet>
			<title>Telemetry</title>
		</Helmet>
		<header className={styles.hero}>
			<div className={styles.inner}>
				<div>
					<h1>Telemetry</h1>
					<p>An opt-in platform for anonymous, public sharing of
						‘accurate’ Craft plugin analytics. It includes ‘live’
						current installs and allows you to analyse version and
						edition usage.</p>
				</div>
				<div>
					{indexGraphic}
				</div>
			</div>
		</header>
	</>
);

export default Index;
