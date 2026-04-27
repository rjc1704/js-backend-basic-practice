import express from 'express';

const app = express();
const PORT = 3000;

// POST 요청의 JSON body 를 파싱하기 위한 미들웨어 (필수!)
// 이 줄이 없으면 req.body 가 undefined 가 돼요.
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

  // 쿼리스트링이 없으면 전체 응답
  if (completed === undefined) {
    return res.json(todos);
  }

  // 쿼리스트링은 문자열로 들어오니 boolean 으로 변환해서 비교
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
// 실습#2: POST 엔드포인트 만들기
// ─────────────────────────────────────────────────────────────

// TODO 1: POST /todos
//   - req.body 에서 title 을 꺼내세요. (구조 분해 할당 추천)
//   - title 이 없거나 빈 문자열이면 400 응답:
//       res.status(400).json({ message: 'title은 필수입니다.' });
//   - 새 id 만들기:
//       todos 가 비어있으면 1
//       그렇지 않으면 (현재 가장 큰 id + 1) — 힌트: Math.max(...todos.map(t => t.id))
//   - completed 는 기본값 false 로 새 객체를 만드세요.
//   - todos 배열에 push 하고, 201 상태코드와 함께 새 항목을 응답:
//       res.status(201).json(newTodo);
//
// 작성 위치: 여기 아래에 app.post('/todos', ...) 코드를 작성해 주세요.


// ─────────────────────────────────────────────────────────────
// 서버 시작
// ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중이에요! 🚀`);
});
