/**
 * ui.js — Header (transparente → sólido → oculto), menu mobile, botão flutuante
 */

/* ─── Header: scroll behavior ─── */
function configurarHeader() {
  const header = document.querySelector('.cabecalho');
  if (!header) return;

  let ultimaPos = 0;
  let rafPendente = false;

  function atualizar() {
    const pos = window.scrollY;
    const passouThreshold = pos > 80;
    const rolandoParaBaixo = pos > ultimaPos + 5;
    const rolandoParaCima = pos < ultimaPos - 5;

    header.classList.toggle('cabecalho--solido', passouThreshold);
    if (passouThreshold && rolandoParaBaixo) {
      header.classList.add('cabecalho--oculto');
    } else if (rolandoParaCima || pos < 80) {
      header.classList.remove('cabecalho--oculto');
    }

    ultimaPos = pos;
    rafPendente = false;
  }

  window.addEventListener('scroll', () => {
    if (!rafPendente) {
      rafPendente = true;
      requestAnimationFrame(atualizar);
    }
  }, { passive: true });
}

/* ─── Menu mobile ─── */
function configurarMenuMobile() {
  const header = document.querySelector('.cabecalho');
  const botaoMenu = document.querySelector('.menu-toggle');
  const menuMobile = document.querySelector('.menu-mobile');
  const overlay = document.querySelector('.menu-overlay');
  if (!botaoMenu || !menuMobile) return;

  function abrirMenu() {
    menuMobile.classList.add('aberto');
    overlay?.classList.add('visivel');
    document.body.classList.add('menu-ativo');
    botaoMenu.setAttribute('aria-expanded', 'true');
    botaoMenu.setAttribute('aria-label', 'Fechar menu');
    // foco no primeiro link
    menuMobile.querySelector('a')?.focus();
  }

  function fecharMenu() {
    menuMobile.classList.remove('aberto');
    overlay?.classList.remove('visivel');
    document.body.classList.remove('menu-ativo');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
    botaoMenu.focus();
  }

  botaoMenu.addEventListener('click', () => {
    botaoMenu.getAttribute('aria-expanded') === 'true' ? fecharMenu() : abrirMenu();
  });

  overlay?.addEventListener('click', fecharMenu);

  menuMobile.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', fecharMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuMobile.classList.contains('aberto')) fecharMenu();
  });
}

/* ─── Botão flutuante WhatsApp ─── */
function configurarBotaoFlutuante() {
  const botao = document.querySelector('.flutuante-whatsapp');
  if (!botao) return;

  const hero = document.querySelector('.abertura');
  if (!hero) {
    botao.classList.add('visivel');
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    botao.classList.toggle('visivel', !entries[0].isIntersecting);
  }, { threshold: 0.1 });

  obs.observe(hero);
}

/* ─── Acordeão FAQ ─── */
function configurarFaq() {
  const itens = document.querySelectorAll('.faq article');
  if (!itens.length) return;

  itens.forEach((item) => {
    const h3 = item.querySelector('h3');
    const p = item.querySelector('p');
    if (!h3 || !p) return;

    // Montar estrutura de acordeão dinamicamente
    const btn = document.createElement('button');
    btn.className = 'faq__gatilho';
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = h3.textContent;

    const icone = document.createElement('span');
    icone.className = 'faq__icone';
    icone.setAttribute('aria-hidden', 'true');
    icone.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" stroke-width="1.25" class="faq__icone-v"/><line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width="1.25"/></svg>`;
    btn.appendChild(icone);

    const painel = document.createElement('div');
    painel.className = 'faq__painel';
    painel.setAttribute('role', 'region');
    painel.hidden = true;

    const inner = document.createElement('div');
    inner.className = 'faq__painel-inner';
    inner.appendChild(p.cloneNode(true));
    painel.appendChild(inner);

    h3.replaceWith(btn);
    btn.after(painel);

    btn.addEventListener('click', () => {
      const aberto = btn.getAttribute('aria-expanded') === 'true';
      // Fechar todos os outros
      itens.forEach((outro) => {
        const ob = outro.querySelector('.faq__gatilho');
        const op = outro.querySelector('.faq__painel');
        if (ob && op && ob !== btn) {
          ob.setAttribute('aria-expanded', 'false');
          op.hidden = true;
          outro.classList.remove('faq--aberto');
        }
      });
      btn.setAttribute('aria-expanded', String(!aberto));
      painel.hidden = aberto;
      item.classList.toggle('faq--aberto', !aberto);
    });
  });
}

/* ─── Carrossel de depoimentos ─── */
function configurarCarrossel() {
  const secao = document.querySelector('.depoimentos');
  if (!secao) return;
  const itens = Array.from(secao.querySelectorAll('.depoimento'));
  if (itens.length <= 1) return;

  let atual = 0;
  const primeiro = itens[0];
  const containerPai = primeiro.parentNode;

  // Envolver em container
  const container = document.createElement('div');
  container.className = 'carrossel';
  container.setAttribute('aria-roledescription', 'carrossel');
  container.setAttribute('aria-label', 'Depoimentos de clientes');

  const trilho = document.createElement('div');
  trilho.className = 'carrossel__trilho';

  // Inserir container no lugar do primeiro item
  containerPai.insertBefore(container, primeiro);

  itens.forEach((item, i) => {
    item.setAttribute('role', 'group');
    item.setAttribute('aria-roledescription', 'slide');
    item.setAttribute('aria-label', `${i + 1} de ${itens.length}`);
    if (i !== 0) item.hidden = true;
    trilho.appendChild(item);
  });

  container.appendChild(trilho);

  // Controles
  const controles = document.createElement('div');
  controles.className = 'carrossel__controles';
  controles.setAttribute('aria-label', 'Navegação do carrossel');

  const btnAnterior = document.createElement('button');
  btnAnterior.className = 'carrossel__btn carrossel__btn--ant';
  btnAnterior.setAttribute('aria-label', 'Depoimento anterior');
  btnAnterior.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><polyline points="13 4 7 10 13 16" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const indicadores = document.createElement('div');
  indicadores.className = 'carrossel__indicadores';
  itens.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carrossel__dot';
    dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
    if (i === 0) dot.classList.add('ativo');
    dot.addEventListener('click', () => irPara(i));
    indicadores.appendChild(dot);
  });

  const btnProximo = document.createElement('button');
  btnProximo.className = 'carrossel__btn carrossel__btn--prox';
  btnProximo.setAttribute('aria-label', 'Próximo depoimento');
  btnProximo.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><polyline points="7 4 13 10 7 16" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  controles.appendChild(btnAnterior);
  controles.appendChild(indicadores);
  controles.appendChild(btnProximo);
  container.appendChild(controles);

  function irPara(indice) {
    itens[atual].hidden = true;
    atual = (indice + itens.length) % itens.length;
    itens[atual].hidden = false;
    indicadores.querySelectorAll('.carrossel__dot').forEach((d, i) => {
      d.classList.toggle('ativo', i === atual);
    });
  }

  btnAnterior.addEventListener('click', () => irPara(atual - 1));
  btnProximo.addEventListener('click', () => irPara(atual + 1));

  // Arraste/swipe
  let xInicio = null;
  trilho.addEventListener('touchstart', (e) => { xInicio = e.touches[0].clientX; }, { passive: true });
  trilho.addEventListener('touchend', (e) => {
    if (xInicio === null) return;
    const diff = xInicio - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) irPara(atual + (diff > 0 ? 1 : -1));
    xInicio = null;
  });

  // Teclado nas setas
  secao.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); irPara(atual - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); irPara(atual + 1); }
  });
}

export function iniciarUI() {
  configurarHeader();
  configurarMenuMobile();
  configurarBotaoFlutuante();
  configurarFaq();
  configurarCarrossel();
}
