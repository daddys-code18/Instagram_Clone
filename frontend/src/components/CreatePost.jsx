import { Dialog } from '@radix-ui/react-dialog'
import React, { useRef, useState } from 'react'
import { DialogContent, DialogHeader } from './ui/dialog'
import { AvatarFallback, AvatarImage, Avatar } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { readFileAsDataURl } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'

const CreatePost = ({ open, setOpen }) => {
    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);

    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const dataUrl = await readFileAsDataURl(file);
            setImagePreview(dataUrl);
        }
    }

    const createPostHandler = async (e) => {
        const formData = new FormData();
        formData.append("caption", caption)
        if (imagePreview) formData.append('image', file);
        try {

            setLoading(true);
            const res = await axios.post('http://localhost:4000/api/v1/post/addpost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                setCaption("")
                setImagePreview("")
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="text-center font-semibold">Create New Post</DialogHeader>
                <div className="flex gap-3 items-center">
                    <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="">
                        <h1 className="font-semibold text-xs">Username</h1>
                        <span className="text-gray-600 text-xs">BIo here..</span>

                    </div>
                </div>
                <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" placeholder="Write a caption..." />
                {
                    imagePreview && (
                        <div className='w-full h-64 flex items-center justify-center'>
                            <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
                        </div>
                    )
                }
                <input onChange={fileChangeHandler} type="file" className='hidden' ref={imageRef} />
                <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] '>Select from computer</Button>
                {
                    imagePreview && (
                        loading ? (
                            <Button>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button onClick={createPostHandler} type="submit" className="w-full">Post</Button>
                        )
                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default CreatePost