document.querySelector("#user-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const user = document.querySelector("#username").value;

  fetch(`http://localhost:3000/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user }),
  })
    .then(response => response.json())
    .then(data => {
      var totpSecret = data.totpURI;

      var qrcodeElement = document.getElementById("qrcode");
      qrcodeElement.innerHTML = "";

      // Gera o novo QR code
      new QRCode(qrcodeElement, {
        text: totpSecret,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#cccccc"
      });
    }).then(() => {
      document.querySelector('#totp-section').style.display = 'flex';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

document.querySelector("#totp-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const user = document.querySelector("#username").value;
  const token = document.querySelector("#token").value;

  fetch(`http://localhost:3000/api/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, token }),
  })
    .then(response => response.json())
    .then(data => {
      const status = data.Status;

      const result = document.querySelector('div.result');

      result.classList.remove('Success', 'Invalid');
      result.classList.add(status);
      result.innerHTML = status === 'Success' ? 'Aprovado' : 'Recusado';
      result.style.display = 'flex';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
