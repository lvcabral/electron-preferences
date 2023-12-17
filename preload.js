'use strict';

const electron = require('electron');

const { contextBridge } = electron;
const { ipcRenderer } = electron;

const deserializeJson = (serializedJavascript) => eval('(' + serializedJavascript + ')'); //deserialize function for 'serialize-javascript' library
let onPreferencesUpdatedHandler = () => { };

contextBridge.exposeInMainWorld('api', {
	getSections: () => deserializeJson(ipcRenderer.sendSync('getSections')),
	getPreferences: () => ipcRenderer.sendSync('getPreferences'),
	getDefaults: () => ipcRenderer.sendSync('getDefaults'),
	getConfig: () => ipcRenderer.sendSync('getConfig'),
	setPreferences: preferences => ipcRenderer.send('setPreferences', preferences),
	closePreferences: () => ipcRenderer.sendSync('closePreferences'),
	showOpenDialog: dialogOptions => ipcRenderer.sendSync('showOpenDialog', dialogOptions),
	sendButtonClick: channel => ipcRenderer.send('sendButtonClick', channel),
	encrypt: secret => ipcRenderer.sendSync('encrypt', secret),
	onPreferencesUpdated: handler => { onPreferencesUpdatedHandler = handler; },
	processPlatform: () => { return process.platform; },
});
ipcRenderer.on('preferencesUpdated', (e, preferences) => {
	onPreferencesUpdatedHandler(preferences);
});
