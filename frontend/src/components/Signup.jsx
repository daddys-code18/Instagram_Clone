import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"

const Signup = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:4000/api/v1/user/register', input, {
                headers: {
                    "Content-Type": "application/json"

                },
                withCredentials: true
            });
            if (response.data.success) {
                toast.success(response.data.message)
                setInput({
                    username: "",
                    email: "",
                    password: ""
                });
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

        } finally {
            setLoading(false)
        }
    }
    // useEffect(() => {
    //     if (user) {
    //         navigate("/");
    //     }
    // }, []);
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <form action="" onSubmit={signupHandler} className="shadow-lg flex flex-col gap-5 p-8">
                <div className="my-4">
                    <h1 className="text-center font-bold text-xl">
                        LOGO
                    </h1>
                    <p className="text-sm text-center">Signup to see photo & videos from your friends</p>
                </div>
                <div className="">
                    <Label htmlFor="email">Your Username</Label>
                    <Input type="text" name="username"
                        value={input.username}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2" />

                </div>
                <div className="">
                    <Label htmlFor="email">Your Email address</Label>
                    <Input
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2" />

                </div>
                <div className="">
                    <Label htmlFor="email">Your Password</Label>
                    <Input
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2" />

                </div>
                {loading ?
                    (<Button>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait </Button>
                    ) : (<Button type='submit'>Signup</Button>)}
                <span className='text-center'>Already have an account?
                    <Link to="/login" className='text-blue-600'>Login</Link>
                </span>
            </form>
        </div >
    )
}

export default Signup