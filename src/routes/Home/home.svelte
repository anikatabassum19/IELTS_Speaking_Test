<script>
 // (state, methods, etc.)
</script>

<style>
  .home-section {
    padding: 20px;
    text-align: center;
  }

  .home-section h1 {
    font-size: 2em;
    color: #333;
  }

  .home-section p {
    font-size: 1.2em;
    margin-bottom: 20px;
  }

  button {
    padding: 10px 20px;
    font-size: 1.1em;
    background-color: #f39c12;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }

  button:hover {
    background-color: #e67e22;
  }
</style>

<section class="home-section">
  <h1>Welcome to TalkSmart!</h1>
  <p>Your free IELTS Speaking Test App</p>
  <button on:click={() => alert('Start the Test!')}>Start Test</button>
</section>
