import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import headerCategories from '../../../../assets/headerCategories.svg'
import axiosClient from '../../../../api/modules/axiosClient'
import NoData from '../../../Shared/components/NoData/NoData'
import { toast } from 'react-toastify'
import DeleteConfirmation from '../../../Shared/components/DeleteConfimation/DeleteConfirmation'
import { useNavigate } from 'react-router-dom'

const COLS = 7; 

export default function RecipesList() {

  const [isLoading, setIsLoading] = useState(true);
  const [recipesList, setRecipesList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const navigate = useNavigate();

  const getList = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get('/Recipe/', {
        params: { pageNumber: 1, pageSize: 10 }
      });
      setRecipesList(response.data.data || []);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Failed to load recipes');
      console.log(error);
    }
  }

  const deleteRecipe = async () => {
    try {
      setIsLoading(true);
      await axiosClient.delete(`/Recipe/${selectedRecipeId}`);
      setRecipesList(prev => prev.filter(item => item.id !== selectedRecipeId));
      toast.success('Recipe deleted successfully!');
      setShowDeleteModal(false);
      setSelectedRecipeId(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Failed to delete recipe');
    }
  }

  useEffect(() => {
    getList();
  }, [])

  return (
    <>

      <Header
        title="Recipes"
        titleSpan="item"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgUrl={headerCategories}
      />

      <DeleteConfirmation
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteRecipe}
      />

      <div className='d-flex flex-wrap justify-content-between align-items-center px-4 my-3 gap-2'>
        <div>
          <h4 className='title-categories-list'>Recipes Table Details</h4>
          <span className='sub-title-categories-list'>You can check all details</span>
        </div>
        <button onClick={()=>navigate('/recipes-data')} className='btn btn-success px-3 py-2 fw-bold rounded-2'>
          Add New Recipe
        </button>
      </div>

      <div className="table-responsive px-2">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Tag</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={COLS} className="text-center py-5">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : recipesList.length > 0 ? (
              recipesList.map((recipe) => (
                <tr key={recipe.id}>

                  <td className="fw-semibold">{recipe.name ?? '—'}</td>

                  <td>
                    {recipe.imagePath
                      ? <img
                          src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                          alt={recipe.name}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      : <span className="text-muted small">No image</span>
                    }
                  </td>

                  <td>{recipe.price ?? '—'}</td>

                  <td style={{ maxWidth: '180px' }}>
                    <span
                      className="d-inline-block text-truncate"
                      style={{ maxWidth: '180px' }}
                      title={recipe.description}
                    >
                      {recipe.description ?? '—'}
                    </span>
                  </td>

                  <td>{recipe.tag?.name ?? recipe.tagId ?? '—'}</td>

                  <td>{recipe.category?.name ?? '—'}</td>

                  <td>
                    <div className="dropdown position-relative">
                      <i
                        className="fa-solid fa-ellipsis icon-color"
                        role="button"
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
                          <button className="dropdown-item d-flex align-items-center gap-3 py-2">
                            <i className="fa-regular fa-pen-to-square text-success fs-5"></i>
                            <span className="fw-semibold" style={{ color: 'rgba(31, 38, 62, 1)' }}>Edit</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => { setSelectedRecipeId(recipe.id); setShowDeleteModal(true); }}
                            className="dropdown-item d-flex align-items-center gap-3 py-2"
                          >
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
                <td colSpan={COLS} className="text-center">
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
