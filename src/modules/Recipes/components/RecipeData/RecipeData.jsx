import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createRecipe } from '../../../../api/modules/recipes'
import { getAllTags } from '../../../../api/modules/tags'
import { getCategories } from '../../../../api/modules/categories'


export default function RecipeData() {
  const navigate = useNavigate();
   const [tags, setTags] = useState([]);
   const [categories, setCategories] = useState([]);

  const {register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', Number(data.price));
      formData.append('description', data.description);
      formData.append('tagId', Number(data.tagId)); 
      formData.append('categoriesIds', Number(data.categoriesIds)); 
      
      if (data.recipeImage && data.recipeImage.length > 0) {
        formData.append('recipeImage', data.recipeImage[0]); 
      }

      const response = await createRecipe(formData);
      console.log(response.data);
      toast.success('Recipe created successfully!');
      navigate('/recipes');
    } catch (error) {
      toast.error('Failed to create recipe!');
      console.log(error);
    }
  };


    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await getAllTags();
                setTags(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTags();
    }, []);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories({pageSize: 100, pageNumber: 1});
                setCategories(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);
    useEffect(() => {
  console.log("Form Errors:", errors);
}, [errors]);
  return (
    <>
      <div className='container '>
        <div className='card p-4 rounded-4 mt-2 dashboard-card '>
          <div className='px-4 card-body d-flex justify-content-between align-items-center '>
            <div>
              <h5 className='card-title fw-semibold'>Fill the <span className='fw-semibold'>Recipes</span> !</h5>
              <p className='card-text w-75 '>you can now fill the recipes easily using the table and form , click here and sill it with the table !</p>
            </div>
            <button className='btn btn-success px-4 py-2 fw-semibold ' onClick={() => navigate('/recipes')}>Fill Recipes<i className='fa fa-arrow-right ms-2'></i></button>
          </div>
        </div>
      </div>
      
      <div className='container mt-4'>
        <form className='mx-auto' style={{maxWidth: '800px'}} onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3'>
            <input {...register('name', {required: true})} type='text' className='form-control border-0 bg-light py-2 px-3 rounded-2' placeholder='Recipe Name' />
            {errors.name && <p className='text-danger'>Recipe name is required</p>}
          </div>

          <div className='mb-3'>
            <select {...register('tagId', {required: true})} className='form-select border-0 bg-light py-2 px-3 rounded-2 text-muted'>
              <option value=''>Tag</option>
              {tags?.map((tag) => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}

            </select>
            {errors.tagId && <p className='text-danger'>Tag is required</p>}
          </div>

          <div className='input-group mb-3'>
            <input {...register('price', {required: true})} type='text' className='form-control border-0 bg-light py-2 px-3 rounded-start-2' placeholder='350.99' />
            <span className='input-group-text border-0 bg-light fw-medium rounded-end-2'>EGP</span>
            {errors.price && <p className='text-danger'>Price is required</p>}
          </div>

          <div className='mb-3'>
            <select {...register('categoriesIds', {required: true})} className='form-select border-0 bg-light py-2 px-3 rounded-2 text-muted'>
              <option value=''>Categ</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.categoriesIds && <p className='text-danger'>Category is required</p>}
          </div>

          <div className='mb-3'>
            <textarea {...register('description', {required: true})} className='form-control border-0 bg-light py-2 px-3 rounded-2' rows='4' placeholder='Description *'></textarea>
            {errors.description && <p className='text-danger'>Description is required</p>}
          </div>

       <div className='mb-4 p-4 text-center rounded-2 mt-4' 
     style={{ border: '2px dashed #28a745', backgroundColor: '#f8fff9', cursor: 'pointer' }}
     onClick={() => document.getElementById('fileInput').click()}>
  
  <i className='fa-solid fa-arrow-up-from-bracket fs-5 mb-2'></i>
  <input 
    {...register('recipeImage', {required: true})} 
    type='file' 
    id='fileInput'
    className='d-none' 
  />
  <p className='mb-0 fw-medium text-dark'> 
    Choose a <span className='text-success'>Recipe Image</span> to Upload
  </p>
</div>
          <div className='d-flex justify-content-end gap-3 pt-4 border-top mt-4'>
            <button type='button' onClick={() => navigate('/recipes')} className='btn btn-outline-success px-4 py-2 fw-semibold'>Cancel</button>
            <button type='submit'  className='btn btn-success px-4 py-2 fw-semibold'>Save</button>
          </div>
        </form>
      </div>
    </>
  )
}
