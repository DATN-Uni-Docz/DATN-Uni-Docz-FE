import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createCourseForAdmin,
  deleteCourse,
  getCourseListForAdmin,
} from "../../api/course";
import handleError from "../../utils/handleError";
import {
  AUTO_CLOSE_TOAST_DURATION,
  LIMIT_SUGGESTION,
  TABLE_LIMIT,
  COURSE_STATUS,
  TIMEOUT_LOADING,
} from "../../constants";
import CustomTable from "../../components/CustomTable/CustomTable";
import SearchInputForm from "../../components/SearchInputForm/SearchInputForm";
import css from "./AdminCourseList.module.css";
import TableSkeleton from "../../components/TableSkeleton/TableSkeleton";
import { toast } from "react-toastify";
import useBoolean from "../../hook/useBoolean";
import CustomModal from "../../components/CustomModal/CustomModal";
import { PrimaryButton } from "../../components/CustomButton/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import CreateCourseForm from "../../components/CreateCourseForm/CreateCourseForm";
import { getUniversityListForAdmin } from "../../api/university";

const tableColumns = (intl) => [
  {
    name: "name",
    label: intl.formatMessage({
      id: "AdminCourseList.table.nameColumn",
    }),
    render: ({ name }) => name,
  },
  {
    name: "university",
    label: intl.formatMessage({
      id: "AdminCourseList.table.universityColumn",
    }),
    render: ({ university }) => university.name,
  },
  {
    name: "documentCount",
    label: intl.formatMessage({
      id: "AdminCourseList.table.documentCountColumn",
    }),
    render: ({ documentCount }) => documentCount,
  },
  {
    name: "saveCount",
    label: intl.formatMessage({
      id: "AdminCourseList.table.saveCountColumn",
    }),
    render: ({ saveCount }) => saveCount,
  },
  {
    name: "status",
    label: intl.formatMessage({
      id: "AdminCourseList.table.statusColumn",
    }),
    render: ({ status }) => status,
  },
];

const ALL = "ALL";

const COURSE_STATUS_CONFIG = {
  [ALL]: ALL,
  ...COURSE_STATUS,
};

const AdminCourseList = () => {
  const intl = useIntl();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationMetadata, setPaginationMetadata] = useState(null);
  const [currentItemDeleted, setCurrentItemDeleted] = useState(null);
  const createCourseModal = useBoolean();
  const deleteCourseModal = useBoolean();
  const [searchOptions, setSearchOptions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useMemo(() => {
    return queryString.parse(location.search, {
      arrayFormat: "comma",
      types: {
        page: "number",
      },
    });
  }, [location.search]);
  const [universityOptions, setUniversityOptions] = useState([]);
  const { keyword, page = 1, status = ALL } = queryParams;

  const onSearch = async (values) => {
    const { search } = values;
    const params = queryString.stringify({
      keyword: search,
      ...(status &&
        status !== ALL && {
          status: COURSE_STATUS_CONFIG[status],
        }),
    });
    navigate({
      pathname: location.pathname,
      search: params,
    });
  };

  const handleOnChangePage = (event, value) => {
    const params = queryString.stringify(
      {
        ...queryParams,
        page: value,
      },
      {
        arrayFormat: "comma",
      }
    );
    navigate({
      pathname: location.pathname,
      search: params,
    });
  };

  const handleOnInputChange = async (event, value) => {
    try {
      const response = await getCourseListForAdmin({
        page: 1,
        limit: LIMIT_SUGGESTION,
        keyword: value || "",
      });
      if (response) {
        const { results } = response;
        setSearchOptions(
          results.length > 0
            ? [
                ...results.map(({ name }) => ({
                  value: name,
                })),
              ]
            : []
        );
      }
    } catch (err) {
      handleError(err);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getCourseListForAdmin({
        limit: TABLE_LIMIT,
        keyword: keyword || "",
        page,
        ...(status &&
          status !== ALL && {
            status: COURSE_STATUS_CONFIG[status],
          }),
      });
      if (response) {
        const { results, page, limit, totalPages, totalResults } = response;

        setData(results);
        setPaginationMetadata({
          page,
          limit,
          totalPages,
          totalResults,
        });
      }
    } catch (err) {
      handleError(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, TIMEOUT_LOADING);
    }
  };

  const handleChangeStatus = (event) => {
    const { value } = event.target;
    const params = queryString.stringify({
      status: value,
      keyword,
    });
    navigate({
      pathname: location.pathname,
      search: params,
    });
  };

  const handleViewCourseDetails = (item) => {
    return navigate(`/admin/course/${item.id}`);
  };

  const handleOpenDeleteCourseModal = (item) => {
    setCurrentItemDeleted(item);
    deleteCourseModal.setTrue();
  };

  const handleDeleteCourse = async (item) => {
    try {
      await deleteCourse(item.id);
      toast.success(
        intl.formatMessage({
          id: "AdminCourseList.deleteCourseSuccess",
        }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
      await fetchData();
      deleteCourseModal.setFalse();
    } catch (err) {
      handleError(err);
      toast.error(
        intl.formatMessage({
          id: "AdminCourseList.deleteCourseErorMessage",
        }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    }
  };

  const handleCreateCourse = async (values) => {
    try {
      await createCourseForAdmin(values);
      toast.success(
        intl.formatMessage({
          id: "AdminCourseList.createUniversitySuccess",
        }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
      createCourseModal.setFalse();
      await fetchData();
    } catch (err) {
      handleError(err);
      toast.error(
        intl.formatMessage({
          id: "AdminCourseList.errorMessage",
        }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    }
  };

  const handleGetUniversityList = async (keyword) => {
    try {
      const response = await getUniversityListForAdmin({
        keyword: keyword ?? "",
        limit: LIMIT_SUGGESTION,
      });
      setUniversityOptions(response?.results);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchData();
    handleGetUniversityList();
    handleOnInputChange(null, keyword);
  }, [keyword, page, status]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "500", fontSize: "28px" }}
          >
            {intl.formatMessage({ id: "AdminCourseList.title" })}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "400", color: "var(--colorGrey400)" }}
          >
            {intl.formatMessage({ id: "AdminCourseList.subtitle" })}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "16px" }}>
          <FormControl>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              label="Status"
              value={status}
              onChange={handleChangeStatus}
              sx={{ width: "160px" }}
              size="small"
            >
              {Object.entries(COURSE_STATUS_CONFIG).map(([key, label]) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <PrimaryButton
            onClick={createCourseModal.setTrue}
            sx={{ mb: 2 }}
            startIcon={<AddIcon />}
          >
            {intl.formatMessage({
              id: "AdminCourseList.createCourseButton",
            })}
          </PrimaryButton>
        </Box>
      </Box>
      <SearchInputForm
        className={css.searchInputWrapper}
        onSubmit={onSearch}
        searchPlaceholderText={intl.formatMessage({
          id: "AdminCourseList.searchPlaceholder",
        })}
        options={[]}
        initialValues={{
          search: keyword,
        }}
      />
      {!loading ? (
        <CustomTable
          tableColumns={tableColumns(intl)}
          data={data}
          // onSetOrder={handleSetOderBy}
          // order={order}
          // sortBy={sortBy}
          viewAction={handleViewCourseDetails}
          page={page}
          onPageChange={handleOnChangePage}
          className={css.tableWrapper}
          {...paginationMetadata}
        />
      ) : (
        <TableSkeleton className={css.tableWrapper} />
      )}
      <CustomModal
        isOpen={createCourseModal.value}
        handleClose={createCourseModal.setFalse}
        title={intl.formatMessage({
          id: "AdminCourseList.createCourseModalTitle",
        })}
      >
        <CreateCourseForm
          handleOnInputUniversity={handleGetUniversityList}
          onSubmit={handleCreateCourse}
          universityOptions={universityOptions}
        />
      </CustomModal>
      <CustomModal
        isOpen={deleteCourseModal.value}
        handleClose={deleteCourseModal.setFalse}
        title={intl.formatMessage({
          id: "AdminCourseList.deleteCourseModalTitle",
        })}
        handleAction={() => handleDeleteCourse(currentItemDeleted)}
      >
        <Typography variant="body1">
          {intl.formatMessage(
            {
              id: "AdminCourseList.deleteCourseModalContent",
            },
            {
              id: <span className={css.deleted}>{currentItemDeleted?.id}</span>,
            }
          )}
        </Typography>
      </CustomModal>
    </Box>
  );
};

export default AdminCourseList;
