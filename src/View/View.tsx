import React from 'react';
import Helmet from 'react-helmet';
import Header from '../_components/Header/Header';
import { useParams } from 'react-router-dom';

const View = () => {
	const { handle } = useParams();

	return (
		<>
			<Helmet>
				<title>{handle} - Telemetry</title>
			</Helmet>
			<Header defaultValue={handle} />
		</>
	);
};

export default View;
