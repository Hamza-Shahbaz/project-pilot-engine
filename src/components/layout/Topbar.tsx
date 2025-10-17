import { NavLink } from 'react-router-dom';
import { BarChart3, LayoutDashboard } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="bg-card border-b-2 border-border sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Dashboard System</h1>
              <p className="text-xs text-muted-foreground">Real-time monitoring</p>
            </div>
          </div>
          
          <nav className="flex gap-3">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent border-2 border-transparent hover:border-primary/20'
                }`
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
            
            <NavLink
              to="/insights"
              className={({ isActive }) =>
                `flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent border-2 border-transparent hover:border-primary/20'
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
