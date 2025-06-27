import React, { useRef, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, Camera } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable.jsx'
import UpdateProfileDialog from './UpdateProfileDialog.jsx'
import { useDispatch, useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { setUser, setLoading } from '@/redux/authSlice'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constants'

const Profile = () => {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false);
    const [showAvatarDialog, setShowAvatarDialog] = useState(false);
    const dispatch = useDispatch();
    const { user, loading } = useSelector(store => store.auth);
    const [file, setFile] = useState(null);
    const inputFileRef = useRef(null);

    const changeAvatarHandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        dispatch(setLoading(true));
        try {
            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update/avatar`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setShowAvatarDialog(false);
                setFile(null);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Upload failed");
        }
        finally{
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        {/* Avatar and Camera in a relative container */}
                        <div className="relative">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={user?.profile?.profilePhoto || "/altProfile.jpg"} alt="profile" />
                            </Avatar>
                            <button
                                className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow hover:bg-sky-100 border border-gray-200 transition"
                                onClick={() => setShowAvatarDialog(true)}
                                type="button"
                                title="Change profile photo"
                            >
                                <Camera className="w-5 h-5 text-sky-600" />
                            </button>
                        </div>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        user?.profile?.resumeOriginalName ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />

            {/* Avatar Upload Dialog */}
            {showAvatarDialog && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
                    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xs relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                            onClick={() => { setShowAvatarDialog(false); setFile(null); }}
                        >✕</button>
                        <h2 className="text-lg font-bold mb-4 text-center">Update Profile Picture</h2>
                        <form onSubmit={submitHandler} className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border">
                                {file ? (
                                    <img src={URL.createObjectURL(file)} alt="Preview" className="object-cover w-full h-full" />
                                ) : (
                                    <img src={user?.profile?.profilePhoto || "/altProfile.jpg"} alt="profile" className="object-cover w-full h-full" />
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                ref={inputFileRef}
                                className="hidden"
                                onChange={changeAvatarHandler}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => inputFileRef.current && inputFileRef.current.click()}
                            >
                                Choose from device
                            </Button>
                            <Button
                                type="submit"
                                className="w-full flex items-center justify-center"
                                disabled={!file || loading}
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                ) : (
                                    "Upload"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
