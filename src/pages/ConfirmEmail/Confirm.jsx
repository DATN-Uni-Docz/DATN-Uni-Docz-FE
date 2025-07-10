import { useEffect, useState } from "react";
import SuccessImage from "../../assets/success.png";
import ErrorImage from "../../assets/error.png";
import styles from "./Confirm.module.css";
import { confirmAccount } from "../../api/user";
import { useNavigate } from "react-router-dom";

const Confirm = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const [dataUser, setDataUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getDataConfirmAccount = async (token) => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await confirmAccount(token);
      const { user } = response;
      if (user?.status === "ACTIVE") {
        setDataUser(user);
        setError(null);
      }
    } catch (error) {
      setError(error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataConfirmAccount(token);
  }, [token]);

  if(loading) return null;

  return (
    <>
      {dataUser ? (
        <div className={styles.confirmContainer}>
          <div className={styles.imageContainer}>
            <img
              src={SuccessImage}
              alt="Success"
              className={styles.imageStyle}
            />
          </div>
          <div className={styles.title}>Welcome, {dataUser?.email}</div>
          <div className={styles.subtitle}>
            Your account has been successfully confirmed. You can now log in.
          </div>
          <div>
            <button
              className={styles.buttonStyle}
              onClick={() => navigate("/login")}
            >
              Go to login
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.confirmContainer}>
          <div className={styles.imageContainer}>
            <img src={ErrorImage} alt="Error" className={styles.imageStyle} />
          </div>
          <div className={styles.title}>Confirmation Error</div>
          <div className={styles.subtitle}>
            There was an issue confirming your account. Please try again or
            contact support.
          </div>
        </div>
      )}
    </>
  );
};

export default Confirm;
