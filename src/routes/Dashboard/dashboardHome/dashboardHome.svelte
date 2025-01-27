<script>
  import { showAIModel } from '../../../stores/showAIModel.js'; // Import the store
  import { testStarted } from '../../../stores/testState.js';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  // @ts-ignore
  /** @type {{ id: string, name: string, email: string, mobile?: string, profilePicture?: string, previousScores?: { date: string, score: number }[] } | null} */
  let user = null;
  // @ts-ignore
  /**
   * @type {string | null}
   */
  let error = null;

  let totalScore = 100;
  let testDate = new Date().toLocaleDateString();
  let isTestComplete = false;

  const startTest = () => {
    showAIModel.set(true);
    testStarted.set(true);
    totalScore = 100;
    isTestComplete = false;
  };

  const stopTest = async () => {
    testStarted.set(false);
    isTestComplete = true;

    if (user) {
      try {
        const res = await fetch('api/auth/marks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            date: testDate,
            score: totalScore,
          }),
        });

        const data = await res.json();
        if (data.success) {
          alert('Test result saved successfully');
        } else {
          alert('Error saving test result');
        }
      } catch (err) {
        console.error('Failed to save score:', err);
        alert('Error saving test result');
      }
    }
  };

  async function logout() {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();
      if (data.success) {
        goto('/Login');
      } else {
        alert('Failed to log out. Please try again.');
      }
    } catch (err) {
      alert('An error occurred during logout.');
    }
  }

  onMount(async () => {
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();

      if (!data.success) {
        error = data.error;
        return;
      }

      user = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        mobile: data.user.mobile || 'Not Provided',
        profilePicture: data.user.profilePicture || '/default-profile.png',
        previousScores: data.user.previousScores || [],
      };
    } catch (err) {
      error = 'Failed to fetch user data.';
    }
  });
</script>

{#if error}
  <div class="text-red-500 text-center mt-4">{error}</div>
{:else if !user}
  <div class="text-gray-500 text-center mt-4">Loading...</div>
{:else}
  <div class="container mx-auto p-6">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="p-6 sm:p-8">
        <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <img
            src={user.profilePicture}
            alt="Profile Picture"
            class="w-32 h-32 rounded-full object-cover"
          />
          <div class="text-center sm:text-left">
            <h1 class="text-2xl font-semibold text-gray-800">{user.name}</h1>
            <p class="text-gray-600">{user.email}</p>
            <p class="text-gray-600">{user.mobile}</p>
          </div>
        </div>

        <section class="home-section mt-6">
          {#if $testStarted}
            <button on:click={stopTest} class="w-full sm:w-auto px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
              Stop Test
            </button>
          {:else}
            <button on:click={startTest} class="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Start Test
            </button>
          {/if}
        </section>
      </div>

      <div class="border-t border-gray-200 p-6 sm:p-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Previous Scores</h2>
        {#if !user.previousScores || user.previousScores.length === 0}
          <p class="text-gray-600 text-center">YOU DID NOT TAKE ANY TEST</p>
        {:else}
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th class="py-2 px-4 bg-gray-100 font-semibold text-gray-700 border-b">Date</th>
                  <th class="py-2 px-4 bg-gray-100 font-semibold text-gray-700 border-b">Score</th>
                </tr>
              </thead>
              <tbody>
                {#each user.previousScores as { date, score }}
                  <tr class="hover:bg-gray-50">
                    <td class="py-2 px-4 border-b">{date}</td>
                    <td class="py-2 px-4 border-b">{score}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<div class="flex justify-center mt-6">
  <button
    on:click={logout}
    class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
  >
    Logout
  </button>
</div>
