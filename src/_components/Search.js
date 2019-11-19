import React, { useState } from 'react';
import styles from '../_scss/search.module.scss';
import SearchIcon from '../_svg/SearchIcon';
import { Link, navigate } from 'gatsby';
import AutoSuggest from 'react-autosuggest';

const TEMP_suggestions = [
	{ text: 'Apple', handle: 'apple' },
	{ text: 'Banana', handle: 'banana' },
	{ text: 'Cherry', handle: 'cherry' },
	{ text: 'Grapefruit', handle: 'grapefruit' },
	{ text: 'Lemon', handle: 'lemon' },
];

export default ({ defaultValue = '', small = false }) => {
	const [value, setValue] = useState(defaultValue);

	return (
		<AutoSuggest
			theme={styles}
			suggestions={TEMP_suggestions}
			onSuggestionsFetchRequested={() => {}}
			onSuggestionsClearRequested={() => {}}
			getSuggestionValue={s => s.text}
			onSuggestionSelected={(e, { suggestion }) => {
				navigate(`/${suggestion.handle}`);
			}}
			renderSuggestion={s => (
				<Link to={`/${s.handle}`}>
					<i />
					<div>
						<strong>{s.text}</strong>
						<small>by Ether</small>
					</div>
				</Link>
			)}
			inputProps={{
				type: 'search',
				placeholder: 'Search for a plugin...',
				className: small ? [styles.input, styles.small].join(' ') : styles.input,
				value,
				onChange: (_, { newValue }) => setValue(newValue),
			}}
			renderInputComponent={props => (
				<label className={styles.label}>
					{SearchIcon}
					<input {...props} autoFocus={defaultValue === ''} />
				</label>
			)}
		/>
	);
};
