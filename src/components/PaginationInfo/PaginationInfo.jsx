import classNames from "classnames";
import css from "./PaginationInfo.module.css";
import { useIntl } from "react-intl";

const PaginationInfo = (props) => {
  const { page, totalPages, totalResults, limit, className } = props;
  const intl = useIntl();
  
  return (
    <div className={classNames(css.container, className)}>
      {intl.formatMessage(
        { id: "PaginationInfo.resultCount" },
        {
          from: (page - 1) * limit + 1,
          to: page === totalPages ? totalResults : page * limit,
          total: totalResults,
        }
      )}
    </div>
  );
};

export default PaginationInfo;
