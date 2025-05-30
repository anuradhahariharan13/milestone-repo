let client;

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', renderText);
}

async function renderText() {
  const textElement = document.getElementById('apptext');
  const gravatarImg = document.getElementById('gravatar');

  try {
    const contactData = await client.data.get('contact');
    const {
      contact: { name, email }
    } = contactData;

    textElement.innerHTML = `Ticket is created by ${name}`;

    if (email) {
      const gravatarHash = CryptoJS.MD5(email.trim().toLowerCase());
      const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}?s=200`;
      gravatarImg.src = gravatarUrl;
    } else {
      gravatarImg.alt = "Email not available";
    }
  } catch (err) {
    console.error("Failed to get contact data:", err);
    textElement.innerHTML = "Failed to load contact info.";
  }
}
