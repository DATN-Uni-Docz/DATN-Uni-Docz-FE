import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../../../components/SearchInput/SearchInput";
import css from "./NavbarUser.module.css";
import classNames from "classnames";
import { handleLogout } from "../../../api/user";
import authSlice from "../../../redux/slice/authSlice";
import { setKeyword } from "../../../redux/slice/searchSlice";
import { roleSelector, userInfoSelector } from "../../../redux/selector";
import { useIntl } from "react-intl";
import {
  ADMIN,
  LIMIT_SUGGESTION,
  MEMBER,
  SEARCH_GROUP,
} from "../../../constants";
import {
  TextButton,
} from "../../../components/CustomButton/CustomButton";
import logo from "../../../assets/uniDoczLogo.png";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import handleError from "../../../utils/handleError";
import memberRoutes from "../../../router/memberRoutes";
import SearchInputForm from "./components/SearchInputForm/SearchInputForm";
import queryString from "query-string";
import { getDocumentListForMember, getDocumentSuggestionListForMember } from "../../../api/document";
import { getCourseSuggestionListForMember } from "../../../api/course";

const NavbarUser = () => {
  const intl = useIntl();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const role = useSelector(roleSelector);
  const isAdmin = role === ADMIN;
  const isMember = role === MEMBER;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userInfo.id);
  const currentUser = useSelector(userInfoSelector);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);
  const location = useLocation();
  const queryParams = useMemo(
    () => queryString.parse(location.search),
    [location]
  );
  const { keyword, tab = 'document' } = queryParams || {};
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOnLogout = () => {
    const logoutFunc = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        await handleLogout(refreshToken);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(
          authSlice.actions.setAuthInfo({
            isAuthenticated: false,
            userInfo: {},
          })
        );
        navigate("/login");
      } catch (err) {
        handleError(err);
      }
    };
    logoutFunc();
  };

  const handleSearch = async (values) => {
    dispatch(setKeyword(searchValue));
    try {
      const newQueryParams = queryString.stringify({
        keyword: searchValue,
        page: 1,
        tab
      }, {
        arrayFormat: "comma",
      });

      navigate(`/s?${newQueryParams}`);
    } catch (err) {
      handleError(err);
    }
  };

  const handleOnInputChange = async (event, value) => {
    try {
      setSearchValue(value);
      const response = tab === 'document' ? await getDocumentSuggestionListForMember({
        page: 1,
        limit: LIMIT_SUGGESTION,
        keyword: value || "",
      }) : await getCourseSuggestionListForMember(
        {
          page: 1,
          limit: LIMIT_SUGGESTION,
          keyword: value || "",
        }
      )
      if (response) {
        const { results } = response;
        const distinctResults = [
          ...new Set(
            results.map(({ title, name }) => title || name)
          ),
        ]
        setSearchOptions(
          results.length > 0
            ? [
                ...distinctResults.map((item) => ({
                  value: item,
                })),
              ]
            : []
        );
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className={css.container}>
      <header className={css.navbar}>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img alt="logo" src={logo} className={css.logo} />
        </Link>
        {/* <SearchInput
          placeholder={intl.formatMessage({
            id: "NavbarUser.searchTextPlaceholder",
          })}
          onSearch={handleSearch}
        /> */}
        <SearchInputForm
          onSubmit={handleSearch}
          handleOnInputChange={handleOnInputChange}
          options={searchOptions}
          initialValues={{
            documentSearch: keyword,
          }}
        />
        <div className={css.actionBox}>
          {isAuthenticated ? (
            <>
              <TextButton>
                <Link
                  style={{ color: "var(--primaryColor)" }}
                  to={memberRoutes.pricing}
                >
                  {intl.formatMessage({
                    id: "NavbarUser.pricingText",
                  })}
                </Link>
              </TextButton>

              <TextButton>
                <Link
                  style={{ color: "var(--primaryColor)" }}
                  to={memberRoutes.uploadDocument}
                >
                  {intl.formatMessage({
                    id: "NavbarUser.uploadDocumentText",
                  })}
                </Link>
              </TextButton>
              <IconButton onClick={handleClick} size="small">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 48,
                    height: 48,
                    backgroundColor: "var(--colorBoldSecondary)",
                    borderRadius: "50%",
                  }}
                >
                  {currentUser.firstName
                    .charAt(0)
                    .toUpperCase()
                    .concat(".", currentUser.lastName.charAt(0).toUpperCase())}
                </Box>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => navigate(memberRoutes.profile)}>
                  {intl.formatMessage({
                    id: "NavbarUser.myProfileText",
                  })}
                </MenuItem>
                <MenuItem onClick={() => navigate(memberRoutes.changePassword)}>
                  {intl.formatMessage({
                    id: "NavbarUser.updatePasswordText",
                  })}
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleClickOnLogout}>
                  {intl.formatMessage({
                    id: "NavbarUser.logoutText",
                  })}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button variant="text" onClick={() => navigate(memberRoutes.pricing)}>
                {intl.formatMessage({ id: "NavbarUser.pricingText" })}
              </Button>
              <Button variant="text" onClick={() => navigate("/login")}>
                {intl.formatMessage({ id: "NavbarUser.loginText" })}
              </Button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavbarUser;
