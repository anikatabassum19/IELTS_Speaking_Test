<script>
  import { onMount } from 'svelte';
  import { showAIModel } from '../../stores/showAIModel.js';
  import { testStarted } from '../../stores/testState.js';

  let isTestStarted = false;
  let userResponse = "";
  let aiMessage = "Hello! I am your AI assistant. How can I help you today?";
  let synth, recognition, conversationTimer;
  let totalScore = 100; // Start with 100 and deduct marks
  let isTestComplete = false;
  let responseCount = 0;

  // Initialize speech synthesis and recognition
  onMount(() => {
    if (typeof window !== "undefined") {
      synth = window.speechSynthesis;
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.onresult = async (event) => {
        userResponse = event.results[0][0].transcript;
        await processResponse(userResponse);
      };
    }
  });

  // Start the test
  const startTest = () => {
    isTestStarted = true;
    aiMessage = "Let's begin! Please introduce yourself.";
    speak(aiMessage);

    // Start a timer for 5 minutes (300,000 ms)
    conversationTimer = setTimeout(() => {
      endTest();
    }, 300000);
  };

  // End the test
  const endTest = () => {
    clearTimeout(conversationTimer);
    isTestComplete = true;
    const resultMessage = totalScore > 50 
      ? "Congratulations! You passed with a score of " + totalScore + "."
      : "You scored " + totalScore + ". Please try again.";
    aiMessage = resultMessage;
    speak(aiMessage);
    testStarted.set(false);
  };

  // Grammar checking function
  const checkGrammarLocally = async (text) => {
  // Assuming you're using LanguageTool API
  try {
    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `text=${encodeURIComponent(text)}&language=en`,
    });

    const data = await response.json();

    // If there are grammar issues, it will return a list of matches
    return data.matches.length; // Return the number of issues found
  } catch (error) {
    console.error("Grammar check failed:", error);
    return 0; // In case of failure, assume no grammar issues
  }
};


  // Analyze sentiment
  const analyzeSentiment = (text) => {
    const words = text.split(/\s+/).length; // Simulate sentiment based on words
    return words > 15 ? "Positive" : "Neutral";
  };

  // Process user response
  const processResponse = async (response) => {
  try {
    // Grammar check
    const grammarIssues = await checkGrammarLocally(response);
    
    // Ensure grammarIssues is a number
    const validGrammarIssues = !isNaN(grammarIssues) ? grammarIssues : 0;
    
    totalScore -= validGrammarIssues * 5; // Deduct 5 marks per grammar issue
    
    const grammarMessage = validGrammarIssues > 0
      ? `Found ${validGrammarIssues} grammar issues.` 
      : "No grammar issues found.";

    // Sentiment analysis
    const sentiment = analyzeSentiment(response);
    const sentimentMessage = `Sentiment detected: ${sentiment}.`;

    aiMessage = `${grammarMessage} ${sentimentMessage} Your score: ${totalScore}.`;
    speak(aiMessage);

    responseCount++;

    // Check if test should end early
    if (responseCount >= 5) {
      endTest();
    }
  } catch (error) {
    console.error("Error processing response:", error);
    aiMessage = "There was an error analyzing your response. Please try again.";
    speak(aiMessage);
  }
};


  // Simulate AI speech
  const speak = (message) => {
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.voice = synth.getVoices().find(voice => voice.name === 'Google UK English Female');
      synth.speak(utterance);
    }
  };

  // Stop the test manually
  const stopTest = () => {
    clearTimeout(conversationTimer);
    isTestStarted = false;
    aiMessage = "Test has been stopped.";
    speak(aiMessage);
    testStarted.set(false);
  };

  // Start recognition
  const startRecognition = () => {
    if (recognition) recognition.start();
  };

  // Watch test state
  $: if ($testStarted && !isTestStarted) startTest();
</script>

{#if $testStarted}
  <div class="ai-model">
    {#if !isTestComplete}
      <div class="ai-message">
        <p>{aiMessage}</p>
      </div>
      <div class="user-response">
        <p><strong>Your Response:</strong> {userResponse}</p>
      </div>
      <button on:click={startRecognition}>Speak Now</button>
    {/if}
    {#if isTestComplete}
      <div class="ai-results">
        <p>{aiMessage}</p>
      </div>
    {/if}
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
  .ai-results {
    font-size: 18px;
    font-weight: bold;
    color: green;
  }
</style>
