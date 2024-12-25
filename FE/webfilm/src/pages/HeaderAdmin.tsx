
import { Bell, User, Menu } from 'lucide-react';
import { Button } from '../components/astoms/button';
interface HeaderProps {
  toggleSidebar: () => void;
  title?: string;
}
export default function Header({ toggleSidebar, title = 'Admin Dashboard' }: HeaderProps){
  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <Button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="ml-4 text-xl font-semibold text-gray-800">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <Bell className="h-6 w-6" />
        </Button>
        <Button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <User className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
};



