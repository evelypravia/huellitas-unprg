const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.textContent = open ? 'Cerrar' : 'Menú';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = 'Menú';
}));

// ===== Formulario de suscripción (sección Contáctanos) =====
const signupForm = document.querySelector('.signup form');
signupForm?.addEventListener('submit', event => {
  event.preventDefault();
  const email = event.currentTarget.email.value;
  signupForm.querySelector('.form-message').textContent = `¡Gracias! Enviaremos la guía a ${email}.`;
  event.currentTarget.reset();
});

// ===== Formulario de registro de donación (sección Donaciones-Insumos) =====
// Reemplaza FORM_ID_AQUI por el Form ID que te da forminit.com al crear tu cuenta y tu formulario
const FORMINIT_FORM_ID = 'lkk0x97t1tp';
const forminit = typeof Forminit !== 'undefined' ? new Forminit() : null;

const donacionForm = document.getElementById('form-donacion');
donacionForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const mensaje = donacionForm.querySelector('.form-message');
  const boton = donacionForm.querySelector('button[type="submit"]');

  mensaje.textContent = 'Enviando registro...';
  boton.disabled = true;

  try {
    const formData = new FormData(donacionForm);
    const { error } = await forminit.submit(FORMINIT_FORM_ID, formData);

    if (!error) {
      mensaje.textContent = '¡Gracias! Tu registro de donación fue enviado correctamente.';
      donacionForm.reset();
    } else {
      mensaje.textContent = 'Hubo un problema al enviar el registro. Intenta nuevamente.';
      console.error(error);
    }
  } catch (error) {
    mensaje.textContent = 'No se pudo conectar. Revisa tu internet e intenta de nuevo.';
    console.error(error);
  } finally {
    boton.disabled = false;
  }
});
