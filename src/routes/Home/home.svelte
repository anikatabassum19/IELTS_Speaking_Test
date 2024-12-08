<script>

 import { showAIModel } from '../../stores/showAIModel.js'; // Import the store
 import { testStarted } from '../../stores/testState.js';
  const startTest = () => {
    showAIModel.set(true); // Set the store value to true
    testStarted.set(true);
  };

   // Function to stop the test
  const stopTest = () => {
    testStarted.set(false); // Make sure test state is updated to false
    const aiMessage = "Hello! I am your AI assistant. How can I help you today?";
  };
  
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
  {#if $testStarted}
  <button on:click={stopTest}>Stop Test </button>
  {:else}
  <button on:click={startTest}>Start Test </button>
  {/if}
</section>
