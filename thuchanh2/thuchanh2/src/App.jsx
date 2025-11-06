import "./App.css"
import Footer from './component/layout/footer.jsx'
import { Outlet } from 'react-router-dom'
import Header from './component/layout/header.jsx'
const App = () => {

  return (
    <>
<Header/>
<Outlet/>
<Footer/>
    </>
  )
};

export default App;
