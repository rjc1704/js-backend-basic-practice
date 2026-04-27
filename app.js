import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import Todo from "./models/Todo.js";
// TODO: utils/asyncHandler.js 에서 asyncHandler 를 import 하세요.
//   import { asyncHandler } from './utils/asyncHandler.js';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

// ─────────────────────────────────────────────────────────────
// 실습#7: asyncHandler 패턴 적용하기
// ─────────────────────────────────────────────────────────────
//
// 아래 기존 라우트를 보면 try-catch 가 거의 똑같이 반복되고 있죠?
// asyncHandler 래퍼로 try-catch 를 한 곳으로 모아서 코드를 깔끔하게 만들어 봐요!
//
// 사용 예시:
//   app.get('/todos', asyncHandler(async (req, res) => {
//     const todos = await Todo.find();
//     res.json(todos);
//   }));

// TODO: 위의 5개 라우트(GET, GET/:id, POST, PATCH, DELETE)를 모두 asyncHandler 로
//       감싸도록 리팩토링하세요.

// GET /todos — 전체 조회 (+ completed 필터)
app.get("/todos", async (req, res) => {
  try {
    const filter = {};
    if (req.query.completed !== undefined) {
      filter.completed = req.query.completed === "true";
    }
    const todos = await Todo.find(filter);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /todos/:id — 단일 조회
app.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "할 일을 찾을 수 없어요." });
    }
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: "잘못된 id 형식이에요." });
  }
});

// POST /todos — 새 항목 생성
app.post("/todos", async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH /todos/:id — 수정
app.patch("/todos/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "할 일을 찾을 수 없어요." });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /todos/:id — 삭제
app.delete("/todos/:id", async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "할 일을 찾을 수 없어요." });
    }
    res.json({ message: "삭제되었어요.", data: deleted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─────────────────────────────────────────────────────────────
// 서버 시작
// ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중이에요! 🚀`);
});
