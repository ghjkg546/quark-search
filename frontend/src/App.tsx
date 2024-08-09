
import './App.css';
import SearchPage from './SearchPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailPage from './DetailPage';
function App() {

  return (
    <>
    <BrowserRouter>
			<Routes>
				<Route path="/" element={<SearchPage />} />
				<Route path="/detail/:id" element={<DetailPage />} />
			</Routes>
		</BrowserRouter>

      
    </>
  );
}

export default App;
