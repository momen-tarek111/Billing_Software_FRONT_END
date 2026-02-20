import { useContext,useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import "./CategoryList.css"
import { deleteCategory } from '../../../Service/CategoryService';
import toast from 'react-hot-toast';
function CategoryList() {
    const {categories,setCategories} = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState("")
    const filteredCategories=categories.filter(category=>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const deleteByCategoryCode= async (categoryCode)=>{
        try{
            const response=await deleteCategory(categoryCode);
            if(response.status===204){
                const updatedCategories=categories.filter(category=>category.categoryCode!==categoryCode);
                setCategories(updatedCategories);
                toast.success("Category deleted")
            }
            else{
                toast.error("Unable ti delete category")
            }
        }catch(error){
            console.log(error)
            toast.error("Unable ti delete category")
        }
    }
  return (
    <div className='category-list-container' style={{height:'100%',overflowY:'auto',overflowX:'hidden'}}>
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
            {filteredCategories.map((category,index)=>(
                <div key={index} className='col-12'>
                    <div className='card' style={{backgroundColor:category.bgColor}}>
                        <div className='d-flex align-items-center category-container-row'>
                            <div className='category-image-div'>
                                <img src={category.imageUrl} alt={category.name} className='category-image'/>
                            </div>
                            <div className='flex-grow-1'>
                                <h5 className='mb-1 text-white categ-name-text'>{category.name}</h5>
                                <p className='mb-0 text-white'>{category.items} items</p>
                            </div>
                            <div>
                                <button className='btn btn-danger btn-sm' onClick={()=>deleteByCategoryCode(category.categoryCode)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CategoryList