import React from 'react';
import Helmet from 'react-helmet';
import Header from '../_components/Header';
import Layout from "../_components/Layout";

const View = ({ pageContext: { handle } }) => (
	<Layout>
		<Helmet>
			<title>{handle} - Telemetry</title>
		</Helmet>
		<Header defaultValue={handle} />
	</Layout>
);

export default View;
