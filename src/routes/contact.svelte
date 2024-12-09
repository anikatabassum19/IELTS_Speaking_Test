<script>
  export let title = "Contact Us";

  let name = '';
  let email = '';
  let Messages = '';
  let error = '';



  // @ts-ignore
  async function handleContactus(event) {
    event.preventDefault();

    try {
      const response = await fetch('api/contactUs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, messages: Messages}),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Thank you for contacting with us')
      } else {
        error = result.error || 'Something went wrong!';
      }
    } catch (err) {
      error = 'Connection Problem';
    }
  }

</script>

<div class="contact-container">
  <h1>{title}</h1>
  <p>
    We'd love to hear from you! Feel free to reach out to us with any questions, feedback, or suggestions.
  </p>
  <form class="contact-form" on:submit|preventDefault={handleContactus}>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" bind:value={name} placeholder="Your name" required />

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" bind:value={email} placeholder="Your email" required />

    <label for="message">Message:</label>
    <textarea id="message" name="Messages" bind:value={Messages} placeholder="Your message" rows="5" required></textarea>

    <p class="error-message" style="color: red;">{error}</p>

    <button type="submit">Submit</button>
  </form>
</div>

<style>
  .contact-container {
    display: flex;              /* Enable Flexbox */
    flex-direction: column;     /* Stack children vertically */
    justify-content: center;    /* Center children vertically */
    align-items: center;        /* Center children horizontally */
    text-align: center;         /* Center text */
    height: 60vh;               /* Set the height to 60% of the viewport height */
    margin: 0;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 1.8em;           /* Slightly smaller font */
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1em;           /* Slightly smaller font */
    color: #555;
    margin-bottom: 20px;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    align-items: center;        /* Center the form elements */
    width: 100%;
    max-width: 600px;           /* Optional: Limit the form width */
  }

  .contact-form label {
    font-size: 1em;
    margin-bottom: 5px;
    color: #333;
    text-align: left;           /* Left align the labels */
    width: 100%;
  }

  .contact-form input,
  .contact-form textarea {
    margin-bottom: 15px;
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }

  .contact-form button {
    padding: 10px 20px;
    font-size: 1em;
    color: white;
    background-color: #f39c12;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .contact-form button:hover {
    background-color: #e67e22;
  }
</style>
