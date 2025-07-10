import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Stack } from "@mui/material";
import classNames from "classnames";
import { arrayOf, shape, string } from "prop-types";
import { Link } from "react-router-dom";
import css from "./CustomBreadcrumbs.module.css";

const CustomBreadcrumbs = ({ data }) => {
  const breadcrumbs = data.map((item, index) => {
    const { key, label, link } = item;
    const isActive = index === data.length - 1;
    return (
      <Link
        key={key}
        to={link}
        className={classNames(css.item, {
          [css.active]: isActive,
        })}
      >
        {label}
      </Link>
    );
  });

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};

CustomBreadcrumbs.propTypes = {
  data: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
      link: string.isRequired,
    })
  ).isRequired,
};

export default CustomBreadcrumbs;
