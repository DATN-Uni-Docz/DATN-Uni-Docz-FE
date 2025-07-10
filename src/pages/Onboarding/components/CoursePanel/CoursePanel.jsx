import { useEffect, useMemo, useState } from "react";
import CourseForm from "./CourseForm.jsx";
import { getUniversityListForMember } from "../../../../api/university";
import { LIMIT_SUGGESTION } from "../../../../constants";
import handleError from "../../../../utils/handleError";
import { updateFavouriteCourseList } from "../../../../api/personal";

const CoursePanel = (props) => {
  const {
    intl,
    formRef,
    handleNavigateToNextTab,
    favouriteCoursesList,
  } = props;

  const initialValues = useMemo(() => {
    return {
      courseIds: favouriteCoursesList?.map((item) => item.courseId) || [],
    }
  }, [JSON.stringify(favouriteCoursesList)]);

  const onSubmit = async (values) => {
    try {
      await updateFavouriteCourseList(values);
      handleNavigateToNextTab();
    }
    catch (error) {
      handleError(error);
    }
  };

  return (
    <CourseForm
      onSubmit={onSubmit}
      formRef={formRef}
      initialValues={initialValues}
      intl={intl}
      initialCourses={favouriteCoursesList.map(item => item.course )}
    />
  );
};

export default CoursePanel;
