import { Form } from "react-final-form";
import css from "../PublicDocumentDetails.module.css";
import { TextField } from "mui-rff";
import { composeValidators, maxLength, required } from "../../../utils/validator";
import { PrimaryButton } from "../../../components/CustomButton/CustomButton";
import { Create } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import classNames from "classnames";
import anonymousAvatar from "../../../assets/anonymousAvatar.png";

const MAX_LENGTH_TEXT_FIELD = 200;

const CommentFormComponent = (props) => {
  const { handleSubmit, intl, className, currentUser, isAuthenticated, submitting } = props;

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(css.commentFormWrapper, className)}
    >
      <Typography variant="h6">
        {intl.formatMessage({
          id: "PublicDocumentDetails.CommentForm.title",
        })}
      </Typography>
      <Box sx={{ display: "flex", gap: "16px" }}>
        {isAuthenticated ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
              backgroundColor: "var(--colorBoldSecondary)",
              borderRadius: "50%",
            }}
          >
            {currentUser?.firstName
              ?.charAt(0)
              ?.toUpperCase()
              ?.concat(".", currentUser?.lastName?.charAt(0)?.toUpperCase())}
          </Box>
        ) : (
          <Avatar
            alt="Anonymous Avatar"
            src={anonymousAvatar}
            sx={{ width: 50, height: 50 }}
          />
        )}
        <TextField
          name="content"
          placeholder={intl.formatMessage({
            id: "PublicDocumentDetails.CommentForm.contentPlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "PublicDocumentDetails.CommentForm.requiredField",
                })
              ),
              maxLength(
                intl.formatMessage(
                  {
                    id: "PublicDocumentDetails.CommentForm.maxLength",
                  },
                  {
                    maxLength: MAX_LENGTH_TEXT_FIELD,
                  }
                ),
                MAX_LENGTH_TEXT_FIELD
              )
            ),
          }}
          autoComplete="off"
          multiline
          rows={4}
        />
      </Box>
      <Box sx={{ textAlign: "right" }}>
        <PrimaryButton
          startIcon={<Create />}
          type="submit"
          fullWidth
          sx={{ py: 1, width: "fit-content", px: 2.5, mt: 0 }}
          loading={submitting}
        >
          {intl.formatMessage({
            id: "PublicDocumentDetails.CommentForm.submitButton",
          })}
        </PrimaryButton>
      </Box>
    </form>
  );
};

const CommentForm = (props) => {
  return <Form {...props} component={CommentFormComponent} />;
};

export default CommentForm;
