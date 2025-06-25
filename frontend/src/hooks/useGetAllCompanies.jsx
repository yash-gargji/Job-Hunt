import { setCompanies, setLoading } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const {loading} = useSelector(store => store.company);
    useEffect(()=>{
        const fetchCompanies = async () => {
             dispatch(setLoading(true))
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
            finally{
                 dispatch(setLoading(false))
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies