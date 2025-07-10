import { Box, Typography } from "@mui/material";

const SubscriptionAnalyticsItem = (props) => {
  const { title, value, description, icon } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "20px",
        p: 3,
        backgroundColor: "var(--secondaryColor)",
        borderRadius: "10px",
        boxShadow: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "500", fontSize: "18px" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" sx={{ color: "var(--primaryColor)" }}>
          {value}
        </Typography>
        <Typography variant="body1" sx={{ color: "var(--colorGrey400)" }}>
          {description}
        </Typography>
      </Box>
      {icon}
    </Box>
  );
}

export default SubscriptionAnalyticsItem;