import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  // BrowserRouter as Router,
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';


function App() {
  const [progress,setProgress]=useState(30)
  let pageSize=6
  const apiKey= process.env.REACT_APP_NEWS_API_KEY
  return (
    <HashRouter basename='/'>
      <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      
    </div>
    <Navbar/>
    <div className="container my-3">
      <Routes>
        {/* <Route exact path=''/> */}
                            <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} pageSize= {pageSize}  key="general"/>} />
                            <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} pageSize= {pageSize} category={"entertainment"} key="entertainment"/>} />
                            <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey} pageSize= {pageSize} category={"business"} key="business"/>} />
                            <Route exact path='/general' element={<News setProgress={setProgress} apiKey={apiKey} pageSize= {pageSize} category={"general"} key="general"/>} />
                            <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} pageSize= {pageSize} category={"health"} key="health"/>} />
                            <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} pageSize= {pageSize} category={"science"} key="science"/>} />
                            <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} pageSize= {pageSize} category={"technology"} key="techhnology"/>} />
                            <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} pageSize= {pageSize} category={"sports"} key="sports"/>} />
      </Routes>
    </div>
    {/* <News setProgress={setProgress} apiKey={apiKey} pageSize= {pageSize} category={"science"}/> */}
    </HashRouter>

  );
}

export default App;


