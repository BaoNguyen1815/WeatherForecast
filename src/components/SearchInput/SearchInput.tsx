'use client'

import { useWeatherMutation } from '@/queries/weather';
import { weatherSlice } from '@/store/WeatherReducer';
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import './SearchInput.scss';
import Input from '../base/Input/Input';

const SearchInput: React.FC = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate } = useWeatherMutation();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    dispatch(weatherSlice.actions.fetchWeatherStart());
    setShowSuggestions(false);
    setSearch('');
    mutate(search);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFocus = () => {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setSuggestions(recentSearches);
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearch('');
    setShowSuggestions(false);
    mutate(suggestion);
    dispatch(weatherSlice.actions.fetchWeatherStart());
  };

  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <Input
        id="weather-search-input"
        name='weather-search-input'
        ref={inputRef}
        type="text"
        value={search}
        placeholder="Search..."
        className="search-input"
        autoComplete="off"
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeydown}
        rightElement={
          <button type="submit" className="search-button">
            🔍
          </button>
        }
      />
      {showSuggestions && (
        <ul className="suggestion-box">
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              onMouseDown={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>


  );
}
export default SearchInput 