/**
 * form.js — Validação inline e estado de sucesso (demonstrativo, sem envio real)
 */

function validarCampo(campo) {
  const input = campo.querySelector('input, select');
  if (!input) return true;

  const erro = campo.querySelector('.campo__erro');
  let valido = true;
  let mensagem = '';

  if (input.required && !input.value.trim()) {
    valido = false;
    mensagem = 'Campo obrigatório.';
  } else if (input.type === 'tel' && input.value.trim()) {
    const tel = input.value.replace(/\D/g, '');
    if (tel.length < 10 || tel.length > 11) {
      valido = false;
      mensagem = 'Informe um número com DDD (10 ou 11 dígitos).';
    }
  }

  if (erro) {
    erro.textContent = mensagem;
    erro.hidden = valido;
  }
  input.setAttribute('aria-invalid', valido ? 'false' : 'true');
  return valido;
}

function formatarTelefone(input) {
  const nums = input.value.replace(/\D/g, '').slice(0, 11);
  if (nums.length <= 10) {
    input.value = nums.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else {
    input.value = nums.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }
}

export function iniciarFormulario() {
  const form = document.querySelector('.formulario__form');
  if (!form) return;

  const camposTel = form.querySelectorAll('input[type="tel"]');
  camposTel.forEach((input) => {
    input.addEventListener('input', () => formatarTelefone(input));
  });

  // Validação ao sair de cada campo
  form.querySelectorAll('.campo').forEach((campo) => {
    const input = campo.querySelector('input, select');
    if (!input) return;
    input.addEventListener('blur', () => validarCampo(campo));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let primeiroErro = null;
    let tudo = true;

    form.querySelectorAll('.campo').forEach((campo) => {
      const ok = validarCampo(campo);
      if (!ok && !primeiroErro) primeiroErro = campo.querySelector('input, select');
      if (!ok) tudo = false;
    });

    if (!tudo) {
      primeiroErro?.focus();
      return;
    }

    // Estado de sucesso
    const contato = document.querySelector('.contato__bloco');
    const sucesso = document.querySelector('.formulario__sucesso');
    if (sucesso) {
      form.setAttribute('aria-hidden', 'true');
      form.style.display = 'none';
      sucesso.hidden = false;
      sucesso.focus();
    }
  });
}
