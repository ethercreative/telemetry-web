import React, { useState } from 'react';
import styles from './Search.module.scss';
import SearchIcon from '../../_svg/SearchIcon';
import AutoSuggest from 'react-autosuggest';

const TEMP_suggestions = [
	{ text: 'Apple' },
	{ text: 'Banana' },
	{ text: 'Cherry' },
	{ text: 'Grapefruit' },
	{ text: 'Lemon' },
];

const Search = () => {
	const [value, setValue] = useState<string>('');

	return (
		<AutoSuggest
			theme={styles}
			suggestions={TEMP_suggestions}
			onSuggestionsFetchRequested={() => {}}
			onSuggestionsClearRequested={() => {}}
			getSuggestionValue={s => s.text}
			renderSuggestion={s => (
				<>
					<i />
					<div>
						<strong>{s.text}</strong>
						<small>by Ether</small>
					</div>
				</>
			)}
			inputProps={{
				type: 'search',
				placeholder: 'Search for a plugin...',
				className: styles.input,
				value,
				onChange: (_, { newValue }) => setValue(newValue),
			}}
			// @ts-ignore
			renderInputComponent={props => <label className={styles.label}>{SearchIcon}<input {...props} /></label>}
		/>
	);
};

export default Search;
