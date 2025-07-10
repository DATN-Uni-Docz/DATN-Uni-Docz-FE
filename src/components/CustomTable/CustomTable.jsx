import {
  Grid2,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableSortLabelCustom from "../TableSortLabelCustom/TableSortLabelCustom";
import classes from "./CustomTable.module.css";
import { Link } from "react-router-dom";
import IconButton from "../IconButton/IconButton";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useIntl } from "react-intl";
import classNames from "classnames";
import PaginationInfo from "../PaginationInfo/PaginationInfo";

const TableCustom = ({
  data,
  tableColumns,
  viewAction,
  editAction,
  deleteAction,
  sortBy,
  order,
  onSetOrder,
  page,
  rowsPerPage,
  totalResults,
  totalPages,
  limit,
  onPageChange,
  className
}) => {
  const isAction = viewAction || editAction || deleteAction;
  const intl = useIntl();

  return (
    <>
      <TableContainer
        className={classNames(classes.container, className)}
        sx={{ border: "1px solid rgba(224, 224, 224, 1)", borderRadius: "6px" }}
      >
        <Table>
          <TableHead className={classes.table_head}>
            <TableRow>
              {tableColumns?.map((column) => {
                return column.isSorted ? (
                  <TableCell
                    key={column.name}
                    sx={{ color: "var(--colorBlack)", fontWeight: "bold" }}
                  >
                    <TableSortLabelCustom
                      orderBy={sortBy}
                      orderDirection={order}
                      name={column.name}
                      color="var(--colorBlack)"
                      onClick={() => onSetOrder(column.name)}
                    >
                      {column.label}
                    </TableSortLabelCustom>
                  </TableCell>
                ) : (
                  <TableCell
                    key={column.name}
                    sx={{ color: "var(--colorBlack)", fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                );
              })}
              {isAction && <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id} className={classes.table_row}>
                {tableColumns?.map((column) => {
                  return column.isLink ? (
                    <TableCell key={`${item.id}_${column.name}`}>
                      <Link className={classes.link} to={column.path(item)}>
                        {column.render(item)}
                      </Link>
                    </TableCell>
                  ) : (
                    <TableCell key={`${item.id}_${column.name}`}>
                      {column.render(item)}
                    </TableCell>
                  );
                })}
                {isAction && (
                  <TableCell
                    sx={{
                      paddingRight: "1rem",
                      display: "flex",
                      gap: "20px",
                      justifyContent: "flex-end",
                    }}
                  >
                    {viewAction && (
                      <IconButton onClick={() => viewAction(item)}>
                        <Visibility sx={{ color: "blue" }} />
                      </IconButton>
                    )}
                    {editAction && (
                      <IconButton onClick={() => editAction(item)}>
                        <Edit sx={{ color: "green" }} />
                      </IconButton>
                    )}
                    {deleteAction && (
                      <IconButton onClick={() => deleteAction(item)}>
                        <Delete sx={{ color: "red" }} />
                      </IconButton>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data?.length == 0 ? (
        <Grid2 sx={{ textAlign: "center", padding: "1rem 0" }}>
          {intl.formatMessage({ id: "TableCustom.noResults" })}
        </Grid2>
      ) : (
        <Grid2
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <PaginationInfo
            page={page}
            totalPages={totalPages}
            totalResults={totalResults}
            limit={limit}
          />
          <Pagination
            count={totalPages}
            page={page}
            onChange={onPageChange}
            size="large"
            sx={{
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "var(--primaryColor)",
                color: "white",
              },
            }}
          />
        </Grid2>
      )}
    </>
  );
};

export default TableCustom;
