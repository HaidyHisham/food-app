import React, { useState, useEffect } from 'react';
import Header from '../../../Shared/components/Header/Header';
import headerCategories from '../../../../assets/headerCategories.svg';
import NoData from '../../../Shared/components/NoData/NoData';
import DeleteConfirmation from '../../../Shared/components/DeleteConfimation/DeleteConfirmation';
import axiosClient from '../../../../api/modules/axiosClient';
import { toast } from 'react-toastify';

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

   const getUsers = async () => {
  try {
    setIsLoading(true);
    const response = await axiosClient.get('/Users', {
     
      params: { pageSize: 10, pageNumber: 1 } 
    });
    setUsersList(response.data.data);
  } catch (error) {
    toast.error('Failed to load users');
  } finally {
    setIsLoading(false);
  }
};
  const deleteUser = async () => {
    try {
      setIsLoading(true);
      await axiosClient.delete(`/Users/${selectedUserId}`);
      setUsersList(prev => prev.filter(item => item.id !== selectedUserId));
      toast.success('User deleted successfully!');
      setShowDeleteModal(false);
      setSelectedUserId(null);
    } catch (error) {
      toast.error('Failed to delete user');
    } finally {
      setIsLoading(false);
    }
  };
 

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Header 
        title="Users" 
        titleSpan="list" 
        description="You can now add your items that any user can order it from the Application and you can edit" 
        imgUrl={headerCategories} 
      />

      <DeleteConfirmation
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteUser}
      />

      <div className='px-4 mt-4'>
        <h4 className='title-categories-list'>Users Table Details</h4>
        <span className='sub-title-categories-list'>You can check all details</span>
      </div>

      <div className="table-responsive px-4 pb-4">
        <table className="table table-borderless align-middle" style={{ borderCollapse: 'separate', borderSpacing: '0' }}>
          <thead style={{ backgroundColor: '#E2E5EB' }}>
            <tr>
              <th scope="col"  style={{ borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>#</th>
              <th scope="col" >Name</th>
              <th scope="col" >Email</th>
              <th scope="col" >Group</th>
              <th scope="col" style={{ borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : usersList.length > 0 ? (
              usersList.map((user, index) => (
                <tr key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fb' }}>
                  <td className='ps-4 text-muted'>{user.id}</td>
                  {/* Using userName as defined in Swagger */}
                  <td className='text-muted'>{user.userName}</td>
                  <td className='text-muted'>{user.email}</td>
                  <td className='text-muted'>
                    {user.group?.id === 1 ? 'Admin' : 'System User'}
                  </td>
                  <td className='pe-4'>
                    <div className="dropdown position-relative">
                      <i
                        className="fa-solid fa-ellipsis fs-5"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ cursor: 'pointer' }}
                      ></i>
                      <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 rounded-4 p-2">
                        <li>
                          <button className="dropdown-item d-flex align-items-center gap-3 py-2 rounded-2">
                            <i className="fa-regular fa-eye text-success"></i>
                            <span className="fw-semibold">View</span>
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { setSelectedUserId(user.id); setShowDeleteModal(true); }} className="dropdown-item d-flex align-items-center gap-3 py-2 rounded-2">
                            <i className="fa-regular fa-trash-can text-success"></i>
                            <span className="fw-semibold">Delete</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}