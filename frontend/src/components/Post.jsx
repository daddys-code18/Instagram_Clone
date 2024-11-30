import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts, setSelectedPost } from '@/redux/postSlice'

const Post = ({ post }) => {
    const [text, setText] = useState("")
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)
    const { posts } = useSelector(store => store.post);
    const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
    const [postlike, setPostLike] = useState(post.likes.length);
    const [comment, setComment] = useState(post.comments);

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        const InputText = e.target.value
        if (InputText.trim()) {
            setText(InputText)
        } else {
            setText("")
        }
    }

    const likeOrDislikeHandler = async () => {
        try {

            const action = liked ? "dislike" : "like";
            const res = await axios.get(`http://localhost:4000/api/v1/post/${post._id}/${action}`, { withCredentials: true })
            console.log(res.data)
            if (res.data.success) {
                const updateLikes = liked ? postlike - 1 : postlike + 1
                setPostLike(updateLikes);
                setLiked(!liked);

                //apne post ko update krunga

                const updatePostData = posts.map(p => p._id === post._id ? {
                    ...p, likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                } : p)
                dispatch(setPosts(updatePostData));
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error)
        }
    }
    const commentHandler = async () => {

        try {
            const res = await axios.post(`http://localhost:4000/api/v1/post/${post._id}/comment`, { text }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(res.data);
            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);

                const updatedPostData = posts.map(p =>
                    p._id === post._id ? { ...p, comments: updatedCommentData } : p
                );

                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                setText("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deletePostHandler = async () => {
        try {
            const res = await axios.delete(`http://localhost:4000/api/v1/post/delete/${post?._id}`, { withCredentials: true })
            if (res.data.success) {
                const updatePostData = posts.filter((postItem) => postItem?._id !== post?._id)
                dispatch(setPosts(updatePostData));
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.messsage);
        }
    }
    return (
        <div className="my-8 w-full max-w-sm mx-auto">
            <div className="flex item-center justify-between">
                <div className="flex item-center gap-2">
                    <Avatar>
                        <AvatarImage src={post.author?.profilePicture} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1>{post.author?.username}</h1>
                </div>
                <Dialog>
                    <DialogTrigger asChild  >
                        <MoreHorizontal className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center text-sm text-center">
                        {
                            post?.author?._id !== user?._id && <Button variant='ghost' className="cursor-pointer w-fit text-[#ED4956] font-bold">Unfollow</Button>
                        }
                        <Button variant="ghost" className="cursor-pointer w-fit">Add to favorites</Button>
                        {
                            user && user?._id === post?.author._id && <Button onClick={deletePostHandler} variant="ghost" className="cursor-pointer w-fit"> Delete</Button>

                        }
                    </DialogContent>
                </Dialog>
            </div>
            <img className='rounded-sm my-2 w-full aspect-square object-cover' src={post.image} alt="post_img" />
            <div className="flex items-center justify-between my-2">
                <div className="flex item-center gap-3">
                    {
                        liked ? <FaHeart onClick={likeOrDislikeHandler} size={'24'} className='cursor-pointer text-red-600' /> : <FaRegHeart onClick={likeOrDislikeHandler} size={'22px'} className='cursor-pointer hover:text-gray-600' />
                    }
                    <MessageCircle onClick={() => { dispatch(setSelectedPost(post)); setOpen(true) }} className='cursor-pointer hover:text-gray-600' />
                    <Send className='cursor-pointer hover:text-gray-600' />
                </div>
                <Bookmark className='cursor-pointer hover:text-gray-600' />
            </div>
            <span className="font-medium block mb-2">{postlike} likes</span>
            <p>
                <span className='font-medium mr-2'>{post.author?.username}</span>
                {post.caption}
            </p>
            {
                comment.length > 0 && (
                    <span onClick={() => {
                        dispatch(setSelectedPost(post));
                        setOpen(true);
                    }} className='cursor-pointer text-sm text-gray-400'>View all {comment.length} comments</span>
                )
            }
            <CommentDialog open={open} setOpen={setOpen} />
            <div className="flex items-center justify-between">
                <input type="text"
                    value={text}
                    onChange={changeEventHandler}
                    placeholder='Add a comment'
                    className=' outline-none text-sm w-full' />
                {
                    text &&
                    <span onClick={commentHandler} className='text-[#38ADF8] cursor-pointer'>Post</span>

                }
            </div>
        </div>
    )
}

export default Post