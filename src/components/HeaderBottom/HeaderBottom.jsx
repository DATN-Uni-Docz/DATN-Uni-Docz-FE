import NavBarHeader from "../NavBarCustom/NavBarCustom"
import Search from '../Search/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { IconButton, Grid, Typography } from "@mui/material";
import classes from "./HeaderBottom.module.css"

function HeaderBottom({ logo, isMain, title }) {
    return (
        <div className={classes.header_main}>
            {isMain && (
                <>
                    <img src={logo} alt="Logo" className={classes.image}/>
                    <NavBarHeader />
                    <Grid sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Search />
                        <IconButton>
                            <ShoppingBasketIcon />
                        </IconButton>
                    </Grid>
                </>
            )}
            {!isMain && (
                <>
                    <Grid sx={{display: 'flex'}} className={classes.image}>
                        <img src={logo} alt="Logo" />
                        <Typography variant="text" sx={{
                            fontSize: '25px', fontWeight: '500', display: 'flex', alignItems: 'flex-end', ml: 4, mb: 1
                        }}>{title}</Typography>
                    </Grid>
                    <Search className={classes.search_sub} />
                </>
            )}
        </div>
    )
}

export default HeaderBottom