import { ListItemButton, ListItemIcon, ListItemText, Grid2 } from "@mui/material"
import classes from "./ListItem.module.css"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
const ListItem = ({title, icon, subItem, color, onClick, isOpen, collapse, isActive}) => {
    return (
        <ListItemButton sx={{pl: 0}} onClick={onClick}>
            <ListItemIcon className={isActive ? classes.icon_active : classes.icon}>
                {icon}
            </ListItemIcon>
            <Grid2 
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}
            >
                 <ListItemText
                    classes={{
                        primary: subItem ? classes.subItem : classes.mainItem,
                    }}
                >
                    {title}
                </ListItemText>
                <Grid2>
                    {collapse && isOpen && <KeyboardArrowUp />}
                    {collapse && !isOpen && <KeyboardArrowDown />}
                </Grid2>
            </Grid2>
        </ListItemButton>
    )
}

export default ListItem