import Header from '../../../Shared/components/Header/Header'
import headerCategories from '../../../../assets/headerCategories.svg'
import { Card } from 'react-bootstrap'
import { getFavList, deleteFav } from '../../../../api/modules/userRecipe'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function FavList() {
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFavoriteList = async () => {
    try {
      setLoading(true);
      const response = await getFavList();
      setFavList(response.data.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const handleRemoveFav = async (id) => {
    try {
      await deleteFav(id);
      toast.success('Removed from favorites');
      getFavoriteList();
    } catch (error) {
      toast.error('Failed to remove');
    }
  }

  useEffect(() => {
    getFavoriteList();
  }, [])

  return (
    <>
      <Header title="Favorite" titleSpan='Items!' description='You can now add your items that any user can order it from the Application and you can edit' imgUrl={headerCategories} />

      <div className="row px-4 mt-4">
        {loading ? (
          <div className="text-center py-5">
            <i className="fa fa-spinner fa-spin fa-2x text-success"></i>
          </div>
        ) : favList?.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No favorite items yet.</p>
          </div>
        ) : (
          favList?.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6 col-12 mb-4">
              <Card className='p-0 shadow-sm border-0 rounded-3 overflow-hidden'>
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={item.recipe.imagePath ? `https://upskilling-egypt.com:3006/${item.recipe.imagePath}` : 'https://via.placeholder.com/300x200'}
                    alt={item.recipe.name}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <button
                    className="fav-heart-btn bg-white border-black rounded-2 text-success position-absolute top-0 end-0 m-2 favShadow"
                    onClick={() => handleRemoveFav(item.id)}
                    title="Remove from favorites"
                  >
                    <i className='fa-solid fa-heart'></i>
                  </button>
                </div>
                <Card.Body>
                  <Card.Title className="fw-semibold fs-6 card-title-color">{item.recipe.name}</Card.Title>
                  <Card.Text className="text-muted" style={{ fontSize: '14px' }}>
                    {item.recipe.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
    </>
  )
}
