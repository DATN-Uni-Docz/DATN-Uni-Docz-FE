import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { string } from 'prop-types';
import css from './Asterisk.module.css';

const Asterisk = (props) => {
  const { className, rootClassName, ...rest } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <span className={classes} {...rest}>
      <FormattedMessage id="Asterisk.text" />
    </span>
  );
};

Asterisk.defaultProps = {
  rootClassName: null,
  className: null,
};

Asterisk.propTypes = {
  rootClassName: string,
  className: string,
};

export default Asterisk;
