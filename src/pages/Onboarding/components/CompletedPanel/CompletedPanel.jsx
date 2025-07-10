import { Box, Typography } from "@mui/material";
import logo from "../../../../assets/uniDoczLogo.png";
import css from "./CompletedPanel.module.css";
import { Favorite } from "@mui/icons-material";

const CompletedPanel = (props) => {
  const { intl } = props;
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" align="center" sx={{ fontWeight: "500", mt: 2.5, mb: 1.5}}>
        {intl.formatMessage({ id: "Onboarding.completed.title" })}
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{ fontSize: "18px", color: "var(--colorGrey600)" }}
      >
        {intl.formatMessage({ id: "Onboarding.completed.subtitle" })}
      </Typography>
      <Favorite sx={{color: "var(--primaryColor)", fontSize: "80px", mt: 2}}/>
    </Box>
  );
};

export default CompletedPanel;
