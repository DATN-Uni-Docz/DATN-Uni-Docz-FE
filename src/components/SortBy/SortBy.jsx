import { useEffect, useState } from "react";
import { SwapVert } from "@mui/icons-material"
import { Button, Divider, FormControlLabel, Grid2, Menu, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import classes from "./SortBy.module.css"
import { useDispatch, useSelector } from "react-redux";
import { setSortBy } from "../../redux/slice/searchSlice";

const SortBy = ({}) => {
    const dispatch = useDispatch();
    const { sortBy, orderDirection } = useSelector(state => state.search);
    const [name, setName] = useState("");
    const [priceRadio, setPriceRadio] = useState("");
    const [updatedAtRadio, setUpdatedAtRadio] = useState("");

    useEffect(()=>{
        setName(sortBy);
        if (sortBy === "price") setPriceRadio(orderDirection);
        else if (sortBy === "updatedAt") setUpdatedAtRadio(orderDirection); 
    },[sortBy, orderDirection])

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOnChangeValue = (e, type) => {
        const value = e.target.value;
        setName(type);
        if (type == "price") {
            setPriceRadio(value);
            setUpdatedAtRadio("");
        } else {
            setUpdatedAtRadio(value);
            setPriceRadio("");
        }
    }

    const handleApply = () => {
        const order = name === "price" ? priceRadio : updatedAtRadio;
        dispatch(setSortBy({
            sortBy: name,
            order,
        }))
        setAnchorEl(null);
    }

    const handleReset = () => {
        dispatch(setSortBy({
            sortBy: "",
            order: "",
        }))
        setName("");
        setPriceRadio("");
        setUpdatedAtRadio("");
    }

    return (
        <div className={classes.container}>
            <Button 
                variant="contained" 
                sx={{
                    backgroundColor: "#fff", 
                    color: "#6C7275",
                    textTransform: "none",
                    borderRadius: "30px",
                    padding: "0.5rem 2.5rem",
                    "&:hover" : {
                        cursor: "pointer"
                    }
                }} 
                endIcon={<SwapVert />}
                onClick={handleClick}
            >
                Sort by
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{mt: 2}}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: "right"
                }}
            >
                <Grid2 sx={{width: "400px", p: "1rem"}}>
                    <Typography sx={{fontWeight: "500", mb:  "0.5rem"}}>Price</Typography>
                    <RadioGroup 
                        row 
                        value={priceRadio}
                        onChange={(e)=>handleOnChangeValue(e,"price")}
                    >
                        <FormControlLabel value="asc" control={<Radio sx={{
                            "&.Mui-checked" : { color : "var(--admin-color)"}
                        }} />} label="Low to high" sx={{flex: 1}} />
                        <FormControlLabel value="desc" control={<Radio sx={{
                            "&.Mui-checked" : { color : "var(--admin-color)"}
                        }} />} label="High to low" sx={{flex: 1}} />
                    </RadioGroup>
                    <Divider sx={{m: "0.5rem 0"}}/>
                    <Typography sx={{fontWeight: "500", mb:  "0.5rem"}}>Last updated</Typography>
                    <RadioGroup 
                        row 
                        value={updatedAtRadio}
                        onChange={(e)=>handleOnChangeValue(e,"updatedAt")}
                    >
                        <FormControlLabel value="desc" control={<Radio sx={{
                            "&.Mui-checked" : { color : "var(--admin-color)"}
                        }} />} label="Newest" sx={{flex: 1}} />
                        <FormControlLabel value="asc" control={<Radio sx={{
                            "&.Mui-checked" : { color : "var(--admin-color)"}
                        }} />} label="Oldest" sx={{flex: 1}} />
                    </RadioGroup>
                    <Divider sx={{m: "1rem 0"}}/>
                    <div className={classes.list_button}>
                        <Button
                            variant="contained" 
                            sx={{
                                backgroundColor: "var(--admin-color)",
                            }}
                            onClick={handleApply}
                        >
                            Apply
                        </Button>
                        <Button
                            variant="outlined" 
                            sx={{
                                color: "var(--admin-color)",
                                border: "1px solid var(--admin-color)"
                            }}
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid2>
            </Menu>
        </div>
    )
}

export default SortBy