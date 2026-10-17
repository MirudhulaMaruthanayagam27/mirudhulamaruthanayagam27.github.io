/* Portfolio interactions: mobile menu, typing effect, count-up stats, contact form. */
(function () {
  'use strict';

  // Messages from the contact form are delivered to this inbox by FormSubmit (formsubmit.co).
  // After the first message, FormSubmit emails you an activation link — click it once.
  const CONTACT_EMAIL = 'mirudhula864@gmail.com';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------------------------- mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const links = document.getElementById('nav-links');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    links.classList.toggle('is-open', open);
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  links.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav')) setMenu(false);
  });

  // Header border once the page scrolls.
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Highlight the menu link of the section on screen.
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]:not(.btn)')];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((a) => {
            const active = a.getAttribute('href') === '#' + entry.target.id;
            a.classList.toggle('is-active', active);
            if (active) a.setAttribute('aria-current', 'true');
            else a.removeAttribute('aria-current');
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => spy.observe(s));
  }

  // ---------------------------------------------------------------- typing effect
  const typing = document.querySelector('.typing__text');
  if (typing && !reduceMotion) {
    const roles = JSON.parse(typing.dataset.roles);
    let role = 0;
    let chars = roles[0].length;
    let deleting = true;

    const tick = () => {
      const word = roles[role];
      chars += deleting ? -1 : 1;
      typing.textContent = word.slice(0, chars);
      let delay = deleting ? 45 : 85;
      if (!deleting && chars === word.length) {
        deleting = true;
        delay = 1800; // pause on the full word
      } else if (deleting && chars === 0) {
        deleting = false;
        role = (role + 1) % roles.length;
        delay = 350;
      }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 2200);
  }

  // ---------------------------------------------------------------- count-up stats
  const counters = document.querySelectorAll('[data-count]');
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    if (reduceMotion) {
      el.textContent = target.toFixed(decimals);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !reduceMotion) {
    counters.forEach((el) => (el.textContent = (0).toFixed(parseInt(el.dataset.decimals || '0', 10))));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          countUp(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.6 },
    );
    counters.forEach((el) => io.observe(el));
  }

  // ---------------------------------------------------------------- project links not added yet
  document.querySelectorAll('a.is-pending').forEach((a) => {
    a.setAttribute('aria-disabled', 'true');
    a.title = a.dataset.pending;
    a.addEventListener('click', (e) => e.preventDefault());
  });

  // ---------------------------------------------------------------- contact form
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const button = form.querySelector('button[type="submit"]');
  const label = button.querySelector('.btn__label');

  function setError(input, message) {
    const field = input.closest('.field');
    let msg = field.querySelector('.field-error');
    field.classList.toggle('has-error', !!message);
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (message) {
      if (!msg) {
        msg = document.createElement('p');
        msg.className = 'field-error';
        msg.id = input.id + '-error';
        field.appendChild(msg);
      }
      msg.textContent = message;
      input.setAttribute('aria-describedby', msg.id);
    } else if (msg) {
      msg.remove();
      input.removeAttribute('aria-describedby');
    }
  }

  function validate() {
    const { name, email, message } = form.elements;
    const checks = [
      [name, name.value.trim().length >= 2 ? '' : 'Please enter your name.'],
      [email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()) ? '' : 'Please enter a valid email address.'],
      [message, message.value.trim().length >= 10 ? '' : 'Please write a message (at least 10 characters).'],
    ];
    checks.forEach(([input, msg]) => setError(input, msg));
    const firstBad = checks.find(([, msg]) => msg);
    if (firstBad) firstBad[0].focus();
    return !firstBad;
  }

  function showStatus(text, ok) {
    status.textContent = text;
    status.className = 'form-status ' + (ok ? 'is-ok' : 'is-error');
  }

  /** The visitor's own email app with everything filled in, so no message is ever lost. */
  function mailtoLink(name, email, message) {
    const subject = 'Portfolio message from ' + name;
    const body = message + '\n\n— ' + name + ' (' + email + ')';
    return 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  function showFallback(text, name, email, message) {
    showStatus(text + ' ', false);
    const a = document.createElement('a');
    a.className = 'btn btn--ghost btn--small form-fallback';
    a.href = mailtoLink(name, email, message);
    a.textContent = 'Send with my email app';
    status.appendChild(a);
  }

  form.addEventListener('input', (e) => {
    if (e.target.closest('.field.has-error')) setError(e.target, '');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    if (!validate()) return;
    if (form.elements._honey.value) return; // filled by a bot

    const { name, email, message } = form.elements;
    const values = [name.value.trim(), email.value.trim(), message.value.trim()];

    // FormSubmit only accepts messages from a website address, not from a page opened as a file.
    if (location.protocol === 'file:') {
      showFallback('The form sends messages once this site is online (e.g. on GitHub Pages). For now, use your email app:', ...values);
      return;
    }

    button.disabled = true;
    label.textContent = 'Sending…';
    try {
      const res = await fetch('https://formsubmit.co/ajax/' + CONTACT_EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: name.value.trim(),
          email: email.value.trim(),
          message: message.value.trim(),
          _replyto: email.value.trim(),
          _subject: 'Portfolio message from ' + name.value.trim(),
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && String(data.success) === 'true') {
        form.reset();
        showStatus('Thank you! Your message has been sent. I will reply to your email soon.', true);
      } else if (/activat/i.test(data.message || '')) {
        // First message ever: FormSubmit has emailed the site owner an "Activate Form" link.
        showFallback('The form is being set up. Please send your message with your email app for now:', ...values);
      } else {
        throw new Error(data.message || 'Could not send');
      }
    } catch (err) {
      console.error('Contact form:', err);
      showFallback('Sorry, the message could not be sent right now. You can send it with your email app instead:', ...values);
    } finally {
      button.disabled = false;
      label.textContent = 'Send message';
    }
  });

  // ---------------------------------------------------------------- footer year
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
