import { assets } from "../../../assets/assets"
import Category from "../Category"
import "./DisplayCategory.css"
function DisplayCategory({categories,selectedCategory,setSelectedCategory}) {
  return (
    <div className="row g-3" style={{width:'100%',margin:0}}>
        <div key="All Items" className="col-lg-4 col-md-6 col-sm-12" style={{padding:'0 10px'}}>
            <Category
                categoryName="All Items"
                imgUrl={assets.devices}
                numberOfItems={categories.reduce((acc,cat)=>acc+cat.items,0)}
                bgColor="#6c757d"
                isSelected={selectedCategory===""}
                onClick={()=>setSelectedCategory("")}
            />
        </div>
        {categories.map(category=>{
            if(category.items!==0){
                return (
                                    <div key={category.categoryCode} className="col-lg-4 col-md-6 col-sm-12" style={{padding:'0 10px'}}>
                    <Category
                        categoryName={category.name}
                        imgUrl={category.imageUrl}
                        numberOfItems={category.items}
                        bgColor={category.bgColor}
                        isSelected={selectedCategory===category.categoryCode}
                        onClick={()=>setSelectedCategory(category.categoryCode)}
                    />
                </div>
                )
            }
        })}
    </div>
  )
}

export default DisplayCategory