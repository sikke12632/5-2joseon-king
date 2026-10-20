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
    if (s.book && s.page) return `${s.book} ${s.page}쪽`;
    if (s.site) return s.site;
    return '';
  };

  Q.run = function (questions, done) {
    const box = $('#quiz');
    const res = [];
    let i = 0;
    if (!questions.length) return done(res);
    box.classList.remove('hide');
    function show() {
      const q = questions[i];
      const opts = [q.answer, ...q.wrong].map((t) => ({ t, ok: t === q.answer }));
      for (let k = opts.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [opts[k], opts[j]] = [opts[j], opts[k]];
      }
      $('#qNum').textContent = `사관의 질문 ${i + 1} / ${questions.length}`;
      $('#qOutside').style.display = q.outside ? '' : 'none';
      $('#qText').textContent = q.q;
      $('#qFeedback').textContent = '';
      $('#qFeedback').className = '';
      $('#qNext').classList.add('hide');
      const ol = $('#qOpts');
      ol.innerHTML = '';
      opts.forEach((o) => {
        const b = document.createElement('button');
        b.className = 'q-opt';
        b.textContent = o.t;
        b.onclick = () => pick(o, b, opts);
        ol.appendChild(b);
      });
    }
    function pick(o, btn, opts) {
      const q = questions[i];
      [...$('#qOpts').children].forEach((b, k) => {
        b.disabled = true;
        if (opts[k].ok) b.classList.add('right');
      });
      if (o.ok) {
        btn.classList.add('circle');
        $('#qFeedback').textContent = '맞았사옵니다!';
        $('#qFeedback').className = 'ok';
      } else {
        btn.classList.add('wrong');
        const src = Q.sourceLine(q.source);
        $('#qFeedback').textContent = `정답은 「${q.answer}」${src ? ` (${src})` : ''}`;
        $('#qFeedback').className = 'no';
      }
      res.push(o.ok);
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
