import { NavLink } from 'react-router-dom';
import { BarChart3, LayoutDashboard } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Dashboard System</h1>
          </div>
          
          <nav className="flex gap-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
            
            <NavLink
              to="/insights"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              <BarChart3 className="h-4 w-4" />
              Insights
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
