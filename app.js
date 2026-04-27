import express from 'express';

const app = express();
const PORT = 3000;

// 임시 데이터 (실습#6에서 MongoDB로 교체할 예정이에요!)
let todos = [
  { id: 1, title: '운동하기', completed: false },
  { id: 2, title: '책 읽기', completed: true },
  { id: 3, title: 'Express 공부하기', completed: false },
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
// 작성 위치: 여기 아래에 app.get('/todos', ...) 코드를 작성해 주세요.


// TODO 2: GET /todos/:id
//   - URL 파라미터로 받은 id에 해당하는 할 일 한 개를 응답하세요.
//   - req.params.id 는 항상 "문자열"로 와요! Number() 로 변환해서 비교해야 해요.
//     예) "1" === 1  →  false
//         1   === 1  →  true
//   - 못 찾으면 res.status(404).json({ message: '...' }) 형태로 404 응답.
//
// 작성 위치: 여기 아래에 app.get('/todos/:id', ...) 코드를 작성해 주세요.


// ─────────────────────────────────────────────────────────────
// 서버 시작
// ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중이에요! 🚀`);
});
