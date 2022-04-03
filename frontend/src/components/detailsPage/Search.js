import React,{useState} from "react";
import Styles from './Search.module.css'
import "../../App.css"
const Search=({history})=>{

    const [keyword, setKeyword] = useState();

    const searchSubmitHandler = (e) => {
        e.preventDefault();

        if(keyword.trim()){
            history.push(`/customer/${keyword}`)
        }else{
            history.push("/customer")
        }
    }


    return <>
        <form className={Styles.form} onSubmit={searchSubmitHandler}>
            <input 
            className={Styles.Input}
            placeholder=" Search Name"
            onChange={(e)=>setKeyword(e.target.value)}/>

            <input className={Styles.Button} type='submit' value="Search"/>

        </form>
    </>
}
export default Search;