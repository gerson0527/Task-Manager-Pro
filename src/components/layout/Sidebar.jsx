// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ListTodo, Calendar, Tag } from 'lucide-react';
import PATHS from '../../routes/paths';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Inicio', path: PATHS.HOME },
    { icon: ListTodo, label: 'Tareas', path: PATHS.TASKS },
    { icon: Calendar, label: 'Calendario', path: PATHS.CALENDAR },
    { icon: Tag, label: 'Categorías', path: PATHS.CATEGORIES }
  ];

  return (
    <aside className="fixed left-0 w-64 h-full bg-white shadow-sm">
      <div className="flex flex-col h-full pt-16">
        <nav className="flex-1 px-3 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center px-4 py-2 mb-1 rounded-lg ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;