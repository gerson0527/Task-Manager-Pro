import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import CategoryList from '../components/categories/CategoryList';
import CategoryForm from '../components/categories/CategoryForm';

const STORAGE_KEY = 'task-manager-categories';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Cargar categorías del localStorage al iniciar
  useEffect(() => {
    const storedCategories = localStorage.getItem(STORAGE_KEY);
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  // Función auxiliar para actualizar el localStorage
  const updateLocalStorage = (updatedCategories) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
  };

  const handleAddCategory = (newCategory) => {
    const updatedCategories = [
      ...categories, 
      { 
        ...newCategory, 
        id: Date.now().toString(),
        taskCount: 0 
      }
    ];
    updateLocalStorage(updatedCategories);
    setIsFormOpen(false);
  };

  const handleEditCategory = (updatedCategory) => {
    const updatedCategories = categories.map(cat => 
      cat.id === updatedCategory.id ? updatedCategory : cat
    );
    updateLocalStorage(updatedCategories);
    setIsFormOpen(false);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      const updatedCategories = categories.filter(cat => cat.id !== categoryId);
      updateLocalStorage(updatedCategories);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
        <button
          onClick={() => {
            setEditingCategory(null);
            setIsFormOpen(true);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Categoría</span>
        </button>
      </div>

      {/* Grid de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total Categorías</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{categories.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-700">Categorías Activas</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {categories.filter(cat => cat.taskCount > 0).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total Tareas</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {categories.reduce((acc, cat) => acc + (cat.taskCount || 0), 0)}
          </p>
        </div>
      </div>

      {/* Lista de categorías - Nota que ya no pasamos onCategoryAdd */}
      <div className="bg-white rounded-lg shadow-sm">
        <CategoryList
          categories={categories}
          onCategoryEdit={handleEditCategory}
          onCategoryDelete={handleDeleteCategory}
        />
      </div>

      {/* Modal de formulario */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <CategoryForm
              category={editingCategory}
              onSubmit={editingCategory ? handleEditCategory : handleAddCategory}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingCategory(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;