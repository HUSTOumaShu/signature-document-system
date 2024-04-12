import './index.css'
import Header from '../../components/Header/Header'
import UserList from '../../components/UserList'
import SideBar from "../../components/Sidebar"

const UserPage = () => {
    return (
        <div className='user-page'>
            <SideBar />
            <div className="user-content">
                <Header title="User List" />
                <UserList />
            </div>
        </div>
    );
}

export default UserPage;