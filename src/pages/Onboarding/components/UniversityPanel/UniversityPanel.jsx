import { useEffect, useMemo, useState } from "react";
import UniversityForm from "./UniversityForm";
import { getUniversityListForMember } from "../../../../api/university";
import { LIMIT_SUGGESTION } from "../../../../constants";
import handleError from "../../../../utils/handleError";
import { handleUpdateProfile } from "../../../../api/personal";

const UniversityPanel = (props) => {
  const { intl, currentUser, formRef, handleNavigateToNextTab } = props;
  const [universityOptions, setUniversityOptions] = useState([]);

  const initialValues = useMemo(() => {
    const { universityId } = currentUser || {};
    return {
      universityId: universityId,
    };
  }, [currentUser]);

  const onSubmit = async (values) => {
    try {
      const { universityId } = values;
      await handleUpdateProfile({ universityId });
      handleNavigateToNextTab();
    } catch (error) {
      handleError(error);
    }
  };

  const handleGetUniversityList = async (keyword) => {
    try {
      const response = await getUniversityListForMember({
        keyword: keyword ?? "",
        limit: LIMIT_SUGGESTION,
      });
      setUniversityOptions(response?.results || []);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    const { university } = currentUser || {};
    const { id, name } = university || {};
    if (id && name) {
      setUniversityOptions([
        {
          id,
          name,
        },
      ]);
    }
  }, [currentUser]);
  return (
    <UniversityForm
      onSubmit={onSubmit}
      formRef={formRef}
      initialValues={initialValues}
      intl={intl}
      universityOptions={universityOptions}
      handleOnInputUniversity={handleGetUniversityList}
    />
  );
};

export default UniversityPanel;
