<script>
  let performanceData = {
    overallProgress: [6.5, 7.0, 7.0, 7.5, 7.5, 8.0],
    strengthsWeaknesses: {
      fluency: 8,
      coherence: 7,
      lexicalResource: 9,
      pronunciation: 6
    },
    recommendations: [
      "Focus on improving pronunciation",
      "Practice speaking for longer durations to enhance fluency",
      "Expand vocabulary in academic topics"
    ]
  };
</script>

<section>
  <h2 class="text-2xlfont-semibold mb-4">Performance Analytics</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-gray-100 p-6 rounded-lg">
      <h3 class="text-lg font-medium mb-4">Overall Progress</h3>
      <div class="h-48 flex items-end space-x-2">
        {#each performanceData.overallProgress as score}
          <div class="bg-blue-500 w-8" style="height: {score / 9 * 100}%;"></div>
        {/each}
      </div>
    </div>

    <div class="bg-gray-100 p-6 rounded-lg">
      <h3 class="text-lg font-medium mb-4">Strengths and Weaknesses</h3>
      <ul>
        {#each Object.entries(performanceData.strengthsWeaknesses) as [skill, score]}
          <li class="mb-2">
            <span class="font-medium">{skill}:</span> 
            <div class="bg-gray-300 h-4 w-full rounded-full mt-1">
              <div class="bg-blue-500 h-4 rounded-full" style="width: {score * 10}%;"></div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <div class="mt-6 bg-gray-100 p-6 rounded-lg">
    <h3 class="text-lg font-medium mb-4">Recommendations</h3>
    <ul class="list-disc pl-5">
      {#each performanceData.recommendations as recommendation}
        <li>{recommendation}</li>
      {/each}
    </ul>
  </div>
</section>