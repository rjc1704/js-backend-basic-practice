import { randomUUID } from 'node:crypto';
import express from 'express';

const app = express();
const PORT = 3000;

// POST 요청의 JSON body 를 파싱하기 위한 미들웨어 (필수!)
// 이 줄이 없으면 req.body 가 undefined 가 돼요.
app.use(express.json());

// 임시 데이터 (실습#6에서 MongoDB로 교체할 예정이에요!)
//
// 💡 id 가 왜 UUID(긴 문자열) 인가요?
//    숫자 id 는 데이터가 많아지면 충돌이 나거나 추측이 쉬워요.
//    실무에서는 보통 UUID 같은 "절대 안 겹치는 고유 식별자"를 써요.
//    POST 로 새 항목을 만들 때도 randomUUID() 로 UUID 를 생성합니다.
let todos = [
  { id: '11111111-1111-1111-1111-111111111111', title: '운동하기', completed: false },
  { id: '22222222-2222-2222-2222-222222222222', title: '책 읽기', completed: true },
  { id: '33333333-3333-3333-3333-333333333333', title: 'Express 공부하기', completed: false },
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

// GET /todos/:id — 단일 항목 조회 (id 는 UUID 문자열)
app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
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
//   - 새 id 는 Node 내장 randomUUID() 로 생성하세요.
//       파일 상단에 import 가 이미 추가돼 있어요:
//         import { randomUUID } from 'node:crypto';
//       사용:
//         const id = randomUUID();
//       💡 randomUUID() 는 절대 겹치지 않는 고유한 UUID 문자열을 매번 새로 만들어줘요.
//          (예: "5b2c8e1f-3d4a-4f9b-9c1a-2e8a7b6c5d4e")
//   - completed 는 기본값 false 로 새 객체를 만드세요.
//   - todos 배열에 push 하고, 201 상태코드와 함께 새 항목을 응답:
//       res.status(201).json(newTodo);
//
//   📦 요청 body 예시
//      { "title": "코딩 공부하기" }
//
//   📦 성공 응답 예시 (201 Created)  — id 는 매번 다른 UUID 가 생성돼요
//      {
//        "id": "5b2c8e1f-3d4a-4f9b-9c1a-2e8a7b6c5d4e",
//        "title": "코딩 공부하기",
//        "completed": false
//      }
//
//   📦 실패 응답 예시 (400 Bad Request)  — title 이 없을 때
//      { "message": "title은 필수입니다." }
//
// 작성 위치: 여기 아래에 app.post('/todos', ...) 코드를 작성해 주세요.


// ─────────────────────────────────────────────────────────────
// 서버 시작
// ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중이에요! 🚀`);
});
