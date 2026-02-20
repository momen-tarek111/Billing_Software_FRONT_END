import { useContext , useState} from "react"
import {AppContext} from "../../../context/AppContext"
import "./DisplayItems.css"
import Item from "../Item"
import SearchBox from "../../SearchBox/SearchBox"
function DisplayItems({selectedCategory}) {
    const {itemsData}=useContext(AppContext)
    const [searchText, setSearchText] = useState("")
    const filteredItems=itemsData.filter(item=>{
        if(!selectedCategory) return true
        return item.categoryId===selectedCategory
    }).filter(item=>item.name.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <div className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div></div>
            <div>
                <SearchBox onSearch={setSearchText}/>
            </div>
        </div>
        <div className="row g-3">
            {filteredItems.map((item,index)=>(
                <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                    <Item 
                        itemName={item.name}
                        itemPrice={item.price}
                        itemImage={item.imgUrl}
                        itemId={item.itemId}
                    /> 
                </div>
            ))}
        </div>
    </div>
  )
}

export default DisplayItems