import Card from "../Card";
import DocumentList from "../DocumentList";
import Header from "../Header/Header";

import "./index.css";

const Content = () => {
    return (
        <div className="content">
            <Header title="Dashboard" />
            <Card />
            <DocumentList />
        </div>
    )
}

export default Content;