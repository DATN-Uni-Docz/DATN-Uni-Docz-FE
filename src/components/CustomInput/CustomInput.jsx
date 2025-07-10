import classNames from "classnames";
import css from "./CustomInput.module.css";
import Asterisk from "../Asterisk/Asterisk";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";

const CustomInput = (props) => {
  const intl = useIntl();
  const { label, id, children, className, hasAsterisk, href } = props;
  return (
    <div className={classNames(css.root, className)}>
      <label htmlFor={id} className={css.label}>
        {label}
        {hasAsterisk && <Asterisk />}
        {href && (
          <Link to={href} className={css.link}>
            {intl.formatMessage({ id: "CustomInput.linkText" })}
          </Link>
        )}
      </label>
      <div className={css.inputContainer}>{children}</div>
    </div>
  );
}

export default CustomInput;