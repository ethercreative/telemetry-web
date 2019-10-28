import React, { MouseEvent } from 'react';
import styles from './Footer.module.scss';
import FooterDivider from '../../_svg/FooterDivider';
import List from '../List/List';

const onFindClick = (e: MouseEvent) => {
	e.preventDefault();
	window.scrollTo(0, 0);
	(document.querySelector('[type=search]') as HTMLInputElement).focus();
};

const Footer = () => (
	<footer className={styles.wrap}>
		{FooterDivider}
		<div className={styles.container}>
			<List>
				<li><strong>Telemetry</strong></li>
				<li><a href="https://github.com/ethercreative/telemetry/blob/master/README.md" target="_blank" rel="noopener noreferrer">For plugin developers</a></li>
				<li><button onClick={onFindClick}>Find a plugin</button></li>
				<li><a href="https://github.com/ethercreative/telemetry" target="_blank" rel="noopener noreferrer">On GitHub</a></li>
			</List>
			<a href="https://ethercreative.co.uk">
				Made with <object>
					<a href="https://www.youtube.com/watch?v=ussCHoQttyQ" target="_blank" rel="noopener noreferrer">neutrality</a>
				</object> by ether
			</a>
		</div>
	</footer>
);

export default Footer;
