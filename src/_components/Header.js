import React from 'react';
import styles from '../_scss/Header.module.scss';
import { Link } from 'gatsby';
import TelemetryIcon from '../_svg/TelemetryIcon';
import Search from './Search';

const Header = ({ defaultValue = '' }) => (
	<header className={styles.header}>
		<div className={styles.container}>
			<Link to="/" className={styles.logo}>
				{TelemetryIcon}
				Telemetry
			</Link>

			<Search small defaultValue={defaultValue} />
		</div>
	</header>
);

export default Header;
