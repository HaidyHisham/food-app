import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import headerCategories from '../../../../assets/headerCategories.svg'
import axiosClient from '../../../../api/modules/axiosClient';
import NoData from '../../../Shared/components/NoData/NoData';
import { toast } from 'react-toastify';
import DeleteConfirmation from '../../../Shared/components/DeleteConfimation/DeleteConfirmation';
import CategoryData from '../CategoryData/CategoryData';

export default function CategoriesList() {
  const [categoriesList, setcategoriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // null = Add, object = Edit

  const getList = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get('/Category');
      setcategoriesList(response.data.data || []);
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  const deleteCategory = async () => {
    try {
      setIsLoading(true);
       await axiosClient.delete(`/Category/${selectedCategoryId}`)
      setcategoriesList(categoriesList.filter(item => item.id !== selectedCategoryId));
      toast.success('Category deleted successfully!');
      setShowDeleteModal(false);
      setSelectedCategoryId(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Failed to delete category');
    }
  }

  const saveCategory = async (data) => {
    try {
      if (selectedCategory) {
        // Edit mode
        await axiosClient.put(`/Category/${selectedCategory.id}`, data);
        toast.success('Category updated successfully!');
      } else {
        // Add mode
        await axiosClient.post('/Category', data);
        toast.success('Category added successfully!');
      }
      setShowCategoryModal(false);
      setSelectedCategory(null);
      getList();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  }
  
  useEffect(() => {
    getList();
  }, [])



  return (
    <>
      <Header title="Categories" titleSpan="item" description="You can now add your items that any user can order it from the Application and you can edit" imgUrl={headerCategories} />
      
      <DeleteConfirmation
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteCategory}
      />
      <CategoryData
        show={showCategoryModal}
        onClose={() => { setShowCategoryModal(false); setSelectedCategory(null); }}
        onSubmit={saveCategory}
        title={selectedCategory ? 'Edit Category' : 'Add Category'}
        categoryData={selectedCategory}
      />
      <div className='d-flex justify-content-between align-items-center px-4'>
        <div>
          <h4 className='title-categories-list'>Categories Table Details</h4>
          <span className='sub-title-categories-list'>You can check all details</span>
        </div>
        <button
          className='btn btn-success px-3 py-2 fw-bold rounded-2'
          onClick={() => { setSelectedCategory(null); setShowCategoryModal(true); }}
        >
          Add New Category
        </button>
      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Created Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>

            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center py-5">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : categoriesList.length > 0 ? (
              categoriesList.map((category, index) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>
                  <td>
                    <div className="dropdown position-relative">
                      
                      <i
                        className="fa-solid fa-ellipsis icon-color"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ cursor: 'pointer', padding: '5px' }}
                      ></i>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-arrow shadow border-0 mt-2 rounded-4 p-2">
                        <li>
                          <button className="dropdown-item d-flex align-items-center gap-3 py-2">
                            <i className="fa-regular fa-eye text-success fs-5"></i>
                            <span className="fw-semibold" style={{ color: 'rgba(31, 38, 62, 1)' }}>View</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => { setSelectedCategory(category); setShowCategoryModal(true); }}
                            className="dropdown-item d-flex align-items-center gap-3 py-2"
                          >
                            <i className="fa-regular fa-pen-to-square text-success fs-5"></i>
                            <span className="fw-semibold" style={{ color: 'rgba(31, 38, 62, 1)' }}>Edit</span>
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { setSelectedCategoryId(category.id); setShowDeleteModal(true); }} className="dropdown-item d-flex align-items-center gap-3 py-2">
                            <i className="fa-regular fa-trash-can text-success fs-5"></i>
                            <span className="fw-semibold" style={{ color: 'rgba(31, 38, 62, 1)' }}>Delete</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
