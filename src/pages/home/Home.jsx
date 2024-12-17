import styles from "./Home.module.css"
import PageList from "../../component/PageList"

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>비전 시스템 개발용 보조 기능 모음</h1>
      <PageList />
    </div>
  )
}

export default Home
