import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import TelemetryIcon from '../../_svg/TelemetryIcon';
import Search from '../Search/Search';

const Header = ({ defaultValue = '' } : { defaultValue ?: string }) => (
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
