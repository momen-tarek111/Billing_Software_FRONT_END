import { useState } from "react";
import toast from "react-hot-toast";
import { deleteUser } from "../../../Service/UserService";
import "./UserList.css"
function UsersList({ users, setUsers }) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const deleteByUserId = async (userId) => {
    try {
      const response = await deleteUser(userId);
      if (response.status === 204) {
        const updatedUsers = users.filter(
          (user) => user.userId !== userId,
        );
        setUsers(updatedUsers);
        toast.success("User deleted");
      } else {
        toast.error("Unable ti delete user");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable ti delete user");
    }
  };

  return (
        <div className='category-list-container'>
        <div className='row pe-2'>
            <div className='input-group mb-3'>
                <input type="text" 
                    name="keyword"
                    id='keyword'
                    placeholder='Search by Keyword'
                    className='form-control'
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
                <span className='input-group-text bg-warning'>
                    <i className="bi bi-search"></i>
                </span>
            </div>
        </div>
        <div className='row g-3 pe-2'>
            {filteredUsers.map((user,index)=>(
                <div key={index} className='col-12'>
                    <div className='card bg-dark user-info-container'>
                        <div className='d-flex align-items-center user-info'>
                            <div className='flex-grow-1'>
                                <h5 className='mb-1 text-white name-text'>{user.name}</h5>
                                <p className='mb-0 text-white email-text'>{user.email}</p>
                            </div>
                            <div>
                                <button className='btn btn-danger btn-sm' onClick={()=>deleteByUserId(user.userId)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}

export default UsersList;
