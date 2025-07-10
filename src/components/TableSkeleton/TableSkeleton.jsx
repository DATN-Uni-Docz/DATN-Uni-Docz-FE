import { Skeleton } from "@mui/material";
import css from "./TableSkeleton.module.css";
import { Stack } from "@mui/system";
import classNames from "classnames";

const TableSkeleton = ({className}) => {
  return (
    <div className={classNames(css.container, className)}>
      <Skeleton
        variant="rectangular"
        height={70}
        sx={{ borderRadius: "6px", mb: "16px" }}
      />
      <Stack spacing={2}>
        <Skeleton
          variant="rectangular"
          height={40}
          sx={{ borderRadius: "6px" }}
        />
        <Skeleton
          variant="rectangular"
          height={40}
          sx={{ borderRadius: "6px" }}
        />
        <Skeleton
          variant="rectangular"
          height={40}
          sx={{ borderRadius: "6px" }}
        />
      </Stack>
    </div>
  );
}

export default TableSkeleton;