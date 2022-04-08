import React, { useState,useEffect, Fragment } from "react";
import Styles from './Home2.module.css'
import { clearErrors, getCustomer } from "../../actions/customerAction"
import { useDispatch, useSelector } from "react-redux";
import Customer from "./Customer";
import Search from "./Search";
import LogoutButton from "../logoutButton/logoutButton";
import { useAlert } from "react-alert";
import { loadUser, logout } from "../../actions/clientAction"
import Pagination from 'react-js-pagination'
const Home2 = ({ history, match }) => {
    
    const dispatch = useDispatch();
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1)
    
    const { client, loading, isAuthenticated } = useSelector((state) => state.client);
    
    const keyword = match.params.keyword

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

  

    const { error, customers,customersCount, resultPerPage } = useSelector(
        (state) => state.customers
    );

    useEffect(() => {
        const clientid = client._id ? client._id : client.user._id
        
        dispatch(getCustomer(keyword,currentPage, clientid));

        if (loading === false && isAuthenticated === false) {
            console.log("home 2 returning")
            history.push("/");
        }

        if (client.role === "admin") {
            console.log("Admin login")
            history.push("/admin");
        }
        
    }, [history, isAuthenticated, keyword, currentPage,customersCount ,client.id,dispatch]);
   
    
    if (!client) {
        window.location.reload();
    }

    function handleClick() {
        dispatch(logout());
        history.push("/");
    }
    function handleAdd() {
        history.push("/customers/new")
    }
    return loading ? "true" :( 
    <>
        {customersCount && (
        <div className={Styles.mainContainer}>
            <div className="">
            <h1 className={Styles.header}>
                Customer Details
            </h1>
            </div>
            <div className={Styles.cards}>
                <Search history={history} />
                {customers && customers.map((customer,index) => <Customer index={(customersCount-1) - ((currentPage-1)*resultPerPage+index)} id={customer._id} key={customer._id} customer={customer} history={history} />)}
            </div>


            {/* <button className={Styles.AddButton} onClick={() => { handleAdd() }}>+</button> */}

           {customersCount ? <div className={Styles.PageBox}>
                <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={customersCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
                hideFirstLastPages={true}
                pageRangeDisplayed={4}
                />
            </div> : " "}

            <LogoutButton func={handleClick} />
            <div  className={Styles.AddButton} onClick={() => { handleAdd() }}>
                <p>+</p>
            </div>
        </div>
        )
        }
    </>)
}
export default Home2;


















