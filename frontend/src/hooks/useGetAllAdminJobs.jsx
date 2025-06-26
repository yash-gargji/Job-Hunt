import { setAllAdminJobs, setLoading } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    const {loading} =  useSelector(store => store.auth);
    useEffect(()=>{
        dispatch(setLoading(true));
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs