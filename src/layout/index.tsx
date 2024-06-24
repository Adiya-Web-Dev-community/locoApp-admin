
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
interface Props{
    children?:React.ReactNode;
}
const Layout=({ children }: Props)=>{
 
    return(
        <div className='flex flex-row '>
            <Sidebar/>
            <div className='h-screen overflow-auto'>
            {children}
            </div>
            <Outlet/>
        </div>
    )
}
export default Layout;