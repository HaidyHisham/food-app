import React, { useEffect, useState, useContext } from 'react'
import Header from '../../../Shared/components/Header/Header'
import headerCategories from '../../../../assets/headerCategories.svg'
import axiosClient from '../../../../api/modules/axiosClient'
import NoData from '../../../Shared/components/NoData/NoData'
import { toast } from 'react-toastify'
import DeleteConfirmation from '../../../Shared/components/DeleteConfimation/DeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import {addFav} from '../../../../api/modules/userRecipe'
const COLS = 7; 

export default function RecipesList() {

  const [isLoading, setIsLoading] = useState(true);
  const [recipesList, setRecipesList] = useState([]);
  const [favList, setFavList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const navigate = useNavigate();
  const { loginData } = useContext(AuthContext);

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
  const handleShowViewModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowViewModal(true);
  };

  const getFavorites = async () => {
    try {
      const response = await axiosClient.get('/UserRecipe/');
      setFavList(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  const addFav = async (id) => {
    try {
      await axiosClient.post("/UserRecipe/", { "recipeId": id });
      toast.success('Recipe added to favorites successfully!');
      getFavorites(); 
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to add to favorites');
    }
  }

  useEffect(() => {
    getList();
    if (loginData?.userGroup === 'SystemUser') {
      getFavorites();
    }
  }, [loginData])

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
        {loginData?.userGroup == 'SuperAdmin' &&(
        <button onClick={()=>navigate('/recipe/new-recipe')} className='btn btn-success px-3 py-2 fw-bold rounded-2'>
          Add New Recipe
        </button>
        )}
      </div>
      <div className="table-responsive px-4 pb-4">
        <table className="table table-borderless align-middle" style={{ borderCollapse: 'separate', borderSpacing: '0' }}>
          <thead>
            <tr >
              <th scope="col"  >Name</th>
              <th scope="col" >Image</th>
              <th scope="col" >Price</th>
              <th scope="col" >Description</th>
              <th scope="col" >Discount</th>
              <th scope="col" >Category</th>
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
              recipesList.map((recipe, index) => (
                <tr key={recipe.id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fb' }}>
                  <td className="ps-4 ">{recipe.name ?? ' '}</td>
                  <td className="">
                    {recipe.imagePath
                      ? <img
                          src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                          alt={recipe.name}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      : <div style={{ width: '48px', height: '48px', backgroundColor: '#e9ecef', borderRadius: '8px' }} className="d-flex justify-content-center align-items-center">
                        <span className="text-muted" style={{fontSize: '14px'}}>No Img</span></div>
                    }
                  </td>

                  <td className="">{recipe.price ?? ' '}</td>

                  <td className="" style={{ maxWidth: '180px' }}>
                    <span
                      className="d-inline-block text-truncate"
                      style={{ maxWidth: '180px' }}
                      title={recipe.description}
                    >
                      {recipe.description ?? ' '}
                    </span>
                  </td>

                  <td className="">{recipe.tag?.name ?? recipe.tagId ?? ' '}</td>

                  <td className="">{recipe.category?.name ?? ' '}</td>

                  <td className=" pe-4 text-end">
                    <div className="dropdown position-relative">
                      <i
                        className="fa-solid fa-ellipsis fs-5 text-dark"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ cursor: 'pointer' }}
                      ></i>
                      <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2" style={{ borderRadius: '12px', minWidth: '120px' }}>
                        {loginData?.userGroup === 'SystemUser' ?(
                          <> 
                        <li>
                          <button onClick={() => handleShowViewModal(recipe)} className="dropdown-item d-flex align-items-center gap-3 py-2 rounded-2">
                            <i className="fa-regular fa-eye text-success fs-6"></i>
                            <span className="fw-semibold text-dark">View</span>
                          </button>
                        </li>
                        {!favList.some(fav => fav.recipe.id === recipe.id) && (
                          <li>
                            <button className="dropdown-item d-flex align-items-center gap-3 py-2 rounded-2" onClick={() => addFav(recipe.id)}>
                              <i className="fa-regular fa-heart text-success fs-6"></i>
                              <span className="fw-semibold text-dark">Add to Fav</span>
                            </button>
                          </li>
                        )}
                        </>
                        ) : (
                          <>
                        <li>
                          <button className="dropdown-item d-flex align-items-center gap-3 py-2 rounded-2" onClick={() => navigate(`/recipe/${recipe.id}`)}>
                            <i className="fa-regular fa-pen-to-square text-success fs-6"></i>
                            <span className="fw-semibold text-dark">Edit</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => { setSelectedRecipeId(recipe.id); setShowDeleteModal(true); }}
                            className="dropdown-item d-flex align-items-center gap-3 py-2 rounded-2"
                          >
                            <i className="fa-regular fa-trash-can text-success fs-6"></i>
                            <span className="fw-semibold text-dark">Delete</span>
                          </button>
                        </li>
                        </>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={COLS} className="text-center py-5">
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Recipe Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedRecipe && (
            <div className="row g-4">
              <div className="col-md-5">
                {selectedRecipe.imagePath ? (
                  <img
                    src={`https://upskilling-egypt.com:3006/${selectedRecipe.imagePath}`}
                    alt={selectedRecipe.name}
                    className="img-fluid rounded-3 shadow-sm w-100"
                    style={{ objectFit: 'cover', minHeight: '250px' }}
                  />
                ) : (
                  <div className="bg-light rounded-3 d-flex align-items-center justify-content-center" style={{ height: '250px' }}>
                    <span className="text-muted">No Image Available</span>
                  </div>
                )}
              </div>
              <div className="col-md-7">
                <div className="mb-4">
                  <h3 className="text-success fw-bold mb-1">{selectedRecipe.name}</h3>
                  <p className="text-muted small">Category: <span className="text-dark fw-medium">{selectedRecipe.category?.[0]?.name || selectedRecipe.category?.name || 'N/A'}</span></p>
                </div>
                
                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <label className="text-muted d-block small mb-1">Price</label>
                    <span className="fw-semibold">{selectedRecipe.price} EGP</span>
                  </div>
                  <div className="col-6">
                    <label className="text-muted d-block small mb-1">Tag</label>
                    <span className="badge bg-success-subtle text-success px-3 py-2">{selectedRecipe.tag?.name || 'N/A'}</span>
                  </div>
                </div>

                <div className="mb-0">
                  <label className="text-muted d-block small mb-2">Description</label>
                  <p className="text-dark lh-base" style={{ textAlign: 'justify' }}>
                    {selectedRecipe.description || 'No description provided.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          {loginData?.userGroup === 'SystemUser' && selectedRecipe && !favList.some(fav => fav.recipe.id === selectedRecipe.id) && (
            <button 
              className="btn btn-outline-success px-4 py-2 fw-bold d-flex align-items-center gap-2" 
              onClick={() => { addFav(selectedRecipe.id); setShowViewModal(false); }}
            >
              <i className="fa-regular fa-heart"></i>
              Add to Favorites
            </button>
          )}
          <button className="btn btn-success px-4 py-2 fw-bold" onClick={() => setShowViewModal(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
