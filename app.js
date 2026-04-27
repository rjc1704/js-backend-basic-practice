import express from 'express';

const app = express();
const PORT = 3000;

// 임시 데이터 (실습#6에서 MongoDB로 교체할 예정이에요!)
//
// 💡 id 가 왜 UUID(긴 문자열) 인가요?
//    숫자 id 는 데이터가 많아지면 충돌이 나거나 추측이 쉬워요.
//    실무에서는 보통 UUID 같은 "절대 안 겹치는 고유 식별자"를 써요.
//    실습#2 의 POST 에서 새 항목을 만들 때도 crypto.randomUUID() 로 UUID 를 생성합니다.
let todos = [
  { id: '11111111-1111-1111-1111-111111111111', title: '운동하기', completed: false },
  { id: '22222222-2222-2222-2222-222222222222', title: '책 읽기', completed: true },
  { id: '33333333-3333-3333-3333-333333333333', title: 'Express 공부하기', completed: false },
];

// ─────────────────────────────────────────────────────────────
// 실습#1: GET 엔드포인트 만들기
// ─────────────────────────────────────────────────────────────

// TODO 1: GET /todos
//   - 전체 할 일 목록을 JSON으로 응답하세요. (res.json 사용)
//   - 쿼리스트링 ?completed=true 가 오면 완료된 항목만 필터링해서 응답하세요.
//     예) GET /todos?completed=true   → completed === true 인 항목만
//        GET /todos?completed=false  → completed === false 인 항목만
//   - 힌트: req.query.completed 는 문자열 "true" / "false" 로 들어와요!
//          (=== true 로 비교하면 항상 false 가 나오니 주의)
//
//   📦 응답 형식 예시 (200 OK)
//      [
//        { "id": "11111111-1111-1111-1111-111111111111", "title": "운동하기",         "completed": false },
//        { "id": "22222222-2222-2222-2222-222222222222", "title": "책 읽기",          "completed": true  },
//        { "id": "33333333-3333-3333-3333-333333333333", "title": "Express 공부하기",  "completed": false }
//      ]
//
//   📦 ?completed=true 응답 예시 (200 OK)
//      [
//        { "id": "22222222-2222-2222-2222-222222222222", "title": "책 읽기", "completed": true }
//      ]
//
// 작성 위치: 여기 아래에 app.get('/todos', ...) 코드를 작성해 주세요.


// TODO 2: GET /todos/:id
//   - URL 파라미터로 받은 id 에 해당하는 할 일 한 개를 응답하세요.
//   - id 는 UUID 문자열이에요. req.params.id 도 문자열로 들어오니
//     별도 변환 없이 그대로 비교하면 돼요. (=== 로 문자열끼리 비교)
//   - 못 찾으면 res.status(404).json({ message: '...' }) 형태로 404 응답.
//
//   📦 성공 응답 예시 (200 OK)  — GET /todos/11111111-1111-1111-1111-111111111111
//      { "id": "11111111-1111-1111-1111-111111111111", "title": "운동하기", "completed": false }
//
//   📦 실패 응답 예시 (404 Not Found)  — 존재하지 않는 id 로 요청 시
//      { "message": "id ... 인 할 일을 찾을 수 없어요." }
//
// 작성 위치: 여기 아래에 app.get('/todos/:id', ...) 코드를 작성해 주세요.


// ─────────────────────────────────────────────────────────────
// 서버 시작
// ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중이에요! 🚀`);
});
