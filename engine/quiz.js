/* engine/quiz.js — 사관 퀴즈: 3지선다(보기 순서 섞음). 맞히면 붓 동그라미, 틀리면 정답과 근거 한 줄. */
(function () {
  'use strict';
  const JK = window.JK;
  const $ = (s) => document.querySelector(s);
  const Q = (JK.Quiz = {});

  // 근거 한 줄: 교과서 쪽이 있으면 교과서, 없으면 지도서 쪽, 아니면 사이트 이름
  Q.sourceLine = function (src) {
    if (!src || !src.length) return '';
    const s = src[0];
    if (s.tb) return `교과서 ${s.tb}쪽`;
    if (s.type === 'guide' && s.page) return `지도서 ${s.page}쪽`;
    if (s.title) return s.title;
    return '';
  };

  // opts: { options: 보기 수(3·4), retry: 틀리면 한 번 더(새싹) } — 난이도(설계서 10-7)
  Q.run = function (questions, opts, done) {
    opts = opts || {};
    const box = $('#quiz');
    const res = [];
    let i = 0;
    let tried = false;
    if (!questions.length) return done(res);
    box.classList.remove('hide');
    function show() {
      const q = questions[i];
      tried = false;
      // 보기 4개는 오답이 3개 있는 문항만(없으면 3개)
      const wrong = q.wrong.slice(0, Math.max(2, (opts.options || 3) - 1));
      const choices = [q.answer, ...wrong].map((t) => ({ t, ok: t === q.answer }));
      for (let k = choices.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [choices[k], choices[j]] = [choices[j], choices[k]];
      }
      $('#qNum').textContent = `사관의 질문 ${i + 1} / ${questions.length}`;
      $('#qOutside').style.display = q.out_of_textbook ? '' : 'none';
      $('#qText').textContent = q.question;
      $('#qFeedback').textContent = '';
      $('#qFeedback').className = '';
      $('#qNext').classList.add('hide');
      const ol = $('#qOpts');
      ol.innerHTML = '';
      choices.forEach((o) => {
        const b = document.createElement('button');
        b.className = 'q-opt';
        b.textContent = o.t;
        b.onclick = () => pick(o, b, choices);
        ol.appendChild(b);
      });
    }
    function pick(o, btn, list) {
      const q = questions[i];
      // 새싹: 틀리면 한 번 더 고를 수 있다(점수는 첫 답 기준)
      if (!o.ok && opts.retry && !tried) {
        tried = true;
        btn.disabled = true;
        btn.classList.add('wrong');
        $('#qFeedback').textContent = '아깝사옵니다. 한 번 더 골라 보시옵소서.';
        $('#qFeedback').className = 'no';
        return;
      }
      [...$('#qOpts').children].forEach((b, k) => {
        b.disabled = true;
        if (list[k].ok) b.classList.add('right');
      });
      if (o.ok) {
        btn.classList.add('circle');
        $('#qFeedback').textContent = '맞았사옵니다!';
        $('#qFeedback').className = 'ok';
      } else {
        btn.classList.add('wrong');
        const src = Q.sourceLine(q.sources);
        // 다른 길로 간 사건이면 비교 화면의 그 줄을 다시 보여 준다(10-10-5)
        const ex = opts.explain ? opts.explain(q) : '';
        $('#qFeedback').textContent = `정답은 「${q.answer}」${src ? ` (${src})` : ''}${ex ? '\n' + ex : ''}`;
        $('#qFeedback').className = 'no';
      }
      res.push(o.ok && !tried);
      $('#qNext').textContent = i + 1 < questions.length ? '다음 질문' : '기록을 마친다';
      $('#qNext').classList.remove('hide');
    }
    $('#qNext').onclick = () => {
      i++;
      if (i < questions.length) show();
      else {
        box.classList.add('hide');
        done(res);
      }
    };
    show();
  };
})();
