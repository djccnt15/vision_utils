import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './component/Layout'
import Home from './pages/home/Home'
import BinaryThreshold from './pages/binary_threshold/BinaryThreshold'

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/binary-threshold" element={<BinaryThreshold />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
