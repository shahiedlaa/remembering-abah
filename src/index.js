import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://istpqtthueulgfbeutoq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdHBxdHRodWV1bGdmYmV1dG9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3NTYzOTMsImV4cCI6MjAyNDMzMjM5M30.i3GMeVbgY-XLgyRCNlfaGCT8Q6VEuagyXg0sDasbeQI");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
    <App />
    </SessionContextProvider>
  </React.StrictMode>
);
