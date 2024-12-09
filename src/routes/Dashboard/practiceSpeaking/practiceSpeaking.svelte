<script>
  import { onMount } from 'svelte';

  let isRecording = false;
  let timer = 120; // 2 minutes
  let currentQuestion = "Describe a place you like to visit in your free time.";

  function startTest() {
    isRecording = true;
    const interval = setInterval(() => {
      timer--;
      if (timer <= 0) {
        clearInterval(interval);
        isRecording = false;
      }
    }, 1000);
  }

  function stopRecording() {
    isRecording = false;
    
  }

  onMount(() => {
   
  });
</script>

<section>
  <h2 class="text-2xl font-semibold mb-4">Practice Speaking Test</h2>

  <div class="bg-gray-100 p-6 rounded-lg">
    <h3 class="text-lg font-medium mb-4">Current Question:</h3>
    <p class="text-xl mb-6">{currentQuestion}</p>

    <div class="mb-4">
      <button 
        on:click={isRecording ? stopRecording : startTest}
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        {isRecording ? 'Stop Recording' : 'Start Test'}
      </button>
    </div>

    {#if isRecording}
      <div class="text-2xl font-bold">
        Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}
      </div>
    {/if}

    <div class="mt-6">
      <h4 class="text-lg font-medium mb-2">Feedback Section:</h4>
      <p>Your response will be evaluated automatically after recording.</p>
      <p>An instructor may provide additional feedback within 24 hours.</p>
    </div>
  </div>
</section>