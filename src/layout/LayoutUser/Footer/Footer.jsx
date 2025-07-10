import { Link } from "react-router-dom";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "../../../icon/Icon";
import css from "./Footer.module.css";
import { FormattedMessage } from "react-intl";
const Footer = () => {
  return (
    <footer className={css.container}>
      <div className={css.pageLinkWrapper}>
        <Link className={css.pageLinkItem} to="#">
          <FormattedMessage id="Footer.about" />
        </Link>
        <Link className={css.pageLinkItem} to="#">
          <FormattedMessage id="Footer.contact" />
        </Link>
        <Link className={css.pageLinkItem} to="#">
          <FormattedMessage id="Footer.terms" />
        </Link>
        <Link className={css.pageLinkItem} to="#">
          <FormattedMessage id="Footer.privacy" />
        </Link>
      </div>
      <div className={css.socialLinks}>
        <FormattedMessage id="Footer.followUs" />
        <a href="#">
          <FacebookIcon />
        </a>
        <a href="#">
          <InstagramIcon />
        </a>
        <a href="#">
          <TwitterIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
