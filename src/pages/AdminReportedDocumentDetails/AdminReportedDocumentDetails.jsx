import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminReportedDocumentDetailsForm from "./components/AdminReportedDocumentDetailsForm.jsx";
import { useEffect, useMemo, useState } from "react";
import handleError from "../../utils/handleError.js";
import { toast } from "react-toastify";
import {
  AUTO_CLOSE_TOAST_DURATION,
  REPORT_STATUS,
  TABLE_LIMIT,
} from "../../constants/index.js";
import {
  getReportListByDocumentId,
} from "../../api/report/index.js";
import { getDocumentById, resolveDocumentReport } from "../../api/document/index.js";
import queryString from "query-string";
import css from "./AdminReportedDocumentDetails.module.css";
import CustomTable from "../../components/CustomTable/CustomTable.jsx";
import TableSkeleton from "../../components/TableSkeleton/TableSkeleton.jsx";
import { PrimaryButton, PrimaryOutlineButton } from "../../components/CustomButton/CustomButton.jsx";
import useBoolean from "../../hook/useBoolean.js";
import CustomModal from "../../components/CustomModal/CustomModal.jsx";

const tableColumns = (intl) => [
  {
    name: "id",
    label: intl.formatMessage({
      id: "AdminReportList.reportGroupTable.idColumn",
    }),
    render: ({ id }) => id,
  },
  {
    name: "reportType",
    label: intl.formatMessage({
      id: "AdminReportList.reportGroupTable.reportTypeColumn",
    }),
    render: ({ reportType }) => reportType,
  },
  {
    name: "reporterId",
    label: intl.formatMessage({
      id: "AdminReportList.reportGroupTable.reporterIdColumn",
    }),
    render: ({ reporterId }) => reporterId,
  },
  {
    name: "status",
    label: intl.formatMessage({
      id: "AdminReportList.reportGroupTable.statusColumn",
    }),
    render: ({ status }) => status,
  },
  {
    name: "updatedAt",
    label: intl.formatMessage({
      id: "AdminReportList.reportGroupTable.updatedAtColumn",
    }),
    render: ({ updatedAt }) =>
      intl.formatDate(updatedAt, {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
  },
];

const AdminReportedDocumentDetails = () => {
  const { documentId } = useParams();
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState(null);
  const [data, setData] = useState([]);
  const [paginationMetadata, setPaginationMetadata] = useState(null);
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
  const intl = useIntl();
  const resolveReportModal = useBoolean();
  const [currentSelectedResolveOption, setCurrentSelectedResolveOption] = useState(null);
  const { page = 1 } = queryParams;

  const initialDocumentValues = useMemo(() => {
    const { id, status, title } = document || {};
    return {
      id,
      status,
      title,
    };
  }, [document]);

  const fetchDocumentData = async () => {
    try {
      setLoading(true);
      const response = await getDocumentById(documentId);
      if (response) {
        setDocument(response);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
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

  const handleGetReportList = async () => {
    try {
      setLoading(true);
      const response = await getReportListByDocumentId(documentId, {
        limit: TABLE_LIMIT,
        page,
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
    } catch (error) {
      handleError(error);
      toast.error(
        intl.formatMessage({ id: "AdminReportedDocumentDetails.fetchError" }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewReportDetails = (item) => {
    return navigate(`/admin/report/${item.id}`);
  };

  const handleOpenResolveReportModal = (option) => () => {
    setCurrentSelectedResolveOption(option);
    resolveReportModal.setTrue();
  }

  const handleResolveReport = (option) => async () => {
    try {
      const response = await resolveDocumentReport(documentId, {
        reportStatus: option
      })
      if (response) {
        toast.success(
          intl.formatMessage({ id: "AdminReportedDocumentDetails.resolveSuccess" }),
          {
            autoClose: AUTO_CLOSE_TOAST_DURATION,
          }
        );
        fetchDocumentData();
        handleGetReportList();
        resolveReportModal.setFalse();
      }
    }
    catch (error) {
      handleError(error);
      toast.error(
        intl.formatMessage({ id: "AdminReportedDocumentDetails.resolveError" }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    }
  }

  const renderResolveReportContent = (option) => {
    switch (option) {
      case REPORT_STATUS.APPROVED:
        return intl.formatMessage({ id: "AdminReportedDocumentDetails.resolveReportModal.approvedContent" });
      case REPORT_STATUS.REJECTED:
        return intl.formatMessage({ id: "AdminReportedDocumentDetails.resolveReportModal.rejectedContent" });
      default:
        return null;
  }
  };

  useEffect(() => {
    fetchDocumentData();
  }, [documentId]);

  useEffect(() => {
    handleGetReportList();
  }, [page]);

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "500", fontSize: "28px" }}
      >
        {intl.formatMessage({ id: "AdminReportedDocumentDetails.title" })}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "400", color: "var(--colorGrey400)", mb: 4 }}
      >
        {intl.formatMessage({ id: "AdminReportedDocumentDetails.subtitle" })}
      </Typography>
      <AdminReportedDocumentDetailsForm
        initialValues={{ ...initialDocumentValues }}
        onSubmit={() => {}}
      />
      <CustomTable
        tableColumns={tableColumns(intl)}
        data={data}
        // onSetOrder={handleSetOderBy}
        // order={order}
        // sortBy={sortBy}
        viewAction={handleViewReportDetails}
        page={page}
        onPageChange={handleOnChangePage}
        className={css.tableWrapper}
        {...paginationMetadata}
      />
      <Box sx={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center", mt: 3 }}>
        <PrimaryOutlineButton
          onClick={handleOpenResolveReportModal(REPORT_STATUS.REJECTED)}
        >
          {intl.formatMessage({
            id: "AdminReportedDocumentDetails.rejectButton",
          })}
        </PrimaryOutlineButton>
        <PrimaryButton
          onClick={handleOpenResolveReportModal(REPORT_STATUS.APPROVED)}
        >
          {intl.formatMessage({
            id: "AdminReportedDocumentDetails.approveButton",
          })}
        </PrimaryButton>
      </Box>
      <CustomModal
        isOpen={resolveReportModal.value}
        handleClose={resolveReportModal.setFalse}
        title={intl.formatMessage({
          id: "AdminReportedDocumentDetails.resolveReportModal.title",
        })}
        handleAction={handleResolveReport(currentSelectedResolveOption)}
      >
        <Typography variant="body1">
          {renderResolveReportContent(currentSelectedResolveOption)}
        </Typography>
      </CustomModal>
    </Box>
  );
};

export default AdminReportedDocumentDetails;
