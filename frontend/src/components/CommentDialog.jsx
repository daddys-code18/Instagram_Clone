import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

const CommentDialog = ({ open, setOpen }) => {
    const [text, setText] = useState("")

    const changeEventHandler = (e) => {
        const InputText = e.target.value
        if (InputText.trim()) {
            setText(InputText)
        } else {
            setText("")
        }
    }
    const sendMessageHandler = () => {

    }
    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-5xl p-0 flex flex-col">
                <div className="flex flex-1">
                    <div className="w-1/2">
                        <img className='w-full h-full object-cover rounded-l-lg' src="https://images.unsplash.com/photo-1719937050814-72892488f741?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                    <div className="w-1/2 flex flex-col justify-between">
                        <div className="flex items-center justify-between p-4">
                            <div className="flex gap-3 item-center">
                                <Link>
                                    <Avatar>
                                        <AvatarImage />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div className="">
                                    <Link className='font-semibold text-xs'>username</Link>

                                </div>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className='cursor-pointer' />
                                </DialogTrigger>
                                <DialogContent className="flex flex-col items-center text-sm text-center">
                                    <div className='cursor-pointer w-full text-[#ED4956] font-bold'>
                                        Unfollow
                                    </div>
                                    <div className='cursor-pointer w-full'>
                                        Add to favorites
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <hr />

                        <div className="flex-1 overflow-y-auto max-h-96 p-4  ">
                            comment here

                        </div>
                        <div className="p-4">
                            <div className="flex items-center gap-2">
                                <input type="text" placeholder='Add a comment' value={text} onChange={changeEventHandler} className='w-full outline-none border border-gray-300  text-
                                sm p-2 rounded' />
                                <Button variant="outline" disabled={!text.trim()} onClick={sendMessageHandler}>Send</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog