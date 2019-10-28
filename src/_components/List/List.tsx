import React from 'react';
import styles from './List.module.scss';

const List = ({ children, className, ...props } : React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
	<ul {...props} className={[className, styles.list].filter(Boolean).join(' ')}>
		{children}
	</ul>
);

export default List;
