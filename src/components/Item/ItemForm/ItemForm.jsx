import React, { useEffect } from 'react'
import { useContext,useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';
import { assets } from '../../../assets/assets';
import { addItem } from '../../../Service/ItemService';

function ItemForm() {
  const {categories,itemsData,setItemsData,setCategories}=useContext(AppContext)
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
      name:"",
      description:"",
      price:"",
      categoryId:"",
  });
  useEffect(()=>{console.log(categories)},[categories])
  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData((data)=>({...data,[name]:value}))
  }
  const onSubmitHandler=async (e)=>{
    e.preventDefault();
    if(!image){
      toast.error("select image for category")
      return;
    }
    setLoading(true);
    const formData= new FormData();
    formData.append("item",JSON.stringify(data));
    formData.append("file",image);
    try {
      const response = await addItem(formData);
      if(response.status===201){
        setItemsData([...itemsData,response.data]);
        setImage(false)
        setCategories((prevCategories)=>
        prevCategories.map((category)=>category.categoryCode===data.categoryId ? {...category,items:category.items+1}:category))
        toast.success("Item added");
        setData({
          name:"",
        description:"",
        price:"",
        categoryId:"",
        })
      }
      else{
        console.log(response.status);
        toast.error("Error adding Item");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding Item");
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div className='item-form-container' style={{height:'100vh',overflow:'auto',overflowX:'hidden'}}>
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-12 form-container">
            <div className="card-body">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    <img src={image?URL.createObjectURL(image):assets.upload} alt="" width={48} />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    hiding
                    onChange={(e)=>setImage(e.target.files[0])}
                    
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Item Name"
                    value={data.name}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
                <div className='mb-3'>
                    <label htmlFor="categoryId" className='form-label'>Category</label>
                    <select name="categoryId" id="categoryId" value={data.categoryId} onChange={onChangeHandler} className='form-control' required>
                        <option hidden>--SELECT CATEGORY</option>
                        {categories.map((category,index)=>(
                          
                          <option key={index} value={category.categoryCode}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className='mb-3'>
                    <label htmlFor="price" className='form-label'>Price</label>
                    <input type="number" name='price' id='price' onChange={onChangeHandler} value={data.price} className='form-control' placeholder='$20' required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={5}
                    onChange={onChangeHandler}
                    value={data.description}
                    className="form-control"
                    placeholder="Write content here.."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-warning w-100">
                  {loading?"loading...":"save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemForm