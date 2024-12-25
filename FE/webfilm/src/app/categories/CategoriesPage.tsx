import { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/astoms/table';
import { Search, Plus } from 'lucide-react';
import { Input } from '../../components/astoms/input';
import { Button } from '../../components/astoms/button';
import { createCategory, getAllCategories, updateCategory, deleteCategory } from '../../api/CategoryAPI.js';

type Category = {
  categoryId: number;
  categoryName: string;
  description: string;
};

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null); // State to store the category being edited

  // Add category modal handlers
  const handleAddInvoice = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null); // Clear editing category when closing modal
  };

  // Form submission to create new category
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget as HTMLFormElement;
    const categoryName = form.categoryName.value.trim();
    const description = form.description.value.trim();

    if (!categoryName || !description) {
      setError('All fields are required.');
      return;
    }

    try {
      const newCategory = await createCategory(categoryName, description);
      console.log('Create successfully', newCategory.data);
      alert('Category created successfully!');
      setShowModal(false);
      const updatedCategories = await getAllCategories(); // Refresh the categories list
      setCategories(updatedCategories);
    } catch (err) {
      console.error('Error creating category:', err);
      setError('Failed to create category. Please try again.');
    }
  }

  // Fetch categories on page load
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category) => category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle category update
  const handleUpdateCategory = (category: Category) => {
    setEditingCategory(category);
    setShowModal(true); 
  };


  const handleDeleteCategory = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      try {
        await deleteCategory(id);
        alert('Category deleted successfully');
        const updatedCategories = await getAllCategories();
        setCategories(updatedCategories);
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category');
      }
    }
  };

  async function handleUpdateSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (!editingCategory) return;

    const form = event.currentTarget as HTMLFormElement;
    const categoryName = form.categoryName.value.trim();
    const description = form.description.value.trim();

    if (!categoryName || !description) {
      setError('All fields are required.');
      return;
    }

    try {
      await updateCategory(editingCategory.categoryId, categoryName, description);
      alert('Category updated successfully');
      setShowModal(false);
      const updatedCategories = await getAllCategories();
      setCategories(updatedCategories);
    } catch (err) {
      console.error('Error updating category:', err);
      setError('Failed to update category. Please try again.');
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Search categories..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleAddInvoice}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      {/* Modal for Add and Edit Category */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
            <form onSubmit={editingCategory ? handleUpdateSubmit : onSubmit} className="space-y-4">
              <Input
                id="categoryName"
                type="text"
                placeholder="Category Name"
                className="w-full"
                defaultValue={editingCategory ? editingCategory.categoryName : ''}
                required
              />
              <Input
                id="description"
                type="text"
                placeholder="Description"
                className="w-full"
                defaultValue={editingCategory ? editingCategory.description : ''}
                required
              />
              <div className="flex justify-between">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingCategory ? 'Update' : 'Submit'}
                </Button>
                <Button type="button" onClick={handleCloseModal} className="bg-red-600 hover:bg-red-700">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Table>
        <TableCaption>A list of your recent movie categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">ID</TableHead>
            <TableHead className="font-bold">Tên</TableHead>
            <TableHead className="font-bold">Mô tả</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCategories.map((category) => (
            <TableRow key={category.categoryId}>
              <TableCell>{category.categoryId}</TableCell>
              <TableCell>{category.categoryName}</TableCell>
              <TableCell>
                {category.description.length > 50 ? category.description.substring(0, 90) + '...' : category.description}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button onClick={() => handleUpdateCategory(category)}>Edit</Button>
                <Button onClick={() => handleDeleteCategory(category.categoryId)}>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
