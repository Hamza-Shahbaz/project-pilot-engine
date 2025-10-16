import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
