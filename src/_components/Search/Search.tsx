import React, { useState } from 'react';
import styles from './Search.module.scss';
import SearchIcon from '../../_svg/SearchIcon';
import AutoSuggest from 'react-autosuggest';
import { Link, useHistory } from 'react-router-dom';

const TEMP_suggestions = [
	{ text: 'Apple', handle: 'apple' },
	{ text: 'Banana', handle: 'banana' },
	{ text: 'Cherry', handle: 'cherry' },
	{ text: 'Grapefruit', handle: 'grapefruit' },
	{ text: 'Lemon', handle: 'lemon' },
];

const Search = ({ defaultValue = '', small = false } : { defaultValue ?: string; small ?: boolean }) => {
	const history = useHistory()
		, [value, setValue] = useState<string>(defaultValue);

	return (
		<AutoSuggest
			theme={styles}
			suggestions={TEMP_suggestions}
			onSuggestionsFetchRequested={() => {}}
			onSuggestionsClearRequested={() => {}}
			getSuggestionValue={s => s.text}
			onSuggestionSelected={(e, { suggestion }) => {
				history.push(`/${suggestion.handle}`);
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
			// @ts-ignore
			renderInputComponent={props => <label className={styles.label}>{SearchIcon}<input {...props} autoFocus={defaultValue === ''} /></label>}
		/>
	);
};

export default Search;
