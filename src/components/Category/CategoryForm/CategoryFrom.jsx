import {useContext, useState} from "react";
import { assets } from "../../../assets/assets";
import toast from "react-hot-toast";
import {addCategory} from "../../../Service/CategoryService"
import {AppContext} from "../../../context/AppContext"
import "./CategoryForm.css"
function CategoryFrom() {
    const {categories,setCategories}=useContext(AppContext)
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name:"",
        description:"",
        bgColor:"#000000"
    });
    const onChangeHandler=(e)=>{
      const name=e.target.name;
      const value=e.target.value;
      setData((data)=>({...data,[name]:value}))
    }
    const onSubmitHandler=async (e)=>{
      e.preventDefault();
      console.log(image)
      if(!image){
        toast.error("select image for category")
        return;
      }
      setLoading(true);
      const formData= new FormData();
      console.log(formData)
      formData.append("category",JSON.stringify(data));
      console.log(formData)
      formData.append("file",image);
      try {
        console.log(formData)
        console.log(data)
        const response = await addCategory(formData);
        if(response.status===201){
          setCategories([...categories,response.data]);
          toast.success("Category added");
          setData({
            name:"",
            description:"",
            bgColor:"#000000"
          })
          
          setImage(false)
        }
      } catch (error) {
        console.log(error);
        toast.error("Error adding category");
      }
      finally{
        setLoading(false);
      }


    }
  return (
    <div className="item-form-container">
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
                    hidden
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
                    placeholder="Category Name"
                    onChange={onChangeHandler}
                    value={data.name}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={5}
                    className="form-control"
                    placeholder="Write content here.."
                    onChange={onChangeHandler}
                    value={data.description}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="bgcolor" className="form-label">
                    Background color
                  </label>
                  <br />
                  <input
                    type="color"
                    name="bgColor"
                    id="bgcolor"
                    onChange={onChangeHandler}
                    value={data.bgColor}
                    required
                  />
                </div>
                <button disabled={loading} type="submit" className="btn btn-warning w-100">
                  {loading?"loading...":"submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryFrom;
