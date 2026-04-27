import express from 'express';

const app = express();
const PORT = 3000;

// POST/PATCH 요청의 JSON body 를 파싱하기 위한 미들웨어 (필수!)
app.use(express.json());

// 임시 데이터 (실습#6에서 MongoDB로 교체할 예정이에요!)
let todos = [
  { id: 1, title: '운동하기', completed: false },
  { id: 2, title: '책 읽기', completed: true },
  { id: 3, title: 'Express 공부하기', completed: false },
];

// ─────────────────────────────────────────────────────────────
// 실습#1: GET 엔드포인트 (✅ 완료)
// ─────────────────────────────────────────────────────────────

// GET /todos — 전체 목록 조회 (+ completed 쿼리 필터링)
app.get('/todos', (req, res) => {
  const { completed } = req.query;

  if (completed === undefined) {
    return res.json(todos);
  }

  const completedBool = completed === 'true';
  const filtered = todos.filter((todo) => todo.completed === completedBool);
  res.json(filtered);
});

// GET /todos/:id — 단일 항목 조회
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

// POST /todos — 새 할 일 생성
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
// 실습#3: PATCH & DELETE 엔드포인트 만들기
// ─────────────────────────────────────────────────────────────

// TODO 1: PATCH /todos/:id
//   - id 로 todos 배열에서 인덱스를 찾으세요.
//     힌트: const index = todos.findIndex(t => t.id === Number(req.params.id));
//   - 못 찾으면 (index === -1) 404 응답.
//   - 스프레드 연산자로 기존 데이터 위에 req.body 를 덮어쓰세요:
//       todos[index] = { ...todos[index], ...req.body };
//     이렇게 하면 보내지 않은 필드는 그대로 유지돼요!
//   - 수정된 항목(todos[index])을 응답하세요.
//
// 작성 위치: 여기 아래에 app.patch('/todos/:id', ...) 코드를 작성해 주세요.


// TODO 2: DELETE /todos/:id
//   - id 로 인덱스를 찾으세요. 못 찾으면 404.
//   - splice 로 배열에서 해당 항목을 제거하세요:
//       const deleted = todos.splice(index, 1)[0];
//   - 삭제된 항목을 응답하세요. (또는 res.status(204).send() 도 가능)
//
// 작성 위치: 여기 아래에 app.delete('/todos/:id', ...) 코드를 작성해 주세요.


// ─────────────────────────────────────────────────────────────
// 서버 시작
// ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중이에요! 🚀`);
});
