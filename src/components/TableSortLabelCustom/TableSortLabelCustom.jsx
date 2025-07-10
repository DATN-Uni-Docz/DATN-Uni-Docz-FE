import { TableSortLabel } from "@mui/material"
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";

const TableSortLabelCustom = ({children, color,name, orderBy, orderDirection, onClick}) => {
    return (
        <TableSortLabel
            active={orderBy === name}
            direction={orderBy === name ? orderDirection : 'asc'}
            onClick={onClick}
            IconComponent={ArrowDropDown} 
            sx={{
                svg: {
                    fontSize: "1.5rem",
                },
                color: color,
                '&:hover': {
                    opacity: 0.8,  
                    color: color,
                },
                '&.Mui-active': {
                    color: color,  
                },
                '&.Mui-active .MuiTableSortLabel-icon': {
                    color: color,  
                },
                '&.Mui-active.Mui-focusVisible': {
                    color: color, 
                },
                '&:focus': {
                    color: color,
                }
            }}
        >
            {children}
        </TableSortLabel>
    )
}

export default TableSortLabelCustom;