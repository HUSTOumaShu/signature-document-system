import { BiNotification, BiSearch } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import './index.css'
import Profile from "../Profile"

const Header = ({title}) => {
    return (
        <div className="content--header">
            <h1 className="header--title">{title}</h1>
            <div className="header--activity">
                <div className="search-box">
                    <input type="text" placeholder="Search..." />
                    <BiSearch id="search-icon" />
                </div>
                <div className="notify">
                    <BiNotification id="notify-icon" />
                </div>
                <Profile />
            </div>
        </div>
    )
}

export default Header