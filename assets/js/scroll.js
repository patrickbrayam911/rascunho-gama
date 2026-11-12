/**
 * scroll.js — Lenis + integração ScrollTrigger
 * Lenis: rolagem suave no desktop; toque nativo no celular.
 * Se Lenis não carregar, a página funciona normalmente.
 */

export function iniciarRolagem(gsap, ScrollTrigger) {
  if (typeof Lenis === 'undefined') return null;

  const prefereReducao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefereReducao) return null;

  const isMobile = window.matchMedia('(max-width: 639px)').matches;
  if (isMobile) return null; // manter rolagem nativa no toque

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponencial
    smooth: true,
  });

  if (gsap && ScrollTrigger) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    function loop(time) {
      lenis.raf(time);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  return lenis;
}
