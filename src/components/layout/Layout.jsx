// src/components/layout/Layout.jsx
import Header from './Header';
import Sidebar from './Sidebar';

// src/components/layout/Layout.jsx
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-64">
        <Header />
        <main className="flex-1 overflow-auto p-6 mt-16 pb-24"> {/* Aumentado el padding bottom a pb-24 */}
          {children}
        </main>
      </div>
    </div>
  );
};
export default Layout;