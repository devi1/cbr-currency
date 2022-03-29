import {Routes, Route} from 'react-router-dom';
import Main from './Main';
import Data from './Data';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/:CharCode' element={<Data/>}/>
      

    </Routes>
  );
}

export default App;