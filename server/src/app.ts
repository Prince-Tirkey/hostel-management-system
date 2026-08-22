import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import complaintRoutes from "./modules/complaints/complaint.routes.js";
import noticeRoutes from "./modules/notices/notice.routes.js";
import communityRoutes from "./modules/community/community.routes.js";
import messRoutes from "./modules/mess/mess.routes.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL ?? "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/", (_req, res) => res.json({ success:true, message:"Smart Hostel Management API", data:null, timestamp:new Date().toISOString() }));
app.get("/api/health", (_req, res) => res.json({ success:true, message:"API healthy", data:null, timestamp:new Date().toISOString() }));

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/mess", messRoutes);

export default app;
