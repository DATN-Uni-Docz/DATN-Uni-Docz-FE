import classNames from "classnames";
import css from "./ValidationError.module.css";
import { string, bool, shape } from "prop-types";

const ValidationError = props => {
    const { rootClassName, className, fieldMeta } = props;
    const { touched, error } = fieldMeta;
    const classes = classNames(rootClassName || css.root, className);
    return touched && error ? <div className={classes}>{error}</div> : null;
};

ValidationError.defaultProps = {
    rootClassName: null,
    className: null,
};
ValidationError.propTypes = {
    rootClassName: string,
    className: string,
    fieldMeta: shape({
        touched: bool.isRequired,
        error: string,
    }).isRequired,
};

  
export default ValidationError;