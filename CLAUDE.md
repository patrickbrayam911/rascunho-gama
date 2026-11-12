# CLAUDE.md — Gama Contabilidade (página de vendas)

Este arquivo é a fonte de verdade do projeto. Leia inteiro antes de criar qualquer arquivo. Em caso de dúvida entre uma instrução daqui e uma decisão sua, vale o que está aqui.

---

## 1. Contexto

- **Cliente:** Gama, escritório de contabilidade consultiva (nome fictício).
- **Objetivo da página:** converter empresários em pedidos de diagnóstico gratuito (formulário e WhatsApp).
- **Uso:** rascunho e apresentação. Todos os dados (números, nomes, CRC, endereço, depoimentos) são fictícios, mas devem parecer reais e coerentes.
- **Entrega:** um site de página única, abrindo direto no navegador, sem etapa de build.
- **Sensação que a página deve passar:** confiança, credibilidade, discrição, rigor. Um escritório que cuida do patrimônio do cliente, não uma startup.

## 2. Regras inegociáveis

1. Estética premium, preto com dourado.
2. Responsivo de verdade: celular primeiro, depois tablet e desktop.
3. Movimentos suaves ao rolar: elegantes, lentos, nunca chamativos.
4. **Não pode ter cara de IA nem de template.** Veja o checklist da seção 10. Ele é critério de aprovação.
5. Dados fictícios, mas nunca "lorem ipsum" nem textos genéricos.
6. Nada de frameworks. HTML, CSS e JavaScript puros, mais as bibliotecas listadas na seção 4.
7. Trabalhar em fases (seção 12). Ao fim de cada fase, mostrar o resultado e esperar aprovação antes de seguir.
8. Perguntar só o que for realmente ambíguo, no máximo três perguntas por vez.

---

## 3. Direção de arte

### 3.1 Conceito: o livro-razão de luxo

O tema visual vem do próprio ofício: o livro contábil. Isso dá identidade e afasta o visual genérico.

- **Linhas de razão:** linhas horizontais finas, como pauta de livro contábil, usadas como textura de fundo em baixa opacidade (6–8%) no hero e no rodapé.
- **Numeração:** itens numerados 01, 02, 03 em fonte serifada, alinhados como colunas de um balanço.
- **Colunas e réguas:** divisórias finas (hairlines) em vez de caixas e sombras.
- **Números em destaque:** valores grandes, em serifada, com alinhamento tabular.
- **Monograma Γ:** o "gama" grego como símbolo da marca.

### 3.2 Paleta (tokens)

| Papel | Nome | Valor |
|---|---|---|
| Fundo base | Preto Gama | #0B0B0C |
| Fundo elevado (blocos, painéis) | Grafite | #131315 |
| Linhas e divisórias | Hairline | #2A2A2E |
| Texto principal | Marfim | #F2EDE3 |
| Texto secundário | Areia | #A9A397 |
| Dourado principal | Champanhe | #C9A65C |
| Dourado claro (brilhos, hover) | Brilho | #E8D5A3 |
| Dourado profundo (bordas, sombras de detalhe) | Bronze | #8E6F2E |
| Seção clara (uma só) | Papel | #F3EEE4, com texto #141414 |
| Dourado para texto sobre fundo claro | Bronze escuro | #7A5C1E |

Regras de uso:
- Dourado é tempero: no máximo cerca de 10% da área visual. Aparece em linhas, números, uma palavra de destaque por título, botões principais e detalhes de marca.
- Proibido bloco grande de dourado chapado.
- Gradiente dourado metálico só em detalhes minúsculos (linha, selo, monograma).
- Texto pequeno nunca em dourado sobre fundo claro. Use o bronze escuro.
- Definir todas as cores como variáveis no início do CSS. Nenhuma cor solta nas seções.

### 3.3 Tipografia

- **Títulos:** Cormorant Garamond (serifada de contraste, peso 500 e 600, itálico para destaques). Alternativa se não agradar: Fraunces.
- **Corpo e interface:** Manrope (peso 400, 500, 600).
- **Rótulos pequenos (eyebrows):** Manrope em caixa-alta, 11–12px, espaçamento entre letras generoso, cor dourada.
- Escala fluida: títulos grandes no desktop, reduzindo suavemente no celular, sem saltos bruscos.
- Corpo com entrelinha confortável (cerca de 1,6) e largura de linha limitada (60–70 caracteres).
- Máximo de duas famílias. Máximo de três pesos por família.

### 3.4 Marca

- **Logotipo:** a palavra GAMA em serifada, caixa-alta, com bastante espaçamento entre letras, mais o descritor "Contabilidade Consultiva" em Manrope pequena abaixo.
- **Monograma:** letra Γ (gama maiúscula) desenhada em SVG, traço fino dourado, usada no logotipo, no favicon, no hero (gigante e cortada) e no rodapé.
- Criar logotipo e monograma como arquivos SVG próprios, simples e nítidos.

### 3.5 Imagens e ícones

- **Fotos (Unsplash ou Pexels, licença livre):** arquitetura corporativa, fachadas, escritórios vazios e luz natural, texturas de papel e mármore escuro. Tratamento padrão: preto e branco, overlay preto de cerca de 40% e leve toque quente.
- **Retratos dos sócios:** tratamento duotone preto e dourado. Se não houver foto adequada, usar placeholder elegante (silhueta tipográfica com as iniciais), nunca foto genérica sorridente.
- **Proibido:** aperto de mão, setas de gráfico subindo, calculadora com moedas, pessoa sorrindo diante de laptop, ilustrações vetoriais coloridas.
- **Ícones:** poucos. Traço fino de 1px, dourado, desenhados em SVG. Nada de ícones em círculos coloridos.
- Formato WebP, lazy-loading, largura e altura declaradas (evita pulo de layout), texto alternativo descritivo.
- Registrar a origem das imagens em `assets/CREDITOS.txt`.

### 3.6 Forma, textura e profundidade

- Cantos retos ou muito leves (2–4px). Sem botões em formato de pílula.
- Quase sem sombra. A profundidade vem de camadas de preto/grafite, hairlines e um brilho dourado muito sutil.
- Uma textura de granulado fino sobre o fundo escuro, quase imperceptível (2–3% de opacidade), para tirar o aspecto digital chapado.

---

## 4. Stack e ferramentas

- **Base:** HTML5 semântico, CSS3 (variáveis, grid, flexbox), JavaScript puro em módulos.
- **Bibliotecas via CDN, com versão fixa:**
  - **Lenis:** rolagem suave.
  - **GSAP + ScrollTrigger:** animações atreladas à rolagem.
  - **SplitType (opcional):** dividir títulos em linhas e palavras para revelar texto.
- **Fontes:** Google Fonts, com preconnect e exibição por troca (swap).
- **Sem:** React, Vue, Tailwind, jQuery, bundlers.
- **Melhoria progressiva:** se uma biblioteca falhar ao carregar, a página continua legível e funcional, só sem animação.
- **Ferramentas de apoio (para o usuário e para revisão):** DevTools do navegador com modo dispositivo, Lighthouse, Coolors ou Realtime Colors para testar a paleta, Figma só se for preciso desenhar wireframe.

## 5. Estrutura de arquivos

```
gama/
├─ CLAUDE.md
├─ index.html
└─ assets/
   ├─ css/
   │  ├─ tokens.css      cores, tipografia, espaçamentos, durações e curvas de animação
   │  ├─ base.css        reset, tipografia base, textura de fundo, foco visível
   │  ├─ layout.css      container, grid de 12 colunas, espaçamentos de seção
   │  ├─ components.css  botões, links, eyebrows, divisórias, acordeão, formulário
   │  ├─ sections.css    estilos específicos de cada seção
   │  └─ motion.css      estados iniciais e finais das animações, reduced motion
   ├─ js/
   │  ├─ main.js         ponto de entrada, inicializa tudo
   │  ├─ scroll.js       Lenis e integração com ScrollTrigger
   │  ├─ animations.js   reveals, parallax, linha do método, contadores
   │  ├─ ui.js           header, menu mobile, acordeões, carrossel, botão flutuante
   │  └─ form.js         validação e estado de sucesso (demonstrativo, sem backend)
   ├─ img/
   ├─ svg/               logotipo, monograma, ícones
   └─ CREDITOS.txt
```

Regras: uma responsabilidade por arquivo; nomes de classe em português, curtos e consistentes (um padrão só, por exemplo bloco__elemento); nada de CSS ou JS dentro do HTML; comentários só onde a intenção não é óbvia.

---

## 6. Arquitetura da página (ordem das seções)

Ritmo geral: fundo escuro em quase tudo, uma única seção clara (Método) para quebrar a monotonia. Cada seção usa uma estrutura diferente das vizinhas.

### 6.1 Header (fixo)
- Esquerda: logotipo. Centro: Serviços, Método, Segmentos, Modelos, Sobre, Contato. Direita: botão "Falar com um especialista".
- Sobre o hero: transparente. Depois de rolar cerca de 80px: fundo preto a 85% com desfoque leve e linha dourada fina embaixo.
- Some ao rolar para baixo e volta ao rolar para cima.
- Celular: botão de menu abre tela cheia, links grandes em serifada, entrada escalonada.

### 6.2 Hero (altura da tela)
- Fundo preto com linhas de razão em baixa opacidade e o monograma Γ gigante em contorno dourado, cortado na borda direita, com parallax lento.
- Eyebrow: "Contabilidade consultiva · desde 2009".
- Título em duas linhas, uma palavra em dourado itálico. Sugestão: "Números em ordem. Decisões com segurança."
- Subtítulo curto (duas linhas): fala de gestão contábil, fiscal e tributária para quem não pode errar diante do Fisco.
- Dois botões: "Agendar diagnóstico gratuito" (principal) e "Conhecer os serviços" (secundário, só texto com linha).
- Base do hero: três indicadores discretos (registro no CRC, atendimento em todo o Brasil, resposta em até 2h úteis) e uma linha dourada animada convidando a rolar.

### 6.3 Faixa de números
- Quatro indicadores lado a lado, separados por linhas verticais finas: anos de atuação, empresas atendidas, economia tributária identificada (valor em reais), retenção anual de clientes.
- Números grandes em serifada, contagem animada ao entrar na tela.

### 6.4 O que costuma custar caro (dores)
- Título fixo à esquerda (sticky) e, à direita, lista numerada 01 a 05 separada por hairlines. Nada de cards.
- Situações reais: regime tributário errado pagando imposto a mais; multa por obrigação acessória em atraso; balanço que ninguém consegue ler; folha com risco trabalhista; contador que só aparece no fechamento.
- Cada linha revela ao rolar. No hover, a linha desloca poucos pixels e o número acende em dourado.

### 6.5 Serviços
- Desktop: duas colunas. À esquerda, lista dos serviços em serifada grande; à direita, painel que muda ao passar o mouse ou clicar, com descrição, entregáveis e "para quem é".
- Celular: acordeão.
- Serviços: Contabilidade Consultiva; Planejamento Tributário; Fiscal e Obrigações Acessórias; Departamento Pessoal e eSocial; Abertura, Alteração e Legalização; BPO Financeiro.

### 6.5.1 Citação de autoridade (faixa curta)
- Uma frase grande em serifada, de um dos sócios, sobre fundo preto com respiro generoso. Funciona como pausa de ritmo entre serviços e método.

### 6.6 Método (seção clara)
- Fundo Papel, texto escuro, detalhes em bronze escuro.
- Quatro etapas em linha do tempo vertical: Diagnóstico, Estruturação, Rotina de acompanhamento, Revisão estratégica.
- Uma linha dourada vai sendo desenhada conforme a rolagem e acende cada ponto. Cada etapa tem título, descrição curta e prazo típico.

### 6.7 Segmentos atendidos
- Lista tipográfica grande em duas colunas: Comércio, Serviços e profissionais liberais, Clínicas e saúde, Indústria, Tecnologia, Construção e imobiliário.
- No hover, aparece uma frase curta sobre a dor típica daquele segmento. No celular, a frase fica sempre visível em texto menor.

### 6.8 Modelos de atendimento (planos)
- Três modelos: Essencial (Simples Nacional), Estratégico (Lucro Presumido, destacado como "mais escolhido"), Corporativo (Lucro Real e grupos).
- O do meio é maior e tem borda dourada; os outros dois ficam mais discretos. Valores "a partir de" (fictícios) e botão para cada um.
- Linha abaixo: "Não sabe qual é o seu? Fazemos o diagnóstico sem custo."

### 6.9 Sobre e sócios
- Texto institucional curto (história, postura, ética).
- Três sócios com retrato duotone, nome, formação e registro no CRC fictício. Leve parallax nas fotos.
- Faixa de credenciais: registro no CRC, sigilo profissional, conformidade com a LGPD.

### 6.10 Depoimentos
- Citação grande em serifada, um depoimento por vez, com troca por seta ou arraste. Sem rotação automática agressiva.
- Cada um traz nome, cargo, empresa e um resultado numérico específico (por exemplo, redução de carga tributária).

### 6.11 Perguntas frequentes
- Acordeão com abertura suave, sete perguntas: migração de outra contabilidade; prazo da migração; atendimento fora da cidade sede; rotina de atendimento; troca de regime tributário; forma de cobrança dos honorários; segurança dos dados.

### 6.12 Chamada final e formulário
- Bloco escuro com brilho dourado quase imperceptível ao fundo.
- Título: "Descubra quanto sua empresa pode estar pagando a mais."
- Formulário curto: nome, empresa, faturamento mensal (faixas), WhatsApp, regime atual, botão "Solicitar diagnóstico gratuito".
- Ao lado: contato direto (WhatsApp, e-mail, telefone, horário de atendimento).
- Validação inline e estado de sucesso elegante. É demonstrativo, sem envio real.

### 6.13 Rodapé
- Logotipo, endereço, CRC e CNPJ fictícios, links de navegação, redes sociais.
- Linha discreta: "Página de demonstração. Todos os dados são fictícios."
- Botão flutuante de WhatsApp: circular, preto com borda dourada (não usar o verde padrão), aparece só depois do hero.

---

## 7. Movimento

Princípio: o movimento serve à leitura. Se chama mais atenção que o conteúdo, reduza.

- **Rolagem suave (Lenis):** duração cerca de 1,2s com desaceleração exponencial. No celular, manter a rolagem nativa do toque.
- **Revelação padrão:** opacidade de 0 a 1 e deslocamento vertical de cerca de 28px até a posição final, 0,9s, desaceleração suave. Elementos irmãos entram em sequência com intervalo de 0,08 a 0,12s. Dispara quando o elemento atinge cerca de 85% da altura da tela, uma única vez.
- **Títulos grandes:** revelados linha a linha, com máscara (o texto sobe de trás de uma linha invisível).
- **Linhas douradas:** abaixo de cada título de seção, a linha se desenha da esquerda para a direita ao entrar.
- **Parallax:** só no monograma do hero e nos retratos. Deslocamento máximo de 8 a 12%.
- **Contadores:** 1,6s, desaceleração no final.
- **Linha do método:** vinculada à rolagem (acompanha a posição do usuário).
- **Header:** transição suave entre transparente, sólido e escondido (0,4s).
- **Hover:**
  - Botões principais: preenchimento dourado que sobe de baixo para cima em 0,4s.
  - Links: sublinhado dourado que cresce da esquerda.
  - Linhas de lista: pequeno deslocamento horizontal e acendimento do número.
- **Proibido:** efeito elástico (bounce), giro, tremor, zoom exagerado, qualquer animação acima de 1,2s que atrase a leitura, animação em loop contínuo chamativa.
- **Desempenho:** animar apenas deslocamento e opacidade. Nada de animar largura, altura ou margens.
- **Acessibilidade de movimento:** quando o sistema pedir redução de movimento, tudo aparece de imediato, sem animação, sem parallax e sem rolagem suave.
- **Celular:** reduzir distâncias, desligar parallax e encurtar durações em cerca de 20%.

## 8. Responsividade

- Mobile-first. Pontos de quebra de referência: 640, 1024 e 1440px; ajustar pelo conteúdo, não pelo número.
- Testar em 360, 390, 768, 1024, 1280, 1440 e 1920px.
- Largura máxima do conteúdo em torno de 1240px; margens laterais de 20px no celular e 40px ou mais no desktop.
- Layouts assimétricos do desktop viram coluna única no celular, mantendo a ordem de leitura.
- Hero usa altura dinâmica da tela (evita salto com a barra do navegador no celular).
- Alvos de toque de no mínimo 44px.
- Zero rolagem horizontal em qualquer largura.
- Espaço vertical entre seções: 120 a 160px no desktop, 72 a 96px no celular.
- Imagens com tamanhos adequados a cada largura.

## 9. Conteúdo e dados fictícios

**Tom de voz:** sóbrio, direto, frases curtas. Vocabulário técnico dosado (Simples Nacional, Lucro Presumido, DAS, SPED, eSocial, DCTF), sem jargão vazio. Sem ponto de exclamação, sem emoji. Evitar "soluções inovadoras", "excelência", "sinergia", "transformamos seu futuro".

**Dados de apoio (todos fictícios):**
- Nome: Gama Contabilidade. Fundação: 2009. Sede: São Paulo/SP, endereço de exemplo.
- CRC da empresa: CRC-SP 000000/O-0. CNPJ: 00.000.000/0001-00.
- Telefone: (11) 4000-0000. WhatsApp: (11) 90000-0000. E-mail: contato@gamacontabil.example.
- Indicadores: 16 anos de atuação; mais de 480 empresas atendidas; economia tributária identificada de cerca de R$ 62 milhões; retenção anual de 98%.
- Sócios: Helena Vasconcelos (contadora, sócia-fundadora), Ricardo Amaral (tributarista), Marina Tavares (departamento pessoal e trabalhista), cada um com registro fictício.
- Depoimentos: três, de empresários de segmentos diferentes (comércio, clínica, tecnologia), cada um com um resultado numérico específico e verossímil.
- Faixas de preço dos modelos: valores "a partir de", em reais, coerentes entre si.

---

## 10. Checklist anti-"cara de IA" (critério de aprovação)

Antes de entregar cada fase, confira todos os itens:

- [ ] Nenhum gradiente roxo, azul ou neon. Sem brilho colorido exagerado.
- [ ] Glassmorphism só no header, e discreto.
- [ ] Nenhuma sequência de três cards idênticos com ícone em círculo. Cada seção usa uma estrutura diferente (lista editorial, painel interativo, linha do tempo, citação).
- [ ] Nenhum emoji, nenhum ícone colorido.
- [ ] Nenhuma foto de banco de imagens "corporativa genérica".
- [ ] Nem tudo centralizado: alinhamento à esquerda e assimetria controlada, com grade coerente.
- [ ] Dourado usado com moderação (seção 3.2).
- [ ] Cantos retos, quase nenhuma sombra, hairlines como principal recurso de separação.
- [ ] Copy específica do universo contábil, sem frases que serviriam para qualquer empresa.
- [ ] Sem padrões de texto de IA nos títulos: "Não é X, é Y", listas de três adjetivos, abuso de travessão.
- [ ] Respiro generoso entre seções e ritmo variado de densidade.
- [ ] Detalhes artesanais consistentes: numeração em serifada, rótulos em caixa-alta espaçada, réguas douradas, microinterações coerentes.
- [ ] Teste final: se alguém olhar e pensar "isso é um template", refazer a seção.

## 11. Acessibilidade e desempenho

- HTML semântico (header, nav, main, section, footer), uma única h1, hierarquia de títulos correta.
- Contraste mínimo AA em todos os textos.
- Foco visível em todos os elementos interativos, em dourado.
- Menu, acordeões e carrossel operáveis pelo teclado, com atributos de acessibilidade adequados.
- Formulário com rótulos reais, mensagens de erro claras e foco levado ao primeiro erro.
- Meta tags, título e descrição da página, favicon (monograma), imagem de compartilhamento.
- Lighthouse de 90 ou mais em desempenho, acessibilidade e boas práticas, no celular.
- Fontes com poucos pesos, imagens em WebP, scripts carregados sem bloquear a renderização.

---

## 12. Fases de trabalho

Ao final de cada fase: resumir em poucas linhas o que foi feito, mostrar como abrir e esperar aprovação.

1. **Fundação:** tokens, fontes, reset, grid, textura, logotipo e monograma em SVG, header e rodapé base.
2. **Conteúdo estático:** todas as seções na ordem da seção 6, mobile-first, com a copy final fictícia, sem animação.
3. **Movimento:** rolagem suave, revelações, linhas douradas, contadores, linha do método, parallax, comportamento do header.
4. **Interações:** menu mobile, painel de serviços, acordeão do FAQ, carrossel de depoimentos, formulário, botão flutuante.
5. **Responsivo e polimento:** testes em todas as larguras, ajuste fino de espaçamentos, redução de movimento, Lighthouse, revisão do checklist da seção 10.
6. **Extras:** só se o usuário aprovar (seção 13).

## 13. Ideias extras (opcionais, só com aprovação)

1. **Simulador de regime tributário:** três campos (faturamento mensal, atividade, folha) e uma estimativa ilustrativa comparando Simples Nacional e Lucro Presumido, com aviso claro de que é demonstrativa. Forte para conversão.
2. **Calendário fiscal:** próximos vencimentos (DAS, DCTF, eSocial) em uma faixa elegante, mostrando que o escritório acompanha a rotina do cliente.
3. **Tela de abertura curta:** o monograma Γ sendo desenhado em até 1,2s, apenas na primeira visita.
4. **Faixa de insights:** três artigos fictícios (por exemplo, o que revisar na empresa antes do fim do ano).
5. **Cursor personalizado discreto:** apenas no desktop, um pequeno anel dourado que reage aos links.

## 14. Definição de pronto

- [ ] Todas as seções da seção 6 presentes, com dados fictícios coerentes.
- [ ] Funciona e tem boa aparência de 360px a 1920px, sem rolagem horizontal.
- [ ] Movimentos suaves, sem travamentos, e página usável com movimento reduzido.
- [ ] Checklist anti-IA (seção 10) todo marcado.
- [ ] Lighthouse de 90 ou mais no celular.
- [ ] Créditos das imagens registrados.
- [ ] Abre direto no navegador pelo `index.html`, sem passos extras.
