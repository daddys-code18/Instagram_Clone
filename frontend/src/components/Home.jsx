import { Outlet } from "react-router-dom"
import Feed from "./Feed"
import RightsSidebar from "./RightsSidebar"
import useGetAllPost from "@/hooks/useGetAllPost"

const Home = () => {
    useGetAllPost()
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