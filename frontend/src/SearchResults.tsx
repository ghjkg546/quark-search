// src/SearchResults.tsx
import React from 'react';
import styles from './SearchResults.module.css'; // Import CSS module
import SearchResult from './interfaces/SearchResult';
import { useNavigate  } from 'react-router-dom';
import { Convert } from './utils/Convert';

interface SearchResultsProps {
  results: SearchResult[];
}




const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  
const navigate = useNavigate ();
const goToDetailPage = (id: number) => {
  navigate("detail/"+id);
  
};

  return (
    <div className={styles.searchResults}>
            {results.length>0 && <h2>搜索结果:</h2>}

            <ul className={styles.resultList}>
                {results.map((item) => (
                    <li key={item.id} className={styles.resultItem} onClick={() => goToDetailPage(item.id)}>
                        <strong>{item.title}</strong>
                        <p>创建时间:{Convert.formatTimestamp(item.create_time) }</p>
                    </li>
                ))}
            </ul>
        </div>
  );
};

export default SearchResults;
