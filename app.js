import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import Todo from "./models/Todo.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "https://www.google.com",
  }),
);
app.use(express.json());

connectDB();

// ─────────────────────────────────────────────────────────────
// 모든 라우트를 asyncHandler 로 감싸서 try-catch 를 한 곳으로 모았어요.
// CastError(잘못된 ObjectId) / ValidationError(스키마 검증 실패) 는
// asyncHandler 가 자동으로 처리해 줍니다.
// ─────────────────────────────────────────────────────────────

app.get(
  "/todos",
  asyncHandler(async (req, res) => {
    console.log("GET /todos 요청받음!");
    const filter = {};
    if (req.query.completed !== undefined) {
      filter.completed = req.query.completed === "true";
    }
    const todos = await Todo.find(filter);
    res.json(todos);
  }),
);

app.get(
  "/todos/:id",
  asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "할 일을 찾을 수 없어요." });
    }
    res.json(todo);
  }),
);

app.post(
  "/todos",
  asyncHandler(async (req, res) => {
    const newTodo = await Todo.create(req.body);
    res.status(201).json(newTodo);
  }),
);

app.patch(
  "/todos/:id",
  asyncHandler(async (req, res) => {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "할 일을 찾을 수 없어요." });
    }
    res.json(updated);
  }),
);

app.delete(
  "/todos/:id",
  asyncHandler(async (req, res) => {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "할 일을 찾을 수 없어요." });
    }
    res.json({ message: "삭제되었어요.", data: deleted });
  }),
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중이에요! 🚀`);
});
