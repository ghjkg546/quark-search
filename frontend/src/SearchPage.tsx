import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import SearchResult from './interfaces/SearchResult';
import { message, Pagination } from 'antd';


const SearchPage: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
   
    const [total, setTotal] = useState<number>(0);
    const pageSize:number = 10
    
    useEffect(() => {
        handleSearch(); 
    }, [currentPage]); 
    const onChange = async (page:number) => {
        setCurrentPage(page)
      };
    const doSearch = async () => {
        if(query == ''  ){
            message.info('请输入关键词')
            return
        }
        handleSearch()
    };
    const handleSearch = async () => {
        if(query == ''  ){
            
            return
        }
        
        let baseUrl= 'http://'+import.meta.env.VITE_BASE_URL
        try {
            // Simulated fetch for demonstration (replace with actual API call)
            const response = await fetch(`${baseUrl}/api/data?page=${currentPage}&keyword=${query}&page_size=${pageSize}`);
            const res = await response.json();
            const data = res.data
            setTotal(res.total)
            setResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div>
            <h3>夸克资源搜索</h3>
           
            <SearchBar query={query} setQuery={setQuery} onSearch={doSearch} />
            <SearchResults results={results} />
           {total>0 && <Pagination current={currentPage} defaultCurrent={1} total={total}  onChange={onChange}/>}
           
        </div>
    );
};

export default SearchPage;
