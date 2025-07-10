import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackButton = ({style}) => {
    const navigate = useNavigate();
    return (
        <Button
            sx={{ backgroundColor: "var(--admin-color)", color: "#fff", ...style }}
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={()=>navigate(-1)}
        >
            Back
        </Button>
    )
}

export default BackButton;