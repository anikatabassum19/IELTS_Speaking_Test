<script>
  let upcomingTests = [
    { date: '2024-03-15', time: '10:00 AM' },
    { date: '2024-04-02', time: '2:00 PM' },
  ];

  let practiceSessionsAvailable = 5;

  let progressSummary = {
    completedTests: 10,
    averageScoreBand: 7.5,
    improvementData: [6.5, 7.0, 7.0, 7.5, 7.5, 8.0],
  };
</script>

<section>
  <h2 class="text-2xl font-semibold mb-4">Test Overview</h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-gray-100 p-4 rounded-lg">
      <h3 class="text-lg font-medium mb-2">Upcoming Tests</h3>
      {#if upcomingTests.length > 0}
        <ul>
          {#each upcomingTests as test}
            <li>{test.date} at {test.time}</li>
          {/each}
        </ul>
      {:else}
        <p>No upcoming tests scheduled.</p>
      {/if}
    </div>

    <div class="bg-gray-100 p-4 rounded-lg">
      <h3 class="text-lg font-medium mb-2">Practice Sessions</h3>
      <p>{practiceSessionsAvailable} practice sessions available</p>
      <a href="/practice" class="text-blue-500 hover:underline">Start a practice session</a>
    </div>

    <div class="bg-gray-100 p-4 rounded-lg">
      <h3 class="text-lg font-medium mb-2">Progress Summary</h3>
      <p>Completed tests: {progressSummary.completedTests}</p>
      <p>Average score band: {progressSummary.averageScoreBand}</p>
      <div class="mt-2">
        <h4 class="text-sm font-medium">Improvement over time</h4>
        <div class="h-24 flex items-end space-x-1">
          {#each progressSummary.improvementData as score}
            <div class="bg-blue-500 w-4" style="height: {score / 9 * 100}%;"></div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>