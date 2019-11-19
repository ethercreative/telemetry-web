import React from 'react';
import css from '../_scss/footer.module.scss';
import List from "./List";
import FooterDivider from "../_svg/FooterDivider";

const onFindClick = (e) => {
	e.preventDefault();
	window.scrollTo(0, 0);
	document.querySelector('[type=search]').focus();
};

const Layout = ({ children }) => (
	<>
		{children}
		<footer className={css.wrap}>
			{FooterDivider}
			<div className={css.container}>
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
	</>
);

export default Layout;
