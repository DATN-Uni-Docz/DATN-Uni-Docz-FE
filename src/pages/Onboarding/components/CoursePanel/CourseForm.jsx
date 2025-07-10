import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useImperativeHandle, useState } from "react";
import { Form } from "react-final-form";
import { Checkboxes } from "mui-rff";
import {
  composeValidators,
  maxLength,
  required,
} from "../../../../utils/validator";
import { getCourseListForMember } from "../../../../api/course";
import handleError from "../../../../utils/handleError";

const MAX_LENGTH_TEXT_FIELD = 50;

const CourseFormComponent = (props) => {
  const {
    handleSubmit,
    submitting,
    errorMessage,
    className,
    intl,
    formRef,
    form,
    values,
    initialCourses,
  } = props;
  const [filteredCourses, setFilteredCourses] = useState(initialCourses || []);
  const { courseIds: selectedCourseIds = [] } = values || {};
  const [selectedCourses, setSelectedCourses] = useState([]);

  useImperativeHandle(formRef, () => form);

  const handleToggleCourse = (courseId) => {
    const currentIndex = selectedCourseIds.indexOf(courseId);
    const newSelectedCourseIds = [...selectedCourseIds];

    if (currentIndex === -1) {
      newSelectedCourseIds.push(courseId);
    } else {
      newSelectedCourseIds.splice(currentIndex, 1);
    }

    form.change("courseIds", newSelectedCourseIds);
  };

  const handleOnChangeCourse = async (value) => {
    try {
      const response = await getCourseListForMember({
        limit: 2,
        keyword: value || "",
      });
      setFilteredCourses(response.results);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    if(initialCourses?.length === 0) {
      handleOnChangeCourse();
    } else {
      setFilteredCourses(initialCourses);
    }
  }, [initialCourses]);

  useEffect(() => {
    setSelectedCourses((prev) => {
      const { currentCourseIds: _, newCourseIds } = selectedCourseIds.reduce(
        (acc, courseId) => {
          if (prev.includes(courseId)) {
            acc.currentCourseIds.push(courseId);
          } else {
            acc.newCourseIds.push(courseId);
          }
          return acc;
        },
        { currentCourseIds: [], newCourseIds: [] }
      );
      const newSelectedCourses = newCourseIds
        .map((courseId) => {
          const course = filteredCourses.find((c) => c.id === courseId);
          return course ? course : null;
        })
        .filter(Boolean);
      return [...prev, ...newSelectedCourses];
    });
  }, [JSON.stringify(selectedCourseIds), JSON.stringify(filteredCourses)]);

  const formatCourseLabel = (course, formatColor = false) => {
    return (
      <Typography
        variant="body1"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyItems: "center",
          columnGap: "4px",
          rowGap: "10px",
        }}
      >
        {course.name}
        <Typography
          sx={{
            ...(formatColor && {
              color: "var(--colorGrey400)",
            }),
          }}
        >
          {intl.formatMessage(
            {
              id: "Onboarding.courseForm.universityLabel",
            },
            {
              name: course?.university?.name,
            }
          )}
        </Typography>
      </Typography>
    );
  }

  return (
    <form
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      onSubmit={handleSubmit}
      autoComplete="off"
      className={className}
    >
        <Box>
          <TextField
            name="keyword"
            label={intl.formatMessage({
              id: "Onboarding.courseForm.keywordLabel",
            })}
            placeholder={intl.formatMessage({
              id: "Onboarding.courseForm.keywordPlaceholder",
            })}
            variant="outlined"
            fullWidth
            fieldProps={{
              validate: composeValidators(
                maxLength(
                  intl.formatMessage(
                    {
                      id: "Onboarding.courseForm.maxLength",
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
            onChange={(e) => {
              const value = e.target.value;
              handleOnChangeCourse(value);
            }}
          />

          {selectedCourseIds.length > 0 && (
            <Box sx={{ mt: 3.5, mb: 1.5 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 500 }}
              >
                {
                  intl.formatMessage({
                    id: "Onboarding.courseForm.selectedCourses",
                  }, {
                    count: selectedCourseIds.length,
                  })
                }
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1.5 }}>
                {selectedCourseIds.map((courseId) => {
                  const course = selectedCourses.find((c) => c.id === courseId);
                  if (!course) return null;
                  return (
                    <Chip
                      key={courseId}
                      label={formatCourseLabel(course)}
                      onDelete={() => handleToggleCourse(courseId)}
                      color="primary"
                      variant="outlined"
                      sx={{ p: "16px 6px", fontSize: "14px" }}
                    />
                  );
                })}
              </Box>
            </Box>
          )}

          <Typography variant="body1" sx={{ mt: 3.5, mb: 1.5, fontWeight: 500 }}>
            {intl.formatMessage({
              id: "Onboarding.courseForm.searchResults",
            })}
          </Typography>
          {filteredCourses.length > 0 ? (
            <Checkboxes
              name="courseIds"
              data={filteredCourses.map((course) => ({
                label: formatCourseLabel(course, true),
                value: course.id,
              }))}
              sx={{
                "& .MuiFormGroup-root": {
                  display: "flex",
                  justifyItems: "center",
                  flexWrap: "wrap",
                  columnGap: "20px",
                  rowGap: "20px",
                  flexDirection: "row",
                },
              }}
            />
          ) : (
            intl.formatMessage({
              id: "Onboarding.courseForm.noCoursesFound",
            })
          )}
      </Box>
    </form>
  );
};

const CourseForm = (props) => {
  return <Form {...props} component={CourseFormComponent} />;
};

export default CourseForm;
