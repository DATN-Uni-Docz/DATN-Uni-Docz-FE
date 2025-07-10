const handleError = (error) => {
  const { message } = error?.response?.data?.data || {};
  console.error("Error message:", message || error);
};

const getError = (error) => {
  const { message } = error?.response?.data?.data || {};
  return message || "Something went wrong. Please try again later.";
}

export {
  getError
}

export default handleError;