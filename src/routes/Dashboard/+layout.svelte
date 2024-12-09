<script>
  import TestResources from './testResources/testResources.svelte';
  import PracticeSpeaking from './practiceSpeaking/practiceSpeaking.svelte';
  import ScoreReports from './scoreReports/scoreReports.svelte';
  import SpeakingRoom from './speakingRoom/speakingRoom.svelte';
  import PerformanceAnalysis from './performanceAnalysis/performanceAnalysis.svelte';
  import AccountManagement from './accountManagement/accountManagement.svelte';
  import TestOverview from './testOverview/testOverview.svelte';

  let activeTab = 'overview';
  /**
   * @type {{ name: any; } | null}
   */
  let users = null;
  let loading = true; 

  async function fetchUser() {
    try {
      const res = await fetch('api/users', { credentials: 'include' });
      if (res.ok) {
        users = await res.json();
      } else {
        console.error('Failed to fetch user data:', await res.text());
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      loading = false;
    }
  }

  // @ts-ignore
  function setActiveTab(tab) {
    activeTab = tab;
  }

  // Fetch user data on component mount
  fetchUser();
</script>

<main class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6">IELTS Speaking Test Dashboard</h1>

    {#if loading}
    <p>Loading user information...</p>
  {:else if users}
    <h1 class="text-3xl font-bold mb-6">
      Welcome, {users.name}! 🎉
    </h1>
  {:else}
    <p class="text-red-500">Failed to load user information. Please try again.</p>
  {/if}

  <nav class="mb-6">
    <ul class="flex space-x-4">
      <li><button class:active={activeTab === 'overview'} on:click={() => setActiveTab('overview')}>Test Overview</button></li>
      <li><button class:active={activeTab === 'resources'} on:click={() => setActiveTab('resources')}>Test Resources</button></li>
      <li><button class:active={activeTab === 'practice'} on:click={() => setActiveTab('practice')}>Practice Speaking Test</button></li>
      <li><button class:active={activeTab === 'scores'} on:click={() => setActiveTab('scores')}>Score Reports</button></li>
      <li><button class:active={activeTab === 'interactive'} on:click={() => setActiveTab('interactive')}>Interactive Speaking Room</button></li>
      <li><button class:active={activeTab === 'analytics'} on:click={() => setActiveTab('analytics')}>Performance Analytics</button></li>
      <li><button class:active={activeTab === 'account'} on:click={() => setActiveTab('account')}>Account Management</button></li>
    </ul>
  </nav>

  <div class="dashboard-content">
    {#if activeTab === 'overview'}
      <TestOverview />
    {:else if activeTab === 'resources'}
      <TestResources />
    {:else if activeTab === 'practice'}
      <PracticeSpeaking />
    {:else if activeTab === 'scores'}
      <ScoreReports />
    {:else if activeTab === 'interactive'}
      <SpeakingRoom />
    {:else if activeTab === 'analytics'}
      <PerformanceAnalysis />
    {:else if activeTab === 'account'}
      <AccountManagement />
    {/if}
  </div>
</main>

<style>
  button {
    @apply px-4 py-2 rounded-md;
  }
  button.active {
    @apply bg-blue-500 text-white;
  }
  .dashboard-content {
    @apply bg-white p-6 rounded-lg shadow-md;
  }
</style>


<slot />