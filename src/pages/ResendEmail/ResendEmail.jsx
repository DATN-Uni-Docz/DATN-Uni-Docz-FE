import { toast } from "react-toastify";
import { resendEmail } from "../../api/user";
import InformationImage from "../../assets/information.png";

import styles from "./ResendEmail.module.css";
import { useNavigate } from "react-router-dom";

const ResendEmail = () => {
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();
  const handleResendEmail = async () => {
    const response = await resendEmail(email);
    if (response) {
      toast.success(response.message);
    } else {
      toast.error("Failed to resend email");
    }
  };

  return (
    <>
      <div className={styles.confirmContainer}>
        <div className={styles.imageContainer}>
          <img
            src={InformationImage}
            alt="Information"
            className={styles.imageStyle}
          />
        </div>
        <div className={styles.title}>Email Confirmation Required</div>
        <div className={styles.subtitle}>
          Please confirm your email address to complete the registration
          process. Check your mailbox and follow the link provided.
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.buttonLogin}
            onClick={() => navigate("/login")}
          >
            Back to login
          </button>
          <button className={styles.buttonStyle} onClick={handleResendEmail}>
            Resend email
          </button>
        </div>
      </div>
    </>
  );
};

export default ResendEmail;
