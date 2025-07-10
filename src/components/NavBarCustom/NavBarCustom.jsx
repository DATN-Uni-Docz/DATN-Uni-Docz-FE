import CustomButton from "../CustomButton/CustomButton"
import { Button, Grid, Box } from "@mui/material"

function NavBarCustom() {
    return (
        <Grid sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <CustomButton type='text' color='black' isActive >Man</CustomButton>
            <CustomButton type='text' color='black'>Woman</CustomButton>
            <CustomButton type='text' color='black'>Kids</CustomButton>
            <CustomButton type='text' color='black'>Contact</CustomButton>
            <CustomButton type='text' color='black'>Sale</CustomButton>
        </Grid>
    )
}

export default NavBarCustom