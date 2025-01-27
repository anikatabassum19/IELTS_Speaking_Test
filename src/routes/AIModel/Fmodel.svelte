<script>
  import { onMount } from 'svelte';
  import { testStarted } from '../../stores/testState.js';
  import video from '../../Videos/vid.mp4';

  let isTestStarted = false;
  let userResponse = "";
  let aiMessage = "Hello! I am your AI assistant. How can I help you today?";
  // @ts-ignore
  let synth, recognition, conversationTimer;
  let totalScore = 100;
  let isTestComplete = false;
  let currentRound = 1;
  let passage = "";
  let responseCount = 0;

  const passages = [
    "The digital age has transformed the way we live. From smartphones to artificial intelligence, technology has revolutionized our daily lives. But with these advances come challenges like privacy concerns and automation's effect on jobs.",
    "In the vast universe, Earth is a tiny speck. Our planet is the only one known to support life, with ecosystems ranging from oceans to mountains. The search for answers about space continues, but there is much still to understand.",
    "Human activity is threatening ecosystems worldwide through deforestation, pollution, and climate change. These issues affect wildlife and human health. Global cooperation and individual efforts are necessary to protect the environment.",
    "Art reflects the human experience, from cave paintings to digital media. Artists use various methods to communicate emotions, identity, and political themes. Through art, we explore the complexity of the human condition.",
    "Language has evolved from early symbols to complex communication systems. It shapes culture, defines identity, and influences thought. As societies change, languages adapt to new needs for communication and technology."
  ];

  onMount(() => {
    if (typeof window !== "undefined") {
      synth = window.speechSynthesis;
      // @ts-ignore
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      // @ts-ignore
      recognition.onresult = async (event) => {
        try {
          userResponse = event.results[0][0].transcript;
          console.log('User response:', userResponse);
          await processResponse(userResponse);
        } catch (error) {
          console.error("Error in processing recognition result:", error);
          aiMessage = "There was an issue processing your response. Please try again.";
          speak(aiMessage);
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        aiMessage = "Sorry, I couldn't hear your response. Please try again.";
        speak(aiMessage);
      };
    }
  });

  const startTest = () => {
    isTestStarted = true;
    currentRound = 1;
    totalScore = 100;
    aiMessage = "Let's begin! Please introduce yourself.";
    speak(aiMessage);
    startRoundTimer();
  };

  const startRoundTimer = () => {
    clearTimeout(conversationTimer);
    conversationTimer = setTimeout(() => {
      endTest();
    }, 300000); // 5 minutes for the conversation phase
  };

  const endTest = async () => {
    clearTimeout(conversationTimer);
    isTestComplete = true;
    const finalScore = totalScore < 0 ? 0 : totalScore;
    const resultMessage = `Your score is ${finalScore.toFixed(2)}.`;
    aiMessage = resultMessage;
    speak(aiMessage);
    testStarted.set(false);
  };

  const getRandomPassage = () => {
    return passages[Math.floor(Math.random() * passages.length)];
  };

  const processResponse = async (response) => {
    try {
      console.log("Processing response:", response);
      
      if (!response || response.trim() === "") {
        aiMessage = "It seems like you didn't say anything. Please try again.";
        speak(aiMessage);
        return;
      }

      totalScore -= 2; // Deduct a point for each response

      if (currentRound === 1) {
        aiMessage = `Great, now tell me more about yourself.`;
        speak(aiMessage);
        currentRound++;

      } else if (currentRound === 2) {
        aiMessage = `Nice! Now, please read the following passage.`;
        passage = getRandomPassage(); // Shortened passage
        aiMessage += `\n\n"${passage}"`;
        currentRound++;

      } else if (currentRound === 3) {
        // Check if the response is similar to the passage
        const passageScore = calculatePassageScore(response, passage);
        totalScore -= passageScore;
        aiMessage = `Your reading score is ${totalScore.toFixed(2)}.`;
        speak(aiMessage);
        endTest(); // End the test after reading the passage
      }
    } catch (error) {
      console.error("Error in processing response:", error);
      aiMessage = "There was an error analyzing your response. Please try again.";
      speak(aiMessage);
    }
  };

  // Calculate score based on similarity to passage
  const calculatePassageScore = (response, passage) => {
    const passageWords = passage.split(" ");
    const responseWords = response.split(" ");
    let correctWords = 0;

    responseWords.forEach(word => {
      if (passageWords.includes(word)) {
        correctWords++;
      }
    });

    const scoreDeduction = Math.max(0, 100 - (correctWords / passageWords.length) * 100);
    return scoreDeduction;
  };

  const speak = (message) => {
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.voice = synth.getVoices().find(voice => voice.name === 'Google US English Female');
      
      // Play the video in the background when speech starts
      utterance.onstart = () => {
        const videoElement = document.getElementById('background-video');
        videoElement.play();
      };

      // Pause the video once speech ends
      utterance.onend = () => {
        const videoElement = document.getElementById('background-video');
        videoElement.pause();
      };

      synth.speak(utterance);
    }
  };

  const startRecognition = () => {
    if (recognition) recognition.start();
  };

  $: if ($testStarted && !isTestStarted) startTest();
</script>

{#if $testStarted}
  <div class="ai-model">
    {#if !isTestComplete}
      <div class="ai-message">
        <p>{aiMessage}</p>
      </div>
      {#if currentRound === 2}
        <div class="passage">
          <p><strong>Passage:</strong></p>
          <p>{passage}</p>
        </div>
      {/if}
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

<!-- Video element without autoplay or muted -->
<div class="w-full flex justify-center">
  <video id="background-video" loop>
    <source src={video} type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

<style>
  .ai-model {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 10;
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

  /* Video styling */
  #background-video {
    position: relative;
    top: 0;
    left: 0;
    width: 30%;
    height: 30%;
    object-fit: cover;
    z-index: -1;
  }

  .passage {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
</style>
