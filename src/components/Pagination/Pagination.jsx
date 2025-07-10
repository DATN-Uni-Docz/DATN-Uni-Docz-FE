import { Pagination } from "@mui/material";

const PaginationCustom = ({page, totalPages, handleChangePage}) => {
    return (
        <Pagination 
            count={totalPages} 
            siblingCount={0}
            boundaryCount={1}
            onChange={handleChangePage}
            page={page}
            sx={{
                "& .MuiPagination-ul": {
                    justifyContent: "center",
                },
                "& .MuiPaginationItem-root": {
                backgroundColor: '#fff', 
                color: '#000',
                },
                "& .Mui-selected": {
                backgroundColor: '#faa564 !important',
                color: '#fff',
                },
                "& .MuiPaginationItem-previousNext" : {
                    backgroundColor: "rgba(250, 165, 100, 0.2)",
                },
                "& .MuiPaginationItem-icon" : {
                    borderRadius: "90px",
                    color: "#faa564",
                }
            }}
        />
    )
}

export default PaginationCustom;