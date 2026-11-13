(function () {
  'use strict';

  var endpoint = 'https://api.web3forms.com/submit';
  var placeholderPattern = /^PASTE_[A-Z0-9_]+_HERE$/;

  function getStatus(form) {
    var status = form.querySelector('.idt-form-status');
    if (!status) {
      status = document.createElement('p');
      status.className = 'idt-form-status';
      form.appendChild(status);
    }
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    return status;
  }

  function setStatus(status, message, isError) {
    status.hidden = false;
    status.textContent = message;
    status.dataset.state = isError ? 'error' : 'success';
  }

  function initializeForm(form) {
    var submitButton = form.querySelector('button[type="submit"]');
    var status = getStatus(form);
    var accessKey = form.querySelector('input[name="access_key"]');

    if (!accessKey || !submitButton) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (form.dataset.submitting === 'true') return;

      if (placeholderPattern.test(accessKey.value.trim())) {
        setStatus(status, 'This form is not configured yet. Add its Web3Forms access key before submitting.', true);
        return;
      }

      form.dataset.submitting = 'true';
      submitButton.disabled = true;
      setStatus(status, 'Sending your inquiry…', false);

      var payload = new FormData(form);
      payload.set('subject', form.dataset.web3formsSubject);

      fetch(form.action || endpoint, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          return response.json().then(function (data) {
            if (!response.ok || data.success !== true) {
              throw new Error(data.message || 'The form service could not accept this inquiry.');
            }
            return data;
          });
        })
        .then(function () {
          setStatus(status, 'Your inquiry was sent successfully.', false);
          form.reset();
          submitButton.disabled = true;
        })
        .catch(function (error) {
          setStatus(status, error.message || 'The inquiry could not be sent. Please try again.', true);
          form.dataset.submitting = 'false';
          submitButton.disabled = false;
        });
    });
  }

  function initialize() {
    document.querySelectorAll('form[data-web3forms-subject]').forEach(initializeForm);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
