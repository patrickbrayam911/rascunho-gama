# HANDOFF — Gama Contabilidade Consultiva

Projeto finalizado até a Fase 5 (aprovada). Pronto para uso e apresentação.
Este documento detalha o estado do projeto e as especificações da Fase 6 (Extras opcionais) para implementação futura.

---

## 1. Estado do Projeto

- **Localização:** `gama/`
- **Execução local:**
  ```bash
  python3 -m http.server 8000 --directory gama
  # Acessar em http://127.0.0.1:8000/ ou abrir index.html diretamente no navegador
  ```
- **Fases concluídas:**
  - [x] Fase 1 — Fundação (Tokens, reset, tipografia, texturas, logotipo e monograma SVG).
  - [x] Fase 2 — Conteúdo estático (Todas as 12 seções estruturadas e semânticas).
  - [x] Fase 3 — Movimento (Lenis, GSAP, ScrollTrigger, máscaras, contadores, linha do método).
  - [x] Fase 4 — Interações (Menu mobile, acordeão FAQ, carrossel de depoimentos, validação de formulário demonstrativo).
  - [x] Fase 5 — Responsividade e polimento (Ajuste de espaçamentos mobile, correção de entrada do Hero sem rolagem, validação 360px a 1920px, reduced-motion).

---

## 2. Mapa de Arquivos

```
gama/
├── index.html               # Estrutura HTML5 semântica completa
└── assets/
    ├── CREDITOS.txt         # Atribuições de tipografia, bibliotecas e licenças
    ├── css/
    │   ├── tokens.css       # Variáveis de cor, tipografia e espaçamentos fluidos
    │   ├── base.css         # Reset, tipografia base, textura de fundo e seleções
    │   ├── layout.css       # Container, grid de 12 colunas, seções
    │   ├── components.css   # Botões, links, rótulos, formulário e acordeões
    │   ├── sections.css     # Estilos específicos de cada seção e media queries
    │   └── motion.css       # Estados iniciais para revelações GSAP e reduced motion
    ├── js/
    │   ├── main.js          # Ponto de entrada e orquestração do carregamento
    │   ├── scroll.js        # Lenis smooth scroll integrado ao ScrollTrigger
    │   ├── animations.js    # Entrada imediata do Hero, revelações, contadores, linha do método
    │   ├── ui.js            # Header dinâmico, menu mobile, FAQ e carrossel
    │   └── form.js          # Validação e feedback do formulário
    └── svg/
        ├── favicon.svg      # Favicon vetorial com monograma Γ
        ├── logotipo.svg     # Logotipo completo em serifada + descritor
        ├── monograma.svg    # Monograma Γ em traço fino dourado
        └── textura.svg      # Textura sutil de linhas de razão contábil
```

---

## 3. Especificações dos Extras (Fase 6)

### 3.1 Simulador de Regime Tributário
- **Objetivo:** Ferramenta interativa de conversão logo antes da seção de Modelos ou Formulário.
- **Entradas do usuário:**
  1. Faturamento mensal bruto (ex: R$ 30.000 a R$ 500.000).
  2. Atividade principal (Comércio, Serviços ou Indústria).
  3. Folha de pagamento mensal (para fator R).
- **Cálculo demonstrativo:**
  - Simples Nacional: aplicação da alíquota efetiva baseada no anexo correspondente.
  - Lucro Presumido: base de presunção (8% comércio / 32% serviços) + IRPJ (15% + adicional 10%), CSLL (9%), PIS (0,65%), COFINS (3%) + ISS/ICMS.
- **Saída:** Comparativo lado a lado indicando a alíquota estimada em cada regime e a potencial economia anual, seguido de CTA para auditoria real no formulário.

### 3.2 Calendário Fiscal
- **Objetivo:** Demonstrar acompanhamento ativo das rotinas do cliente em régua horizontal elegante.
- **Localização sugerida:** Imediatamente após a seção de Métodos ou Serviços.
- **Estrutura visual:** Lista tabular ou timeline horizontal com hairlines:
  - Dia 07: FGTS / SEFIP.
  - Dia 15: EFD-Reinf / DCTFWeb.
  - Dia 20: DAS (Simples Nacional) e Contribuição Previdenciária.
  - Dia 25: IPI / PIS / COFINS.
  - Último dia útil: IRPJ / CSLL trimestrais.
- **Interação:** Destaque dourado nos prazos do mês corrente e tooltip discreto com detalhes de cada obrigação.

### 3.3 Tela de Abertura Curta (Splash Monograma)
- **Objetivo:** Impacto visual premium na primeira visita do usuário.
- **Regras técnicas:**
  - Duração máxima estrita de 1,2s.
  - SVG do monograma Γ centralizado desenhado via `stroke-dasharray` / `stroke-dashoffset`.
  - Desaparecimento com fade-out rápido conectando com a animação `animarHero()`.
  - Gravação em `sessionStorage` para não repetir durante a mesma sessão de navegação.
  - Ignorar caso `prefers-reduced-motion: reduce` esteja ativo.

### 3.4 Faixa de Insights Contábeis
- **Objetivo:** Autoridade técnica e posicionamento consultivo.
- **Localização sugerida:** Antes dos depoimentos ou após segmentos.
- **Formato:** Grid editorial de 3 colunas (sem formato de blog genérico/cards com imagens coloridas):
  - Artigo 1: "Reforma Tributária e a Transição para o IBS/CBS: impactos no setor de serviços".
  - Artigo 2: "Fator R no Simples Nacional: como a folha pode reduzir a alíquota em até 9%".
  - Artigo 3: "Distribuição de lucros desproporcional e blindagem societária no Lucro Presumido".
- **Composição:** Data discreta em caixa-alta, título em Garamond e link com linha fina dourada expansível no hover.

### 3.5 Cursor Personalizado Discreto (Desktop)
- **Objetivo:** Refinamento de microinteração apenas para ponteiros finos (`@media (pointer: fine)`).
- **Especificações:**
  - Pequeno anel de 20px em traço dourado fino (1px) seguindo o cursor com desaceleração linear (lerp via `requestAnimationFrame`).
  - Ao passar o mouse sobre botões, links ou gatilhos de acordeão: o anel expande suavemente para 36px com opacidade reduzida e mescla.
  - Desativado completamente em telas sensíveis ao toque (`pointer: coarse`).
