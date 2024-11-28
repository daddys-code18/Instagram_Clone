import { Outlet } from "react-router-dom"
import Feed from "./Feed"
import RightsSidebar from "./RightsSidebar"

const Home = () => {
    return (
        <div className="flex">
            <div className="flex-grow">
                <Feed />
                <Outlet />
            </div>
            <RightsSidebar />
        </div>
    )
}

export default Home