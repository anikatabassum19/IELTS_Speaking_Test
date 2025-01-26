<script>
  import { onMount } from 'svelte';

  /**
   * @type {{ profilePicture: any; name: any; email: any; mobile: any; previousScores: any; } | null}
   */
  let user = null;
  /**
   * @type {string | null}
   */
  let error = null;

  onMount(async () => {
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'GET',
        credentials: 'include', // Ensure cookies are sent
      });

      const data = await res.json();

      if (!data.success) {
        error = data.error;
        console.log("Fetching user details...");

        return;
      }

      // @ts-ignore
      user = {
        name: data.user.name,
        email: data.user.email,
        mobile: data.user.mobile || "Not Provided"
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
        <div class="flex flex-col sm:flex-row items-center">
          <img 
            src=""
            alt="Profile Picture" 
            class="w-32 h-32 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6"
          />
          <div>
            <h1 class="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p class="text-gray-600">{user.email}</p>
            <p class="text-gray-600">{user.mobile}</p>
          </div>
        </div>
      </div>

      <!-- <div class="border-t border-gray-200 p-6 sm:p-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Previous Scores</h2>
        {#if user.previousScores.length === 0}
          <p class="text-gray-600">No scores available</p>
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
      </div> -->
    </div>
  </div>
{/if}
