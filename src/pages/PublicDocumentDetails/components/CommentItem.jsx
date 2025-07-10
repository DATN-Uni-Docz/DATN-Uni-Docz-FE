import { Box, Typography } from "@mui/material";
import { SHORT_DATE_FORMAT } from "../../../constants";

const CommentItem = (props) => {
  const { comment, intl } = props;
  const { user, content, createdAt } = comment || {};
  const { firstName, lastName } = user || {};

  return (
    <Box sx={{ display: "flex", gap: "16px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: 50,
          height: 50,
          backgroundColor: "var(--colorBoldSecondary)",
          borderRadius: "50%",
        }}
      >
        {firstName
          ?.charAt(0)?.toUpperCase()
          ?.concat(".", lastName?.charAt(0)?.toUpperCase())}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {firstName} {lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: "6px" }}>
            {intl.formatDate(createdAt, SHORT_DATE_FORMAT)}
          </Typography>
        </Box>
        <Typography variant="body1">
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

export default CommentItem;
