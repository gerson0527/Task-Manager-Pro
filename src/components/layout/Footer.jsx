// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Task Manager Pro. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
export default Footer;