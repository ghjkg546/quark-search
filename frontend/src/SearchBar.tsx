import React, { ChangeEvent, KeyboardEvent } from 'react';
import styles from './SearchBar.module.css'; // Import CSS module
interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={styles.searchBar}>
            <div className="input-container">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="请输入搜索内容"
                className={styles.input}
            />
            </div>
            
            <button onClick={onSearch} className={styles.button}>
                搜索
            </button>
        </div>
  );
};

export default SearchBar;
