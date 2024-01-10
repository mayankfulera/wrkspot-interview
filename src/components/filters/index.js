import React from 'react';
import './filters.css';

const Filters = ({
  search,
  handleSearchChange,
  populationFilter,
  handlePopulationChange,
  clearData,
  showCountries,
}) => {
  return (
    <div className="filtersAll">
      <div className="filterWrapper">
        <div className="input-wrapper">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Country Name"
          ></input>
        </div>
        <div className="input-wrapper">
          <select onChange={handlePopulationChange} value={populationFilter}>
            <option>{'Population'}</option>
            <option value={'1M'}>{'< 1 M'}</option>
            <option value={'5M'}>{'< 5 M'}</option>
            <option value={'10M'}>{'< 10 M'}</option>
          </select>
        </div>
        <div className="input-wrapper">
          <p className="clear" onClick={() => clearData()}>
            <u>Clear</u>
          </p>
        </div>
      </div>
      <div className="input-wrapper">
        <button onClick={showCountries}>Show all countries</button>
      </div>
    </div>
  );
};

export default React.memo(Filters);
