import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { createUniversityForAdmin, deleteUniversity, getUniversityListForAdmin } from "../../api/university";
import handleError from "../../utils/handleError";
import { AUTO_CLOSE_TOAST_DURATION, LIMIT_SUGGESTION, TABLE_LIMIT, TIMEOUT_LOADING, UNIVERSITY_STATUS } from "../../constants";
import CustomTable from "../../components/CustomTable/CustomTable";
import SearchInputForm from "../../components/SearchInputForm/SearchInputForm";
import css from "./AdminUniversityList.module.css";
import TableSkeleton from "../../components/TableSkeleton/TableSkeleton";
import { toast } from "react-toastify";
import useBoolean from "../../hook/useBoolean";
import CustomModal from "../../components/CustomModal/CustomModal";
import CreateUniversityForm from "../../components/CreateUniversityForm/CreateUniversityForm";
import { PrimaryButton } from "../../components/CustomButton/CustomButton";
import AddIcon from '@mui/icons-material/Add';

const tableColumns = (intl) => [
  {
    name: "name",
    label: intl.formatMessage({
      id: "AdminUniversityList.table.nameColumn",
    }),
    render: ({ name }) => name,
  },
  {
    name: "nameEn",
    label: intl.formatMessage({
      id: "AdminUniversityList.table.nameEnColumn",
    }),
    render: ({ nameEn }) => nameEn,
  },
  {
    name: "courseCount",
    label: intl.formatMessage({
      id: "AdminUniversityList.table.courseCountColumn",
    }),
    render: ({ courseCount }) => courseCount,
  },
  {
    name: "documentCount",
    label: intl.formatMessage({
      id: "AdminUniversityList.table.documentCountColumn",
    }),
    render: ({ documentCount }) => documentCount,
  },
  {
    name: "studentCount",
    label: intl.formatMessage({
      id: "AdminUniversityList.table.studentCountColumn",
    }),
    render: ({ studentCount }) => studentCount,
  },
  {
    name: "status",
    label: intl.formatMessage({
      id: "AdminUniversityList.table.statusColumn",
    }),
    render: ({ status }) => status,
  },
];

const ALL = "ALL";

const UNIVERSITY_STATUS_CONFIG = {
  [ALL]: ALL,
  ...UNIVERSITY_STATUS
}

const AdminUniversityList = () => {
  const intl = useIntl();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationMetadata, setPaginationMetadata] = useState(null);
  const [currentItemDeleted, setCurrentItemDeleted] = useState(null);
  const createUniversityModal = useBoolean();
  const deleteUniversityModal = useBoolean();
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
  const { keyword, page = 1, status = ALL } = queryParams;

  const onSearch = async (values) => {
    const { search } = values;
    const params = queryString.stringify({
      keyword: search,
      ...(
        status && status !== ALL && {
          status: UNIVERSITY_STATUS_CONFIG[status],
        }
      )
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
      const response = await getUniversityListForAdmin({
        page: 1,
        limit: LIMIT_SUGGESTION,
        keyword: value || "",
      });
      if (response) {
        const { results } = response;
        setSearchOptions(
          results.length > 0
            ? results.map((item) => ({
                value: item.name,
              }))
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
      const response = await getUniversityListForAdmin({
        limit: TABLE_LIMIT,
        keyword: keyword || "",
        page,
        ...(status &&
          status !== ALL && {
            status: UNIVERSITY_STATUS_CONFIG[status],
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

  const handleViewUniversityDetails = (item) => {
    return navigate(`/admin/university/${item.id}`);
  }

  const handleOpenDeleteUniversityModal = (item) => {
    setCurrentItemDeleted(item);
    deleteUniversityModal.setTrue();
  }

  const handleDeleteUniversity = async (item) => {
    try {
      await deleteUniversity(item.id);
      toast.success(
        intl.formatMessage({
          id: "AdminUniversityList.deleteUniversitySuccess",
        }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
      await fetchData();
      deleteUniversityModal.setFalse();
    } catch (err) {
      handleError(err);
      toast.error(intl.formatMessage({
        id: "AdminUniversityList.deleteErrorMessage",
      }), {
        autoClose: AUTO_CLOSE_TOAST_DURATION,
      })
    }
  }

  const handleCreateUniversity = async (values) => {
    try {
      await createUniversityForAdmin(values);
      toast.success(intl.formatMessage({
        id: "AdminUniversityList.createUniversitySuccess",
      }), {
        autoClose: AUTO_CLOSE_TOAST_DURATION,
      });
      createUniversityModal.setFalse();
      await fetchData();
    }
    catch (err) {
      handleError(err);
      toast.error(intl.formatMessage({
        id: "AdminUniversityList.errorMessage",
      }), {
        autoClose: AUTO_CLOSE_TOAST_DURATION,
      })
    }
  }

  useEffect(() => {
    fetchData();
    handleOnInputChange(null, keyword);
  }, [keyword, page, status]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3
        }}
      >
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "500", fontSize: "28px" }}
          >
            {intl.formatMessage({ id: "AdminUniversityList.title" })}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "400", color: "var(--colorGrey400)"}}
          >
            {intl.formatMessage({ id: "AdminUniversityList.subtitle" })}
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
              {Object.entries(UNIVERSITY_STATUS_CONFIG).map(
                ([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <PrimaryButton
            onClick={createUniversityModal.setTrue}
            sx={{ mb: 2 }}
            startIcon={<AddIcon />}
          >
            {intl.formatMessage({
              id: "AdminUniversityList.createUniversityButton",
            })}
          </PrimaryButton>
        </Box>
      </Box>
      <SearchInputForm
        className={css.searchInputWrapper}
        onSubmit={onSearch}
        searchPlaceholderText={intl.formatMessage({
          id: "AdminUniversityList.searchPlaceholder",
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
          viewAction={handleViewUniversityDetails}
          page={page}
          onPageChange={handleOnChangePage}
          className={css.tableWrapper}
          {...paginationMetadata}
        />
      ) : (
        <TableSkeleton className={css.tableWrapper} />
      )}
      <CustomModal
        isOpen={createUniversityModal.value}
        handleClose={createUniversityModal.setFalse}
        title={intl.formatMessage({
          id: "AdminUniversityList.createUniversityModalTitle",
        })}
      >
        <CreateUniversityForm onSubmit={handleCreateUniversity} />
      </CustomModal>
      <CustomModal
        isOpen={deleteUniversityModal.value}
        handleClose={deleteUniversityModal.setFalse}
        title={intl.formatMessage({
          id: "AdminUniversityList.deleteUniversityModalTitle",
        })}
        handleAction={() => handleDeleteUniversity(currentItemDeleted)}
      >
        <Typography variant="body1">
          {intl.formatMessage(
            {
              id: "AdminUniversityList.deleteUniversityModalContent",
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

export default AdminUniversityList;
