/* global api, document */

/* Electron Renderer Process */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import debounce from './utils/debounce.js';
import Sidebar from './components/sidebar';
import Main from './components/main';
import '../../scss/style.scss';

const allSections = api.getSections();
const initialPreferences = api.getPreferences();
const config = api.getConfig();

const filterEnabledSections = sections => sections.filter(section => _.isBoolean(section.enabled) ? section.enabled : true);

const initialSections = filterEnabledSections(allSections);

const savePreferences = preferences => {

	api.setPreferences(preferences);

};

const debounceDelay = (!isNaN(config.debounce) && config.debounce);
const savePreferencesDebounced = debounce(preferences => savePreferences(preferences), debounceDelay ?? 150);

for (const section of initialSections) {

	if (!initialPreferences[section.id]) {

		initialPreferences[section.id] = {};

	}

}

class App extends React.Component {

	constructor(props) {

		super(props);
		const defaultActiveSection = initialSections[0]?.id ?? '';
		this.state = {
			sections: initialSections,
			activeSection: defaultActiveSection,
			preferences: initialPreferences,
		};

	}

	render() {

		return (
			<React.Fragment>
				<Sidebar { ...this.state } onSelectSection={ this.onSelectSection.bind(this) } />
				<Main { ...this.state } onFieldChange={ this.onFieldChange.bind(this) } />
			</React.Fragment>
		);

	}

	componentDidMount() {

		api.onSectionsUpdated(updatedSections => {

			const filteredSections = filterEnabledSections(updatedSections);
			this.setState(prevState => {

				const updatedPreferences = { ...prevState.preferences };
				for (const section of filteredSections) {

					if (!updatedPreferences[section.id]) {

						updatedPreferences[section.id] = {};

					}

				}

				let nextActiveSection = prevState.activeSection;
				const sectionExists = filteredSections.some(section => section.id === nextActiveSection);
				if (!sectionExists) {

					nextActiveSection = filteredSections.length > 0 ? filteredSections[0].id : '';

				}

				return {
					sections: filteredSections,
					activeSection: nextActiveSection,
					preferences: updatedPreferences,
				};

			});

		});

		api.onPreferencesUpdated(updatedPreferences => {

			this.setState({
				preferences: updatedPreferences,
			});

		});

	}

	onSelectSection(sectionId) {

		this.setState({
			activeSection: sectionId,
		});

	}

	onFieldChange(key, value) {

		this.setState(prevState => {

			const updatedPreferences = { ...prevState.preferences };
			const activeSectionId = prevState.activeSection;
			const sectionPreferences = { ...(updatedPreferences[activeSectionId] || {}) };
			sectionPreferences[key] = value;
			updatedPreferences[activeSectionId] = sectionPreferences;

			savePreferencesDebounced(updatedPreferences);

			return {
				preferences: updatedPreferences,
			};

		});

	}

}

ReactDOM.render(
	<App />,
	document.querySelector('#window'),
);
