import { Link } from "@mui/material";

const ButtonLink = ({children, onClick, style, active}) => {
    return (
        <Link
            component="button"
            variant="body2"
            onClick={onClick}
            sx={{
                textDecoration: active ? null : "none",
                textDecorationColor: active ? "var(--admin-color)" : null,
                color: "var(--admin-color)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                ...style,
            }}
        >
            {children}
        </Link>
    );
};

export default ButtonLink
