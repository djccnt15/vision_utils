import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './component/Layout'
import Home from './pages/home/Home'
import BinaryThreshold from './pages/binary_threshold/BinaryThreshold'
import GetCoordinate from './pages/get_coordinate/GetCoordinate'

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/binary-threshold" element={<BinaryThreshold />} />
          <Route path="/get-coordinate" element={<GetCoordinate />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
