import { string } from "prop-types";

const ErrorMessage = ({ content }) => {
  if (!content) return;
  return (
    <div
      style={{
        color: "var(--colorFailed)",
        marginTop: "5px",
        marginBottom: "5px",
      }}
    >
      {content}
    </div>
  );
};

ErrorMessage.propTypes = {
  content: string,
};

export default ErrorMessage;
