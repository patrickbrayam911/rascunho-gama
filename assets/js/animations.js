/**
 * animations.js — Revelações, linhas douradas, contadores, linha do método, parallax
 * Depende de GSAP + ScrollTrigger via CDN.
 * Fallback: se GSAP não carregar, remove [data-rev] para conteúdo aparecer.
 */

/* ─── Fallback sem GSAP ─── */
function fallbackSemGsap() {
  document.querySelectorAll('[data-rev]').forEach((el) => {
    el.removeAttribute('data-rev');
    el.style.opacity = '';
    el.style.transform = '';
  });
  document.querySelectorAll('[data-linha]').forEach((el) => {
    el.classList.add('ativo');
  });
  document.querySelectorAll('.linha-mascara span').forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}

/* ─── Animação imediata da seção Hero (independe de rolagem) ─── */
function animarHero(gsap, prefereReducao, isMobile) {
  const hero = document.querySelector('.abertura');
  if (!hero) return;

  const rotulo = hero.querySelector('.rotulo');
  const linhas = hero.querySelectorAll('.linha-mascara span');
  const texto = hero.querySelector('.abertura__texto');
  const acoes = hero.querySelector('.acoes');
  const registro = hero.querySelector('.abertura__registro');

  if (prefereReducao) {
    if (rotulo) { rotulo.style.opacity = '1'; rotulo.style.transform = 'none'; }
    linhas.forEach((l) => { l.style.opacity = '1'; l.style.transform = 'none'; });
    if (texto) { texto.style.opacity = '1'; texto.style.transform = 'none'; }
    if (acoes) { acoes.style.opacity = '1'; acoes.style.transform = 'none'; }
    if (registro) { registro.style.opacity = '1'; registro.style.transform = 'none'; }
    return;
  }

  const duracao = isMobile ? 0.7 : 0.85;
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (rotulo) {
    tl.to(rotulo, { opacity: 1, y: 0, duration: duracao }, 0.05);
  }
  if (linhas.length) {
    tl.to(linhas, { opacity: 1, y: 0, duration: duracao, stagger: 0.12 }, 0.15);
  }
  if (texto) {
    tl.to(texto, { opacity: 1, y: 0, duration: duracao }, 0.35);
  }
  if (acoes) {
    tl.to(acoes, { opacity: 1, y: 0, duration: duracao }, 0.48);
  }
  if (registro) {
    tl.to(registro, { opacity: 1, y: 0, duration: duracao }, 0.6);
  }
}

/* ─── Revela grupos de [data-rev] com stagger ─── */
function configurarRevelacoes(gsap, ScrollTrigger, prefereReducao) {
  if (prefereReducao) {
    fallbackSemGsap();
    return;
  }

  // Revela elementos individuais marcados com data-rev (ignora hero, tratado à parte)
  const elementos = document.querySelectorAll('[data-rev]');
  elementos.forEach((el) => {
    if (el.closest('.abertura')) return;
    const atraso = parseFloat(el.dataset.atraso || '0');
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter() {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: atraso,
          ease: 'power3.out',
        });
      },
    });
  });

  // Stagger automático em grupos marcados com data-grupo
  document.querySelectorAll('[data-grupo]').forEach((pai) => {
    if (pai.closest('.abertura')) return;
    const filhos = pai.children;
    ScrollTrigger.create({
      trigger: pai,
      start: 'top 85%',
      once: true,
      onEnter() {
        gsap.to(filhos, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
        });
      },
    });
  });
}

/* ─── Revelar título linha a linha ─── */
function configurarMascarasTitulo(gsap, ScrollTrigger, prefereReducao) {
  if (prefereReducao) return;

  document.querySelectorAll('.linha-mascara').forEach((mascara) => {
    if (mascara.closest('.abertura')) return;
    const span = mascara.querySelector('span');
    if (!span) return;
    const pai = mascara.closest('[data-titulo-rev]') || mascara;
    ScrollTrigger.create({
      trigger: pai,
      start: 'top 88%',
      once: true,
      onEnter() {
        const atraso = parseFloat(mascara.dataset.atraso || '0');
        gsap.to(span, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: atraso,
          ease: 'power3.out',
        });
      },
    });
  });
}

/* ─── Linha dourada sob títulos ─── */
function configurarLinhasDouradas(ScrollTrigger) {
  document.querySelectorAll('[data-linha]').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter() {
        el.classList.add('ativo');
      },
    });
  });
}

/* ─── Contadores ─── */
function animarContador(el, gsap) {
  const alvo = parseFloat(el.dataset.contador);
  const sufixo = el.dataset.sufixo || '';
  const prefixo = el.dataset.prefixo || '';
  const inteiro = Number.isInteger(alvo);

  const obj = { v: 0 };
  gsap.to(obj, {
    v: alvo,
    duration: 1.6,
    ease: 'power2.out',
    onUpdate() {
      el.textContent = prefixo + (inteiro ? Math.round(obj.v) : obj.v.toFixed(1)) + sufixo;
    },
    onComplete() {
      el.textContent = prefixo + (inteiro ? alvo : alvo.toFixed(1)) + sufixo;
    },
  });
}

function configurarContadores(gsap, ScrollTrigger) {
  document.querySelectorAll('[data-contador]').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter() {
        animarContador(el, gsap);
      },
    });
  });
}

/* ─── Linha do método (desenhada conforme rolagem) ─── */
function configurarLinhaMetodo(gsap, ScrollTrigger) {
  const trilho = document.querySelector('.metodo__trilho');
  if (!trilho) return;
  const linha = trilho.querySelector('.metodo__linha-ativa');
  const pontos = trilho.querySelectorAll('.metodo__ponto');
  const secao = document.querySelector('#metodo');
  if (!linha || !secao) return;

  gsap.to(linha, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: secao,
      start: 'top center',
      end: 'bottom center',
      scrub: 0.6,
    },
  });

  pontos.forEach((ponto, i) => {
    ScrollTrigger.create({
      trigger: ponto,
      start: 'center 65%',
      once: true,
      onEnter() {
        ponto.classList.add('ativo');
      },
    });
  });
}

/* ─── Parallax: monograma e retratos ─── */
function configurarParallax(gsap, ScrollTrigger, isMobile) {
  if (isMobile) return; // desligado no celular

  const monograma = document.querySelector('.abertura__monograma');
  if (monograma) {
    gsap.to(monograma, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.abertura',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  document.querySelectorAll('.socio__retrato').forEach((retrato) => {
    gsap.to(retrato, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: retrato,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });
}

/* ─── Inicialização principal ─── */
export function iniciarAnimacoes(gsap, ScrollTrigger) {
  if (!gsap || !ScrollTrigger) {
    fallbackSemGsap();
    return;
  }

  const prefereReducao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 639px)').matches;

  // Anima hero imediatamente na carga da página
  animarHero(gsap, prefereReducao, isMobile);

  configurarRevelacoes(gsap, ScrollTrigger, prefereReducao);
  configurarMascarasTitulo(gsap, ScrollTrigger, prefereReducao);
  configurarLinhasDouradas(ScrollTrigger);

  if (!prefereReducao) {
    configurarContadores(gsap, ScrollTrigger);
    configurarLinhaMetodo(gsap, ScrollTrigger);
    configurarParallax(gsap, ScrollTrigger, isMobile);
  }

  ScrollTrigger.refresh();
}
