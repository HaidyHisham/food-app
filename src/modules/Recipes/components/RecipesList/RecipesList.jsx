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
import Filters from '../../../Shared/components/Filters/Filters'
import CustomPagination from '../../../Shared/components/CustomPagination/CustomPagination'
import Loading from '../../../Shared/components/Loading/Loading'
const COLS = 7; 

export default function RecipesList() {

  const [isLoading, setIsLoading] = useState(true);
  const [recipesList, setRecipesList] = useState([]);
  const [favList, setFavList] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  

  const [name, setName] = useState('');
  const [tagId, setTagId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const navigate = useNavigate();
  const { loginData } = useContext(AuthContext);

  const getList = async (page = 1, searchName = name, tag = tagId, cat = categoryId) => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get('/Recipe/', {
        params: { 
          pageNumber: page, 
          pageSize: 10,
          name: searchName,
          tagId: tag,
          categoryId: cat
        }
      });
      setRecipesList(response.data.data || []);
      setTotalPages(response.data.totalNumberOfPages || 1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Failed to load recipes');
      console.log(error);
    }
  }

  const getTags = async () => {
    try {
      const response = await axiosClient.get('/Tag/');
      setTags(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getCategories = async () => {
    try {
      const response = await axiosClient.get('/Category/');
      setCategories(response.data.data || []);
    } catch (error) {
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
    getList(currentPage, name, tagId, categoryId);
  }, [currentPage, name, tagId, categoryId])

  useEffect(() => {
    getTags();
    getCategories();
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

      <Filters 
        onSearchChange={(val) => { setName(val); setCurrentPage(1); }}
        onTagChange={(val) => { setTagId(val); setCurrentPage(1); }}
        onCategoryChange={(val) => { setCategoryId(val); setCurrentPage(1); }}
        tags={tags}
        categories={categories}
      />
      <div className="table-responsive px-4 pb-4">
        <table className="table table-borderless align-middle" style={{ borderCollapse: 'separate', borderSpacing: '0' }}>
          <thead>
            <tr className='text-center'>
              <th scope="col" style={{ minWidth: '150px' }}>Name</th>
              <th scope="col" style={{ minWidth: '80px' }}>Image</th>
              <th scope="col" style={{ minWidth: '80px' }}>Price</th>
              <th scope="col" style={{ minWidth: '200px' }}>Description</th>
              <th scope="col" style={{ minWidth: '100px' }}>Tag</th>
              <th scope="col" style={{ minWidth: '120px' }}>Category</th>
              <th scope="col" style={{ minWidth: '100px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={COLS} className="text-center">
                  <Loading />
                </td>
              </tr>
            ) : recipesList.length > 0 ? (
              recipesList.map((recipe, index) => (
                <tr key={recipe.id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fb' }}>
                  <td className=" text-center">{recipe.name ?? ' '}</td>
                  <td className="text-center">
                    {recipe.imagePath
                      ? <img
                          src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                          alt={recipe.name}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/48?text=R';
                          }}
                        />
                      : <div style={{ width: '48px', height: '48px', backgroundColor: '#e9ecef', borderRadius: '8px' }} className="d-flex justify-content-center align-items-center">
                        <span className="text-muted" style={{fontSize: '14px'}}>No Img</span></div>
                    }
                  </td>

                  <td className="text-center">{recipe.price ?? ' '}</td>

                  <td className="text-center" style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {recipe.description ?? ' '}
                  </td>

                  <td className="text-center">{recipe.tag?.name ?? recipe.tagId ?? ' '}</td>

                  <td className="text-center">{recipe.category?.[0]?.name || recipe.category?.name || 'N/A'}</td>

                  <td className="text-center">
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

      <CustomPagination 
        totalNumberOfPages={totalPages} 
        currentPage={currentPage} 
        onPageChange={(page) => setCurrentPage(page)} 
      />

      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered size="md" className="recipe-view-modal shadow-lg">
        <Modal.Body className="p-0 overflow-hidden rounded-4 border-0">
          {selectedRecipe && (
            <div className="recipe-card-modern">
            
              <div className="position-relative overflow-hidden">
                {selectedRecipe.imagePath ? (
                  <img
                    src={`https://upskilling-egypt.com:3006/${selectedRecipe.imagePath}`}
                    alt={selectedRecipe.name}
                    className="w-100 transition-scale"
                    style={{ height: '220px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/600x400?text=Food';
                    }}
                  />
                ) : (
                  <div className="bg-success-subtle d-flex align-items-center justify-content-center" style={{ height: '220px' }}>
                    <i className="fa-solid fa-utensils text-success opacity-25" style={{ fontSize: '60px' }}></i>
                  </div>
                )}
                
               
                <div className="position-absolute top-0 start-0 m-3">
                  <span className="badge glass-badge px-3 py-2 rounded-pill fw-bold shadow-sm">
                    {selectedRecipe.tag?.name || 'General'}
                  </span>
                </div>

                
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="btn-close-modern position-absolute top-0 end-0 m-3 shadow-sm"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>

             
                <div className="title-banner-modern text-center ">
                  <h4 className="fw-bold mb-0 text-white text-shadow">{selectedRecipe.name}</h4>
                  <p className="small mb-0 text-white-50">{selectedRecipe.description ?? ""}</p>
                </div>
              </div>

             
              <div className="p-4 pt-5 bg-white">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="detail-box text-center shadow-hover">
                      <i className="fa-solid fa-wallet text-success mb-2"></i>
                      <label className="text-muted d-block small fw-bold text-uppercase">Price</label>
                      <span className="fw-bold text-dark fs-5">{selectedRecipe.price} <small className="fw-medium opacity-75">EGP</small></span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="detail-box text-center shadow-hover">
                      <i className="fa-solid fa-layer-group text-success mb-2"></i>
                      <label className="text-muted d-block small fw-bold text-uppercase">Category</label>
                      <span className="fw-bold text-dark">{selectedRecipe.category?.[0]?.name || selectedRecipe.category?.name || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="detail-box text-center shadow-hover">
                      <i className="fa-solid fa-fingerprint text-success mb-2"></i>
                      <label className="text-muted d-block small fw-bold text-uppercase">Serial ID</label>
                      <span className="fw-bold text-dark opacity-75">#{selectedRecipe.id}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="detail-box text-center shadow-hover">
                      <i className="fa-solid fa-calendar-check text-success mb-2"></i>
                      <label className="text-muted d-block small fw-bold text-uppercase">Date</label>
                      <span className="fw-bold text-dark">{new Date(selectedRecipe.creationDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="d-flex gap-3 mt-4 pt-2">
                   {loginData?.userGroup === 'SystemUser' && !favList.some(fav => fav.recipe.id === selectedRecipe.id) ? (
                    <button 
                      className="btn btn-fav-modern flex-grow-1 py-2" 
                      onClick={() => { addFav(selectedRecipe.id); setShowViewModal(false); }}
                    >
                      <i className="fa-solid fa-heart me-2"></i> Add to Favorite
                    </button>
                  ) : (
                    <button 
                      className="btn btn-close-main flex-grow-1 py-2" 
                      onClick={() => setShowViewModal(false)}
                    >
                      Done
                    </button>
                  )}
                  {loginData?.userGroup === 'SuperAdmin' && (
                    <button 
                      className="btn btn-delete-modern py-2" 
                      onClick={() => { setShowViewModal(false); setSelectedRecipeId(selectedRecipe.id); setShowDeleteModal(true); }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}
