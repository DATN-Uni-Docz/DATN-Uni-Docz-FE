import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { Worker } from '@react-pdf-viewer/core';

let initLocale = "en";
if (navigator.language === "es-MX") {
  initLocale = "es-MX";
} else if (navigator.language === "ar") {
  initLocale = "ar";
}

const loadMessages = (locale) => {
  switch (locale) {
    case "en":
      return import("./lang/en.json");
    default:
      return import("./lang/en.json");
  }
}

function App() {
  const [locale, setLocale] = useState(initLocale);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    loadMessages(locale).then((data) => setMessages(data.default));
  }, [locale]);

  if (!messages) return null;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <RouterProvider router={router} />
      </Worker>
      <ToastContainer />
    </IntlProvider>
  );
}

export default App;
