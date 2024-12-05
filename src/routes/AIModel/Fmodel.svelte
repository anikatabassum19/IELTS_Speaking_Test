<script>
  import { onMount } from 'svelte';
  import { showAIModel } from '../../stores/showAIModel.js'; // Import the store
  import { testStarted } from '../../stores/testState.js'; // Make sure the import is correct

  let isTestStarted = false;
  let userResponse = "";
  let aiMessage = "Hello! I am your AI assistant. How can I help you today?";

  let synth;
  let recognition;

  // Function to start speech recognition
  const startRecognition = () => {
    if (recognition) {
      recognition.start();
    }
  };

  // Function to stop the test
  const stopTest = () => {
    testStarted.set(false); // Make sure test state is updated to false
    aiMessage = "Hello! I am your AI assistant. How can I help you today?";
  };

  // Watch for the test state
  $: if ($testStarted && !isTestStarted) {
    startTest();
  }

  // Trigger when test is started
  const startTest = () => {
    isTestStarted = true; // Ensure test is marked as started
    aiMessage = "Let's begin! Please introduce yourself.";
    speak(aiMessage);
  };

  // Function to simulate the AI's speech response
  const speak = (message) => {
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.voice = synth.getVoices().find(voice => voice.name === 'Google UK English Female');
      synth.speak(utterance);
    }
  };

  // Analyze the fluency of the user's speech (dummy example for now)
  const analyzeFluency = (response) => {
    if (response.length < 5) {
      aiMessage = "Your response is too short. Please elaborate.";
    } else if (response.includes("fluently")) {
      aiMessage = "Great! You're speaking fluently.";
    } else {
      aiMessage = "Your fluency is good, but try to speak a bit more clearly.";
    }

    // Speak the AI's analysis
    speak(aiMessage);
  };

  // Initialize speech synthesis and recognition objects when component mounts
  onMount(() => {
    if (typeof window !== "undefined") {
      synth = window.speechSynthesis;
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.onresult = (event) => {
        userResponse = event.results[0][0].transcript;
        analyzeFluency(userResponse);
      };
    }
  });
</script>

{#if $testStarted}
  <div class="ai-model">
    <div class="ai-message">
      <p>{aiMessage}</p>
    </div>
    <div class="user-response">
      <p><strong>Your Response:</strong> {userResponse}</p> <!-- Display user response -->
    </div>
    <button on:click={startRecognition}>Speak Now</button> <!-- Added Speak Now button -->
  </div>
{/if}

<style>
  .ai-model {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .ai-message {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
  }

  .user-response {
    margin-bottom: 20px;
    font-size: 16px;
  }

  .ai-model button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 20px;
  }
</style>
