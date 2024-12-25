import { Outlet } from 'react-router-dom';
import Sidebar  from './SideBarAdmin';
import Header from './HeaderAdmin';  
export default function AdminLayout(){
  const toggleSidebar = () => {
    console.log('Sidebar toggled');
  };
  return (
    <div className="flex h-screen bg-background">
      <Sidebar/>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};



