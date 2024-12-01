import { Outlet } from "react-router-dom"
import Feed from "./Feed"
import RightsSidebar from "./RightsSidebar"
import useGetAllPost from "@/hooks/useGetAllPost"
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUser"

const Home = () => {
    useGetAllPost()
    useGetSuggestedUsers()
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