(function(){
  const PRIVACY_POLICY_URL = ENGPT.policy;
  const TERMS_URL = ENGPT.terms;
  const CTA_PLAN_URLS = ENGPT.ctaPlan;
  const CTA_CHAT_URL = ENGPT.ctaChat;
  const SCORE = {A:1,B:2,C:3,D:4,E:0};
  const API = ENGPT.api;
  const NONCE = ENGPT.nonce;

  // ==== Banco de preguntas en ORDEN FIJO (1–40) ====
  const QUESTION_BLOCKS = [
    {block:"Block 1 (A1–A2) — daily basics & courtesy",questions:[
      {qnum:1,qtext:"¿Cómo saludarías a alguien que no conoces muy bien?",options:{A:"Hi.",B:"Good morning.",C:"Good morning, how are you?",D:"Good morning — nice to see you.",E:"No sé la respuesta."}},
      {qnum:2,qtext:"¿Cómo pedirías un café?",options:{A:"A coffee, please.",B:"I’d like a coffee with milk, please.",C:"Can I have a latte, please?",D:"Could I get a large latte with oat milk, please?",E:"No sé la respuesta."}},
      {qnum:3,qtext:"¿Cómo dirías dónde vives y dónde trabajas?",options:{A:"I live in Madrid and work in my house.",B:"I live in Madrid and work at home.",C:"I live in Madrid and work from home.",D:"I live in Madrid and work remotely.",E:"No sé la respuesta."}},
      {qnum:4,qtext:"¿Cómo pedirías que te repitan algo?",options:{A:"Sorry?",B:"Can you repeat that?",C:"I’m sorry, what did you say?",D:"Come again?",E:"No sé la respuesta."}},
      {qnum:5,qtext:"¿Cómo dirías que la reunión está pautada para el lunes a las 3 de la tarde?",options:{A:"The meeting is the Monday at 3.",B:"The meeting is on Monday at 3 pm.",C:"The meeting is scheduled on Monday at 3 pm.",D:"The meeting’s been set for Monday at 3 pm.",E:"No sé la respuesta."}},
      {qnum:6,qtext:"¿Cómo hablarías de posesión y propiedad?",options:{A:"That is the bag of Maria.",B:"That is Maria’s bag.",C:"That bag belongs to Maria.",D:"That’s Maria’s.",E:"No sé la respuesta."}},
      {qnum:7,qtext:"¿Cómo darías una dirección?",options:{A:"The bank is on the corner.",B:"The bank is on the corner of Main and Oak.",C:"The bank’s right on the corner.",D:"The bank’s right on the corner by Main and Oak.",E:"No sé la respuesta."}},
      {qnum:8,qtext:"¿Cómo dirías que hoy hay mucho calor?",options:{A:"Today is hot.",B:"It’s really hot today.",C:"It’s boiling today.",D:"It’s insanely hot today.",E:"No sé la respuesta."}},
      {qnum:9,qtext:"¿Cómo agradecerías a alguien?",options:{A:"Thanks.",B:"Thank you.",C:"Thanks a lot — I appreciate it.",D:"Thank you so much — I owe you one.",E:"No sé la respuesta."}},
      {qnum:10,qtext:"¿Cómo ofrecerías tu ayuda?",options:{A:"Can I help you?",B:"Do you need help with that?",C:"Can I give you a hand?",D:"Would you like me to give you a hand with that?",E:"No sé la respuesta."}}
    ]},
    {block:"Block 2 (A2–B1) — simple tenses, natural connectors",questions:[
      {qnum:11,qtext:"¿Cómo dirías que viste a Ana ayer?",options:{A:"I see Ana yesterday.",B:"I saw Ana yesterday.",C:"I ran into Ana yesterday.",D:"I bumped into Ana yesterday.",E:"No sé la respuesta."}},
      {qnum:12,qtext:"¿Cómo dirías que has ido a Londres dos veces?",options:{A:"I went to London two times.",B:"I went to London twice.",C:"I’ve been to London twice.",D:"I’ve been to London a couple of times.",E:"No sé la respuesta."}},
      {qnum:13,qtext:"¿Cómo dirías que has vivido en el mismo lugar desde el 2019?",options:{A:"I live here since 2019.",B:"I’ve lived here since 2019.",C:"I’ve been living here since 2019.",D:"I’ve been living here for a few years now, since 2019.",E:"No sé la respuesta."}},
      {qnum:14,qtext:"¿Cómo dirías que este curso es más fácil que otros?",options:{A:"This course is more easy than the other.",B:"This course is easier than the other one.",C:"This course is much easier than the other one.",D:"This course is way easier than the other one.",E:"No sé la respuesta."}},
      {qnum:15,qtext:"¿Cómo explicarías que llegaste tarde por el tráfico?",options:{A:"I was late because of traffic.",B:"I ran late because of traffic.",C:"Traffic was heavy, so I was late.",D:"I got stuck in traffic, so I ended up being late.",E:"No sé la respuesta."}},
      {qnum:16,qtext:"¿Cómo harías una solicitud amable y profesional por correo electrónico?",options:{A:"Please send me the file.",B:"Could you send me the file, please?",C:"Could you please send me the file ASAP?",D:"I’d appreciate it if you could send me the file at your earliest convenience.",E:"No sé la respuesta."}},
      {qnum:17,qtext:"¿Cómo dirías que tienes planes con tus amigos en la noche?",options:{A:"I’m going to see my friends tonight.",B:"I’m seeing my friends tonight.",C:"I’m meeting my friends tonight.",D:"I’m meeting up with my friends tonight.",E:"No sé la respuesta."}},
      {qnum:18,qtext:"¿Cómo dirías que te gusta la pizza?",options:{A:"I like pizza very much.",B:"I really like pizza.",C:"I’m crazy about pizza.",D:"I’m really into pizza.",E:"No sé la respuesta."}},
      {qnum:19,qtext:"¿Cómo diriás que estudiaste y pasaste?",options:{A:"I studied and I passed.",B:"I studied hard, so I passed.",C:"I studied a lot, as a result, I passed.",D:"I studied a lot, and it paid off, I passed.",E:"No sé la respuesta."}},
      {qnum:20,qtext:"¿Cómo invitarías a alguien a ir por un café?",options:{A:"Do you want to get a coffee?",B:"Would you like to get a coffee?",C:"Wanna go for a cup of coffee?",D:"Wanna grab a cup of coffee sometime this week?",E:"No sé la respuesta."}}
    ]},
    {block:"Block 3 (B1–B2) — structure, reported speech, phrasals",questions:[
      {qnum:21,qtext:"¿Cómo dirías “si supiera la respuesta, te la diría”?",options:{A:"If I know the answer, I tell you.",B:"If I knew the answer, I tell you.",C:"If I knew the answer, I would tell you.",D:"If I knew the answer, I’d definitely let you know.",E:"No sé la respuesta."}},
      {qnum:22,qtext:"¿Cómo dirías que Emma ya escribió el reporte?",options:{A:"Emma wrote the report.",B:"The report was written by Emma.",C:"Emma already wrote the report.",D:"Emma has already written the report.",E:"No sé la respuesta."}},
      {qnum:23,qtext:"¿Cómo dirías que tu vecino es doctor?",options:{A:"The man who lives next to my house is a doctor.",B:"The man living next to me is a doctor.",C:"My next-door neighbor is a doctor.",D:"The guy next door is a doctor.",E:"No sé la respuesta."}},
      {qnum:24,qtext:"¿Cómo dirías que terminaste aunque estabas cansado?",options:{A:"I was tired, but I finished.",B:"I was tired but still finished.",C:"I was tired; however, I finished.",D:"I was exhausted but managed to finish.",E:"No sé la respuesta."}},
      {qnum:25,qtext:"¿Cómo dirías que necesitamos tomar una decisión?",options:{A:"We need to take a decision.",B:"We need to make a decision.",C:"We should decide what to do.",D:"We need to figure out what we should do.",E:"No sé la respuesta."}},
      {qnum:26,qtext:"¿Cómo dirías que ella dijo que estaba ocupada?",options:{A:"She said she is busy",B:"She said she was busy.",C:"She told me she was busy.",D:"She mentioned she was busy.",E:"No sé la respuesta."}},
      {qnum:27,qtext:"¿Cómo dirías que el mercado laboral está super saturado?",options:{A:"The job market is saturated.",B:"Today’s job market is pretty saturated.",C:"Today’s job market is oversaturated.",D:"The current job market is swamped.",E:"No sé la respuesta."}},
      {qnum:28,qtext:"¿Cómo expresarías que alguien puede contar contigo?",options:{A:"You can trust me.",B:"You can count on me.",C:"You can rely on me.",D:"You can call on me anytime.",E:"No sé la respuesta."}},
      {qnum:29,qtext:"¿Cómo dirías que vas a investigar algo?",options:{A:"I’ll check it.",B:"I’ll look into it.",C:"I’ll dig into it and get back to you.",D:"I’ll take a closer look and get back to you.",E:"No sé la respuesta."}},
      {qnum:30,qtext:"¿Cómo dirías que trabajaste aunque estabas enfermo?",options:{A:"I was ill but I worked.",B:"I was sick, but I worked.",C:"I wasn’t feeling well, but I still worked.",D:"I wasn’t well, but I still managed to get some work done.",E:"No sé la respuesta."}}
    ]},
    {block:"Block 4 (B2–C1/C2) — natural pro tone & clarity",questions:[
      {qnum:31,qtext:"¿Cómo comenzarías un correo electrónico amable y profesionalmente?",options:{A:"Hi team, a quick note on…",B:"Hi team, I’d like to go over…",C:"Hi team — quick heads-up on the following points:",D:"Hi team — I’d like to quickly go over the following points:",E:"No sé la respuesta."}},
      {qnum:32,qtext:"¿Cómo dirías que algo te parece que está raro o malo?",options:{A:"I think this is off.",B:"This seems off to me.",C:"This looks a bit off to me.",D:"This looks slightly off at this stage.",E:"No sé la respuesta."}},
      {qnum:33,qtext:"¿Cómo anunciarías que decidieron cancelar algo?",options:{A:"We decided to cancel.",B:"We’ve decided to cancel.",C:"We’ve made the call to cancel.",D:"We’ve decided to call it off.",E:"No sé la respuesta."}},
      {qnum:34,qtext:"¿Cómo dirías que nunca has visto algo, con énfasis?",options:{A:"I never saw this before.",B:"I’ve never seen this before.",C:"I’ve never seen anything like this before.",D:"I’ve never come across anything like this before.",E:"No sé la respuesta."}},
      {qnum:35,qtext:"¿Cómo dirías que la gente ve injustas la política establecida?",options:{A:"People say the policy is not fair.",B:"People say the policy is unfair.",C:"It’s said the policy is unfair.",D:"It’s widely seen as unfair.",E:"No sé la respuesta."}},
      {qnum:36,qtext:"¿Qué conector usarías para denotar contraste?",options:{A:"but",B:"although",C:"even though",D:"still",E:"No sé la respuesta."}},
      {qnum:37,qtext:"¿Cómo dirías que los documentos que solicitaste llegaron?",options:{A:"The documents arrived.",B:"The documents we requested arrived.",C:"The requested documents have arrived.",D:"The documents we asked for have arrived.",E:"No sé la respuesta."}},
      {qnum:38,qtext:"¿Cómo dirías “aumentar”?",options:{A:"go up",B:"rise",C:"increase",D:"shoot up",E:"No sé la respuesta."}},
      {qnum:39,qtext:"¿Cómo cerrarías un correo electrónico de manera amable y profesional?",options:{A:"Thanks,",B:"Best,",C:"Kind regards,",D:"Sincerely,",E:"No sé la respuesta."}},
      {qnum:40,qtext:"¿Cómo dirías que te fuiste de un lugar?",options:{A:"I went.",B:"I went out.",C:"I left.",D:"I took off.",E:"No sé la respuesta."}}
    ]}
  ];

  const state = { answers:{}, startedAt:null, submitted:false, timer:{secs:900,running:false,interval:null}, block:1, maxUnlocked:1, warmup:null };
  const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const byId=id=>document.getElementById(id);
  const headerEl=document.querySelector('.plg-header');
  const getHeaderOffset=()=> (headerEl && headerEl.style.display!=='none' ? headerEl.offsetHeight+16 : 24);
  const scrollIntoViewWithOffset = (el)=>{ if(!el) return; const y = el.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset(); window.scrollTo({top:y,behavior:'smooth'}); el.focus && el.focus(); };
  const toast=t=>{const el=byId('plg-toast'); el.textContent=t; el.hidden=false; setTimeout(()=>el.hidden=true,2500);};

  function renderBlock(step){
    const cont=byId(`q-container-${step}`); cont.innerHTML='';

    if(step===1){
      const wfs=document.createElement('fieldset'); wfs.className='plg-q'; wfs.id='warmupfs';
      const wlg=document.createElement('legend'); wlg.textContent='• Pregunta de calentamiento (no puntúa)'; wfs.appendChild(wlg);
      const wopts=document.createElement('div'); wopts.className='plg-options';
      const WLIST={A:'Hello.',B:'How are you doing?',C:'How’s it going?',D:'Howdy?',E:'No sé la respuesta.'};
      ['A','B','C','D','E'].forEach(L=>{
        const row=document.createElement('div'); row.className='plg-opt';
        const input=document.createElement('input'); input.type='radio'; input.name='warmup'; input.value=L; input.id='warmup_'+L;
        const label=document.createElement('label'); label.htmlFor=input.id; label.innerHTML=`<span class="plg-letter">${L}</span><span>${WLIST[L]}</span>`;
        row.addEventListener('click',(ev)=>{ if(ev.target.tagName!=='INPUT') input.click(); });
        input.addEventListener('change',()=>{
          state.warmup=L;
          if(!state.startedAt){ state.startedAt=Date.now(); startTimer(); }
          const first = cont.querySelector('fieldset.plg-q[data-real="1"]');
          if(first) scrollIntoViewWithOffset(first);
        });
        row.appendChild(input); row.appendChild(label); wopts.appendChild(row);
      });
      wfs.appendChild(wopts); cont.appendChild(wfs);
    }

    const qs = [...QUESTION_BLOCKS[step-1].questions];
    qs.forEach((q,idx)=>{
      const displayNum = (step-1)*10 + (idx+1);
      const fs=document.createElement('fieldset'); fs.className='plg-q'; fs.dataset.real='1'; fs.id=`q-${q.qnum}`;
      const lg=document.createElement('legend'); lg.textContent=`${displayNum}) ${q.qtext}`; fs.appendChild(lg);

      const opts=document.createElement('div'); opts.className='plg-options';
      ['A','B','C','D','E'].forEach(L=>{
        const txt=q.options[L]; if(!txt) return;
        const row=document.createElement('div'); row.className='plg-opt';
        const input=document.createElement('input'); input.type='radio'; input.name=`q_${q.qnum}`; input.value=L; input.id=`q_${q.qnum}_${L}`;
        input.addEventListener('change',()=>{
          state.answers[q.qnum]=L; fs.classList.remove('error'); updateProgress();
          if(!state.startedAt){ state.startedAt=Date.now(); startTimer(); }
          const list = Array.from(cont.querySelectorAll('fieldset.plg-q[data-real="1"]'));
          const idxFS = list.indexOf(fs); let target=null;
          for(let i=idxFS+1;i<list.length;i++){
            if(!list[i].querySelector('input[type=radio]:checked')){ target=list[i]; break; }
          }
          if(target) scrollIntoViewWithOffset(target);
        });
        const label=document.createElement('label'); label.htmlFor=input.id;
        label.innerHTML=`<span class="plg-letter">${L}</span><span>${txt}</span>`;
        row.addEventListener('click',(ev)=>{ if(ev.target.tagName!=='INPUT') input.click(); });
        row.appendChild(input); row.appendChild(label); opts.appendChild(row);
      });
      fs.appendChild(opts); cont.appendChild(fs);
    });
  }

  [1,2,3,4].forEach(renderBlock);

  function updateProgress(){
    const a=Object.keys(state.answers).length, pct=Math.round((a/40)*100);
    byId('progressBar').style.width=pct+'%'; byId('progressPct').textContent=pct+'%'; byId('progressCount').textContent=`${a}/40`;
    $('.plg-progress').setAttribute('aria-valuenow', a);
  }
  function validateBlock(step){
    const blk=QUESTION_BLOCKS[step-1], miss=[];
    blk.questions.forEach(q=>{ if(!state.answers[q.qnum]) miss.push(q.qnum); });
    $$(`#block-${step} fieldset.plg-q[data-real="1"]`).forEach(f=>f.classList.remove('error'));
    const el=byId(`missing-${step}`);
    if(miss.length){
      miss.forEach(n=>byId(`q-${n}`).classList.add('error'));
      el.hidden=false; el.querySelector('b').textContent=miss.length;
      scrollIntoViewWithOffset(byId(`q-${miss[0]}`));
      toast(`Te faltan ${miss.length} preguntas en este bloque.`);
      return false;
    }
    el.hidden=true; return true;
  }
  function paintStepper(){
    [1,2,3,4].forEach(s=>{
      const btn=$(`.plg-step[data-step="${s}"]`);
      btn.classList.toggle('is-active', s===state.block);
      btn.toggleAttribute('disabled', s>state.maxUnlocked);
      btn.setAttribute('aria-current', s===state.block ? 'step':'false');
    });
  }
  function gotoBlock(step, scroll=true){
    if(step>state.maxUnlocked) return;
    [1,2,3,4].forEach(s=> byId(`block-${s}`).hidden = (s!==step));
    state.block=step; paintStepper();
    if(scroll) setTimeout(()=>scrollIntoViewWithOffset(byId(`block-${step}`)), 30);
  }
  $$('.plg-step').forEach(b=> b.addEventListener('click',()=> gotoBlock(Number(b.dataset.step)) ));
  $$('.plg-btn-next').forEach(b=> b.addEventListener('click',()=>{
    const next=Number(b.dataset.next), cur=next-1;
    if(validateBlock(cur)){ state.maxUnlocked=Math.max(state.maxUnlocked,next); paintStepper(); gotoBlock(next); }
  }));

  const timer=state.timer;
  function renderTimer(){ const m=String(Math.floor(timer.secs/60)).padStart(2,'0'), s=String(timer.secs%60).padStart(2,'0');
    byId('btnTimer').textContent=(timer.running?'⏸ Pausar ':'⏱ Iniciar ')+`${m}:${s}`;
    byId('btnTimer').setAttribute('aria-pressed', timer.running?'true':'false');
  }
  function startTimer(){ if(timer.running) return; timer.running=true; renderTimer();
    timer.interval=setInterval(()=>{ if(timer.secs>0){ timer.secs--; renderTimer(); }
      if(timer.secs===180) toast('¿Necesitas ayuda? Podemos orientarte en 15 min.');
      if(timer.secs===0){ clearInterval(timer.interval); toast('Tiempo finalizado. Puedes enviar tu test.'); }
    },1000);
  }
  function pauseTimer(){ timer.running=false; clearInterval(timer.interval); renderTimer(); }
  byId('btnTimer').addEventListener('click',()=> timer.running?pauseTimer():startTimer());

  byId('btnReset').addEventListener('click',()=>{
    if(!confirm('¿Reiniciar el test? Perderás tus respuestas.')) return;
    try{ localStorage.removeItem('engptState'); sessionStorage.clear(); }catch(e){}
    state.answers = {}; state.block=1; state.maxUnlocked=1; state.startedAt=null; state.submitted=false; state.warmup=null;
    state.timer = {secs:900,running:false,interval:null};
    const base = window.location.pathname + window.location.search.replace(/([?&])_r=\d+/,'');
    const url = base + (base.includes('?')?'&':'?') + '_r=' + Date.now();
    window.location.replace(url);
  });

  const reName=/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{2,}$/;
  const isDisposable=e=>['mailinator.com','10minutemail','guerrillamail','tempmail','yopmail'].some(d=>e.toLowerCase().includes(d));
  function validateFinal(){
    let ok=true;
    const email=byId('email').value.trim(), name=byId('name').value.trim();
    const ee=byId('email-error'), ne=byId('name-error'), ae=byId('accept-error'); ee.hidden=ne.hidden=ae.hidden=true;
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || isDisposable(email)){ ok=false; ee.hidden=false; scrollIntoViewWithOffset(byId('email')); }
    else if(!reName.test(name)){ ok=false; ne.hidden=false; scrollIntoViewWithOffset(byId('name')); }
    else if(!byId('accept').checked){ ok=false; ae.hidden=false; scrollIntoViewWithOffset(byId('accept')); }
    return ok;
  }
  byId('accept').addEventListener('change',()=>{ if(byId('accept').checked) byId('accept-error').hidden=true; });

  byId('plg-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    if(state.submitted){ toast('Este test ya fue enviado.'); return; }
    for(let s=1;s<=4;s++){ if(!validateBlock(s)) return; }
    if(!validateFinal()) return;

    let sum=0, counts={A:0,B:0,C:0,D:0,E:0};
    Object.entries(state.answers).forEach(([q,L])=>{ sum+=SCORE[L]; counts[L]++; });
    const avg=sum/40, pct=k=>Math.round((counts[k]/40)*100);
    let level='A0', cefr='A0', v=avg;
    if(v>3.50){ level='C2'; cefr='C2'; } else if(v>2.75){ level='C1'; cefr='C1'; }
    else if(v>2.25){ level='B2'; cefr='B2'; } else if(v>1.75){ level='B1'; cefr='B1'; }
    else if(v>1.25){ level='A2'; cefr='A2'; } else if(v>0.75){ level='A1'; cefr='A1'; } else { level='A0'; cefr='A0'; }

    const payload={ email:byId('email').value.trim(), name:byId('name').value.trim(),
      goal:(document.querySelector('input[name="goal"]:checked')||{}).value || '',
      accept:byId('accept').checked?1:0,
      started_ts: state.startedAt? Math.round(state.startedAt/1000): null,
      elapsed_s: state.startedAt? Math.round((Date.now()-state.startedAt)/1000): null,
      answers: state.answers, avg: Number(avg.toFixed(2)), level, cefr,
      pct_a:pct('A'), pct_b:pct('B'), pct_c:pct('C'), pct_d:pct('D'), pct_e:pct('E')
    };

    try{
      const res = await fetch(API,{method:'POST',headers:{'Content-Type':'application/json','X-WP-Nonce': NONCE},body:JSON.stringify(payload)});
      const data = await res.json(); if(!res.ok || !data.success) throw new Error(data.message||'Error de envío');
    }catch(err){ console.error(err); toast('No pudimos enviar tus datos. Intenta de nuevo.'); return; }

    showResult({level, cefr, avg, pctA:pct('A'), pctB:pct('B'), pctC:pct('C'), pctD:pct('D'), pctE:pct('E')});
    state.submitted=true; byId('btnSubmit').disabled=true; byId('afterSubmit').hidden=false;
  });

  function levelAdvice(level){
    const text={
      A0:'Empezaremos por fundamentos útiles para arrancar conversaciones, pedir lo que necesitas y entender frases frecuentes. La meta es ganar confianza rápido.',
      A1:'Ya manejas expresiones básicas. Te ayudaremos a ampliar vocabulario cotidiano y a sonar más natural en saludos, compras y pequeñas interacciones.',
      A2:'Te haces entender en situaciones conocidas. Puliremos tiempos verbales y conectores para que tus ideas fluyan con más claridad.',
      B1:'Te desenvuelves con soltura en temas habituales. Trabajaremos cohesión, rango de vocabulario y confianza al explicar y opinar.',
      B2:'Puedes participar en conversaciones complejas. Afinaremos registro, precisión gramatical y estilo para contextos académicos y laborales.',
      C1:'Te comunicas con fluidez y control del registro. Enfocaremos matices, coherencia y estilo profesional — correos, presentaciones y negociación.',
      C2:'Tu inglés se acerca a nativo en claridad y flexibilidad. Afinaremos tono según audiencia y micro-hábitos para sostener un rendimiento alto.'
    };
    return text[level] || '';
  }

  function showResult({level, cefr, avg, pctA,pctB,pctC,pctD,pctE}){
    const hdr=document.querySelector('.plg-header'); if(hdr) hdr.style.display='none';
    const frm=byId('plg-form'); if(frm) frm.style.display='none';

    byId('levelText').innerHTML=
      `Tu nivel estimado es <b>${level}</b> · CEFR: <b>${cefr}</b> · Promedio: <b>${avg.toFixed(2)}/4</b><br><span style="color:#64748B">${levelAdvice(level)}</span>`;
    const wrap=byId('distBars'); wrap.innerHTML='';
    [{k:'A',v:pctA},{k:'B',v:pctB},{k:'C',v:pctC},{k:'D',v:pctD},{k:'E',v:pctE}].forEach(d=>{
      const row=document.createElement('div'); row.className='plg-dist-row';
      row.innerHTML=`<strong>${d.k}:</strong><div class="bar"><span style="width:${d.v}%"></span></div><span>${d.v}%</span>`;
      wrap.appendChild(row);
    });
    byId('ctaPlan').href = CTA_PLAN_URLS[level] || '#';
    byId('ctaChat').href = CTA_CHAT_URL || '#';
    byId('plg-result').hidden=false;
    window.scrollTo({top:0,behavior:'smooth'});
    confetti();
  }

  function confetti(){
    const c=document.createElement('div'); c.style.position='fixed'; c.style.inset='0'; c.style.pointerEvents='none'; document.body.appendChild(c);
    const colors=['#00a5d8','#5274fe','#ffcd38','#ff5f5e'];
    for(let i=0;i<80;i++){
      const p=document.createElement('i'), sz=6+Math.random()*8;
      p.style.position='absolute'; p.style.width=sz+'px'; p.style.height=sz+'px'; p.style.left=(Math.random()*100)+'%'; p.style.top='-10px';
      p.style.background=colors[i%4]; p.style.opacity='0.9'; p.style.borderRadius='2px'; p.style.transform=`rotate(${Math.random()*360}deg)`; c.appendChild(p);
      p.animate([{transform:p.style.transform, top:'-10px'},{transform:`rotate(${Math.random()*360}deg)`, top:'100vh'}],{duration:1200+Math.random()*1200,easing:'ease-out',fill:'forwards'});
    }
    setTimeout(()=>c.remove(),1600);
  }

  document.getElementById('linkPolicy').href = PRIVACY_POLICY_URL;
  document.getElementById('linkTerms').href = TERMS_URL;

  try{
    const saved=JSON.parse(localStorage.getItem('engptState')||'null');
    if(saved){
      Object.assign(state,saved);
      Object.entries(state.answers).forEach(([q,L])=>{ const el=document.getElementById(`q_${q}_${L}`); if(el) el.checked=true; });
      if(state.warmup){ const w=document.getElementById('warmup_'+state.warmup); if(w) w.checked=true; }
      updateProgress(); paintStepper(); gotoBlock(state.block,false);
    }
  }catch(e){}
  setInterval(()=>localStorage.setItem('engptState', JSON.stringify(state)), 800);
})();
