import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import ProfileForm from "./components/ProfileForm";
import { handleUpdateProfile } from "../../api/personal";
import { toast } from "react-toastify";
import { AUTO_CLOSE_TOAST_DURATION, LIMIT_SUGGESTION } from "../../constants";
import handleError from "../../utils/handleError";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../redux/selector";
import { getUniversityListForMember } from "../../api/university";

const Profile = () => {
  const intl = useIntl();
  const currentUser = useSelector(userInfoSelector)
  const [loading, setLoading] = useState(false);
  const [universityOptions, setUniversityOptions] = useState([]);
  const initialValues = useMemo(() => {
    const { email, firstName, lastName, universityId } = currentUser || {};
    return {
      email,
      firstName,
      lastName,
      universityId,
    };
  }, [currentUser])

  const handleGetUniversityList = async (keyword) => {
    try {
      const response = await getUniversityListForMember(
        {
          keyword: keyword ?? "",
          limit: LIMIT_SUGGESTION,
        }
      )
      setUniversityOptions([...(response ? response.results : [])]);
    }
    catch(err) {
      handleError(err)
    }
  }

  const updateProfile = async (values) => {
    try {
      const {firstName, lastName, universityId } = values || {};
      await handleUpdateProfile({
        firstName,
        lastName,
        universityId
      })
      toast.success(intl.formatMessage({ id: "ProfilePage.updateSuccess" }), {
        autoClose: AUTO_CLOSE_TOAST_DURATION,
      });
    } catch (error) {
      toast.error(
        intl.formatMessage({ id: "ProfilePage.updateError" }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      )
      handleError(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    setUniversityOptions([
      {
        id: currentUser?.universityId,
        name: currentUser?.university?.name || "",
      },
    ]);
    setLoading(false);
  }, [currentUser]);

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "500", fontSize: "28px" }}
      >
        {intl.formatMessage({ id: "ProfilePage.title" })}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "400", color: "var(--colorGrey400)" }}
      >
        {intl.formatMessage({ id: "ProfilePage.subtitle" })}
      </Typography>
      <Box
        sx={{
          boxShadow: 1,
          borderRadius: 3,
          height: "100%",
          padding: "30px",
          backgroundColor: "var(--colorWhite)",
          marginTop: "20px",
        }}
      >
        {!loading && (
          <ProfileForm
            handleOnInputUniversity={handleGetUniversityList}
            universityOptions={universityOptions}
            onSubmit={updateProfile}
            initialValues={initialValues}
          />
        )}
      </Box>
    </Box>
  );
}

export default Profile;