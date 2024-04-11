import Content from "../../components/Content"
import Profile from "../../components/Profile"
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