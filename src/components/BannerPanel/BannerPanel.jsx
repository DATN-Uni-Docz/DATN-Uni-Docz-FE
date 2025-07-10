import css from "./BannerPanel.module.css";
import classNames from "classnames";
import { string, node } from "prop-types";

const BannerPanel = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(css.container, className)}>
      <div className={css.banner}>
        <div className={css.bannerDetails}>{children}</div>
      </div>
    </div>
  );
};

BannerPanel.defaultProps = {};

BannerPanel.propTypes = {
  children: node.isRequired,
  className: string,
};

export default BannerPanel;
