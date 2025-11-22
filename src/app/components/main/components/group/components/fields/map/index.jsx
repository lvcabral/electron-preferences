'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const MapField = ({ field, value, onChange }) => {
  const [newKey, setNewKey] = React.useState('');
  const [newValue, setNewValue] = React.useState('');

  const mapValue = value || {};
  const entries = Object.entries(mapValue);

  const handleAdd = () => {
    if (newKey.trim() === '' || newValue.trim() === '') {
      return;
    }

    const updatedMap = { ...mapValue, [newKey.trim()]: newValue.trim() };
    onChange(updatedMap);
    setNewKey('');
    setNewValue('');
  };

  const handleDelete = (keyToDelete) => {
    const updatedMap = { ...mapValue };
    delete updatedMap[keyToDelete];
    onChange(updatedMap);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const style = field.style || {};
  const label = field.label;
  const help = field.help;
  const keyLabel = field.keyLabel || 'Key';
  const valueLabel = field.valueLabel || 'Value';
  const addButtonLabel = field.addButtonLabel || 'Add';

  return (
    <div className={`field field-map key-${field.key}`}>
      <div className="field-label" aria-label={label}>
        {label}
      </div>
      <div>
        <div className="ep-map-list-container" style={style}>
          {entries.length === 0 ? (
            <div className="ep-map-empty">No entries yet</div>
          ) : (
            <ul className="ep-map-list">
              {entries.map(([key, val]) => (
                <li key={key} className="ep-map-item">
                  <span className="ep-map-item-content">
                    <span className="ep-map-item-key">{key}</span>
                    <span className="ep-map-item-separator">:</span>
                    <span className="ep-map-item-value">{val}</span>
                  </span>
                  <button
                    className="ep-map-item-delete"
                    onClick={() => handleDelete(key)}
                    aria-label={`Delete ${key}`}
                    title="Delete"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="ep-map-input-container">
          <div className="ep-map-input-group">
            <label className="ep-map-input-label">{keyLabel}</label>
            <input
              className="ep-map-input"
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label={keyLabel}
              placeholder={keyLabel}
            />
          </div>
          <div className="ep-map-input-group">
            <label className="ep-map-input-label">{valueLabel}</label>
            <input
              className="ep-map-input"
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label={valueLabel}
              placeholder={valueLabel}
            />
          </div>
          <button
            className="ep-map-add-button"
            onClick={handleAdd}
            aria-label={addButtonLabel}
            disabled={newKey.trim() === '' || newValue.trim() === ''}
          >
            {addButtonLabel}
          </button>
        </div>
      </div>
      {help && <span className="help">{help}</span>}
    </div>
  );
};

MapField.propTypes = {
  field: PropTypes.object,
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default MapField;
