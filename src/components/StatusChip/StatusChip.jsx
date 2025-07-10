import { Chip } from "@mui/material";
import React from "react";
import { STATUS_STYLES } from "../../config/status"


function StatusChip({ label, status, style, ...props }) {
  const { backgroundColor, color } = STATUS_STYLES[status] || {};

  return (
    <Chip
      {...props}
      label={status ? status : label}
      sx={{
        ".MuiChip-label": {
          p: 2,
        },
        backgroundColor: status ? backgroundColor : '',
        color:  status ? color : '',
        minWidth: '110px',
        ...style,
      }}
    />
  );
}

export default StatusChip;
