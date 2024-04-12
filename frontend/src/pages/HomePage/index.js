import Content from "../../components/Content"
import SideBar from "../../components/Sidebar"
import './index.css'

const HomePage = () => {
    return (
        <div className="dashboard">
            <SideBar />
            <div className="dashboard-content">
                <Content />
            </div>
        </div>
    )
}

export default HomePage