import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PrimaryButton, PrimaryOutlineButton } from "../CustomButton/CustomButton";
import { useIntl } from "react-intl";

const CustomModal = ({ children, title, isOpen, handleClose, handleAction }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const intl = useIntl();
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px",
          minWidth: "350px",
          padding: "24px 28px",
        },
      }}
      fullScreen={fullScreen}
    >
      <DialogTitle
        sx={{ m: 0, p: 0, mb: 2.5, position: "relative" }}
        id="customized-dialog-title"
      >
        {title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      {/* <Divider/> */}

      <DialogContent sx={{ p: 0 }}>{children}</DialogContent>
      {handleAction && (
        <Box
          sx={{
            mt: 3,
            mb: 1,
            display: "flex",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PrimaryOutlineButton sx={{ height: "40px" }} onClick={handleClose}>
            {intl.formatMessage({
              id: "CustomModal.cancelButton",
            })}
          </PrimaryOutlineButton>
          <PrimaryButton
            onClick={handleAction}
            sx={{
              height: "40px",
            }}
          >
            {intl.formatMessage({
              id: "CustomModal.confirmButton",
            })}
          </PrimaryButton>
        </Box>
      )}
    </Dialog>
  );
};

export default CustomModal;
