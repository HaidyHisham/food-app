import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createRecipe, updateRecipe, getRecipeById } from '../../../../api/modules/recipes';
import { getAllTags } from '../../../../api/modules/tags';
import { getCategories } from '../../../../api/modules/categories';

export default function RecipeData() {
  // Add a state for preview
  const [imgPreview, setImgPreview] = useState(null);
  const { recipeId } = useParams();
  const isEditMode = !!recipeId;
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [tagsRes, catsRes] = await Promise.all([
          getAllTags(),
          getCategories({ pageSize: 100, pageNumber: 1 })
        ]);
        setTags(tagsRes.data.data || tagsRes.data);
        setCategories(catsRes.data.data);
      } catch (error) {
        console.error("Failed to load dropdown data", error);
      }
    };
    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecipeDetails = async () => {
        try {
          const response = await getRecipeById(recipeId);
          setImgPreview(`https://upskilling-egypt.com:3006/${response.data.imagePath}`);
          const recipe = response.data;

          reset({
            name: recipe.name,
            description: recipe.description,
            price: recipe.price,
            tagId: recipe.tag?.id,
            categoriesIds: recipe.category[0]?.id
          });
        } catch (error) {
          toast.error("Failed to load recipe data");
        }
      };
      fetchRecipeDetails();
    }
  }, [recipeId, isEditMode, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', Number(data.price));
      formData.append('description', data.description);
      formData.append('tagId', Number(data.tagId));
      formData.append('categoriesIds', data.categoriesIds);

      if (data.recipeImage && data.recipeImage.length > 0) {
        formData.append('recipeImage', data.recipeImage[0]);
      }

      if (isEditMode) {
        await updateRecipe(formData, recipeId);
        toast.success('Recipe updated successfully!');
      } else {
        await createRecipe(formData);
        toast.success('Recipe created successfully!');
      }

      navigate('/recipes-list');
    } catch (error) {
      toast.error('Operation failed!');
      console.log(error);
    }
  };

  return (
    <>
      <div className='container'>
        <div className='card p-4 rounded-4 mt-2 dashboard-card'>
          <div className='px-4 card-body d-flex justify-content-between align-items-center'>
            <div>
              <h5 className='card-title fw-semibold'>
                {isEditMode ? 'Edit' : 'Fill'} the <span className='fw-semibold'>Recipes</span>!
              </h5>
              <p className='card-text w-75'>
                You can now {isEditMode ? 'update' : 'fill'} the recipes easily using the form below.
              </p>
            </div>
            <button className='btn btn-success px-4 py-2 fw-semibold' onClick={() => navigate('/recipes-list')}>
              View Recipes <i className='fa fa-arrow-right ms-2'></i>
            </button>
          </div>
        </div>
      </div>

      <div className='container mt-4'>
        <form className='mx-auto' style={{ maxWidth: '800px' }} onSubmit={handleSubmit(onSubmit)}>

          <div className='mb-3'>
            <input {...register('name', { required: true })} type='text' className='form-control border-0 bg-light py-2 px-3 rounded-2' placeholder='Recipe Name' />
            {errors.name && <p className='text-danger'>Recipe name is required</p>}
          </div>

          <div className='mb-3'>
            <select {...register('tagId', { required: true })} className='form-select border-0 bg-light py-2 px-3 rounded-2 text-muted'>
              <option value=''>Select Tag</option>
              {tags?.map((tag) => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
            {errors.tagId && <p className='text-danger'>Tag is required</p>}
          </div>

          <div className='input-group mb-3'>
            <input {...register('price', { required: true })} type='text' className='form-control border-0 bg-light py-2 px-3 rounded-start-2' placeholder='Price' />
            <span className='input-group-text border-0 bg-light fw-medium rounded-end-2'>EGP</span>
            {errors.price && <p className='text-danger'>Price is required</p>}
          </div>

          <div className='mb-3'>
            <select {...register('categoriesIds', { required: true })} className='form-select border-0 bg-light py-2 px-3 rounded-2 text-muted'>
              <option value=''>Select Category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.categoriesIds && <p className='text-danger'>Category is required</p>}
          </div>

          <div className='mb-3'>
            <textarea {...register('description', { required: true })} className='form-control border-0 bg-light py-2 px-3 rounded-2' rows='4' placeholder='Description *'></textarea>
            {errors.description && <p className='text-danger'>Description is required</p>}
          </div>

          <div
            className='mb-4 p-4 text-center rounded-2 mt-4'
            style={{ border: '2px dashed #28a745', backgroundColor: '#f8fff9', cursor: 'pointer', overflow: 'hidden' }}
            onClick={() => document.getElementById('fileInput').click()}
          >
            {imgPreview ? (
              <img src={imgPreview} alt="Preview" style={{ maxHeight: '150px', objectFit: 'cover' }} className="mb-2 rounded" />
            ) : (
              <i className='fa-solid fa-arrow-up-from-bracket fs-5 mb-2'></i>
            )}

            <input
              type='file'
              id='fileInput'
              className='d-none'
              {...register('recipeImage', { 
                required: !isEditMode,
                onChange: (e) => {
                  if(e.target.files && e.target.files[0]) {
                    setImgPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }
              })} 
            />
            <p className='mb-0 fw-medium text-dark'>
              {isEditMode ? "Change Recipe Image (Optional)" : "drag&drop Choose a Recipe Image to Upload"}
            </p>
          </div>

          <div className='d-flex justify-content-end gap-3 pt-4 border-top mt-4'>
            <button type='button' onClick={() => navigate('/recipes-list')} className='btn btn-outline-success px-4 py-2 fw-semibold'>Cancel</button>
            <button type='submit' className='btn btn-success px-4 py-2 fw-semibold'>
              {isEditMode ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}