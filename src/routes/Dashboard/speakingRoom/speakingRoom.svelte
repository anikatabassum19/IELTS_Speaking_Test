<script>
  let isChatbotActive = false;
  let isPeerSessionActive = false;

  function startChatbotSession() {
    isChatbotActive = true;
    // Implement chatbot logic here
  }

  function startPeerSession() {
    isPeerSessionActive = true;
    // Implement peer session logic here
  }
</script>

<section>
  <h2 class="text-2xl font-semibold mb-4">Interactive Speaking Room</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-gray-100 p-6 rounded-lg">
      <h3 class="text-lg font-medium mb-4">AI Conversation Practice</h3>
      {#if isChatbotActive}
        <div class="mb-4">
          <p>Chatbot session in progress...</p>
          <!-- Add chatbot interface here -->
        </div>
        <button 
          on:click={() => isChatbotActive = false}
          class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          End Session
        </button>
      {:else}
        <button 
          on:click={startChatbotSession}
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Start AI Practice Session
        </button>
      {/if}
    </div>

    <div class="bg-gray-100 p-6 rounded-lg">
      <h3 class="text-lg font-medium mb-4">Peer Practice Sessions</h3>
      {#if isPeerSessionActive}
        <div class="mb-4">
          <p>Peer session in progress...</p>
          <!-- Add peer session interface here -->
        </div>
        <button 
          on:click={() => isPeerSessionActive = false}
          class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          End Session
        </button>
      {:else}
        <button 
          on:click={startPeerSession}
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Find a Practice Partner
        </button>
      {/if}
    </div>
  </div>
</section>