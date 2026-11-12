/**
 * main.js — Ponto de entrada. Carrega módulos, aguarda CDNs, inicia tudo.
 * Se uma biblioteca CDN falhar, a página continua legível.
 */

import { iniciarRolagem } from './scroll.js';
import { iniciarAnimacoes } from './animations.js';
import { iniciarUI } from './ui.js';
import { iniciarFormulario } from './form.js';

function aguardarGsap(tentativas = 0) {
  return new Promise((resolve) => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      resolve({ gsap, ScrollTrigger });
      return;
    }
    if (tentativas > 20) {
      resolve({ gsap: null, ScrollTrigger: null });
      return;
    }
    setTimeout(() => aguardarGsap(tentativas + 1).then(resolve), 100);
  });
}

async function inicializar() {
  // UI independe de GSAP — inicia primeiro
  iniciarUI();
  iniciarFormulario();

  const { gsap: g, ScrollTrigger: st } = await aguardarGsap();

  const lenis = iniciarRolagem(g, st);
  iniciarAnimacoes(g, st);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar);
} else {
  inicializar();
}
