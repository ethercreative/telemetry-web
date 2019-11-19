import React from 'react';
import css from '../_scss/list.module.scss';

const List = ({ children, className, ...props }) => (
	<ul {...props} className={[className, css.list].filter(Boolean).join(' ')}>
		{children}
	</ul>
);

export default List;
