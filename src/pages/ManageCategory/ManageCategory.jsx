import './ManageCategory.css'
import CategoryFrom from '../../components/Category/CategoryForm/CategoryFrom'
import CategoryList from '../../components/Category/CategoryList/CategoryList'
function ManageCategory() {
  return (
    <div className='category-container text-light'>
      <div className='left-column'>
        <CategoryFrom/>
      </div>
      <div className='right-column'>
        <CategoryList/>
      </div>
    </div>
  )
}

export default ManageCategory