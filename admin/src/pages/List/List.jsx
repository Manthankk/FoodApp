import React, { useEffect, useState } from 'react'; // Added useState
import './List.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const List = ({url}) => {

  const [list, setList] = useState([]); // Added useState import

  const fetchList = async () => {
    try {
      const response = await fetch(`${url}/api/food/list`); // Corrected fetch method
      const data = await response.json();
      if (data) {
        setList(data.data); // Corrected data access
      } else {
        toast.error("Failed to get list");
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const deleteFood = async (foodId) => {
   
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId});
      await fetchList();
      if (response.data.success){
        toast.success(response.data.message);
      }
      else{
        toast.error('Failed to remove');
      }

  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div className="list-table-format" key={item._id}>
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p> {/* Fixed price rendering */}
            <button onClick={() => deleteFood(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
