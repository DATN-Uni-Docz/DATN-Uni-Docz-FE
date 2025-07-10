import axiosInstance from "../../utils/axios";

const createPaymentLink = (data) => {
  return axiosInstance.post("/member/subscriptions/create-payment-link", data);
}

const getSubscriptionList = (params) => {
  return axiosInstance.get("/admin/subscriptions", { params });
}

const getSubscriptionById = (subscriptionId) => {
  return axiosInstance.get(`/admin/subscriptions/${subscriptionId}`);
}

const getSubscriptionByIdForMember = (subscriptionId) => {
  return axiosInstance.get(`/member/subscriptions/${subscriptionId}`);
}

const updateSubscription = (subscriptionId, data) => {
  return axiosInstance.patch(`/admin/subscriptions/${subscriptionId}`, data);
}

const cancelSubscription = (data) => {
  return axiosInstance.patch("/member/subscriptions/cancel", data);
}

const getSubscriptionAnalytics = (params) => {
  return axiosInstance.get("/admin/subscriptions/analytics", { params });
}

export {
  createPaymentLink,
  getSubscriptionList,
  getSubscriptionById,
  updateSubscription,
  cancelSubscription,
  getSubscriptionByIdForMember,
  getSubscriptionAnalytics
};
