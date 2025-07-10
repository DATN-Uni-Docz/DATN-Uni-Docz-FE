import { Typography } from "@mui/material"
import Filter from "../../components/Filter/Filter"
import classes from "./Search.module.css"
import SortBy from "../../components/SortBy/SortBy"
import ListProduct from "../../components/ListProduct/ListProduct"
import { useEffect, useState } from "react"
import { getListProducts } from "../../api/search/search"
import { useDispatch, useSelector } from "react-redux"
import { setNewPage, setInfoPageSearch } from "../../redux/slice/searchSlice"

const limit = 10;

const Search = ({}) => {
    const dispatch = useDispatch();
    const {page, totalPages, totalResults, priceStart, priceEnd, searchText, filterCategory, sortBy, orderDirection} = useSelector(state => state.search);
    const [listProducts, setListProducts] = useState([]);

    const handleChangePage = (value) => {
        dispatch(setNewPage(value))
    }
    const fetchProducts = async () => {
        try{
            const res = await getListProducts({page, priceStart, priceEnd, searchText, filterCategory, sortBy, orderDirection, limit});
            setListProducts(res.results);
            dispatch(setInfoPageSearch({
                totalPages: res.totalPages,
                totalResults: res.totalResults,
                page: res.page,
            }))

        } catch (err){
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[page, priceStart, priceEnd, searchText, filterCategory, sortBy, orderDirection])
    return (
        <div className={classes.container}>
            <div className={classes.left}>
                <Filter />
            </div>
            <div className={classes.right}>
                <div className={classes.main_title}>
                    <Typography sx={{fontSize: "18px"}}>
                        Showing {totalResults > 0 ? `${(page-1)*limit+1} - ${page === totalPages ? totalResults : page*limit}` : 0} of {totalResults} results
                    </Typography>
                    <SortBy />
                </div>
                <div className={classes.list_product}>
                    <ListProduct 
                        listProducts={listProducts}
                        page={page}
                        onChangePage={handleChangePage}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </div>
    )
}

export default Search