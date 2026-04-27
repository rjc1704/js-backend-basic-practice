import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db.js';

// .env 파일 로드 (반드시 다른 코드보다 먼저!)
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB 연결
connectDB();

// 임시 데이터 (실습#6에서 MongoDB 로 교체할 예정이에요!)
let todos = [
  { id: 1, title: '운동하기', completed: false },
  { id: 2, title: '책 읽기', completed: true },
  { id: 3, title: 'Express 공부하기', completed: false },
];

// ─────────────────────────────────────────────────────────────
// 실습#1: GET 엔드포인트 (✅ 완료)
// ─────────────────────────────────────────────────────────────

app.get('/todos', (req, res) => {
  const { completed } = req.query;

  if (completed === undefined) {
    return res.json(todos);
  }

  const completedBool = completed === 'true';
  const filtered = todos.filter((todo) => todo.completed === completedBool);
  res.json(filtered);
});

app.get('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: `id ${id} 인 할 일을 찾을 수 없어요.` });
  }

  res.json(todo);
});

// ─────────────────────────────────────────────────────────────
// 실습#2: POST 엔드포인트 (✅ 완료)
// ─────────────────────────────────────────────────────────────

app.post('/todos', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'title은 필수입니다.' });
  }

  const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
  const newTodo = { id: newId, title, completed: false };
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// ─────────────────────────────────────────────────────────────
// 실습#3: PATCH & DELETE 엔드포인트 (✅ 완료)
// ─────────────────────────────────────────────────────────────

app.patch('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `id ${id} 인 할 일을 찾을 수 없어요.` });
  }

  todos[index] = { ...todos[index], ...req.body };
  res.json(todos[index]);
});

app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `id ${id} 인 할 일을 찾을 수 없어요.` });
  }

  const deleted = todos.splice(index, 1)[0];
  res.json({ message: '삭제되었어요.', data: deleted });
});

// ─────────────────────────────────────────────────────────────
// 서버 시작
// ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중이에요! 🚀`);
});
