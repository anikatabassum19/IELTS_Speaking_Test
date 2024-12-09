<script>
  let scoreReports = [
    {
      date: '2024-02-15',
      overallBand: 7.5,
      detailedScores: {
        fluency: 7.0,
        coherence: 7.5,
        lexicalResource: 8.0,
        pronunciation: 7.5
      },
      feedback: "Good use of vocabulary. Work on improving fluency."
    },
    // Add more score reports as needed
  ];

  // @ts-ignore
  function downloadReport(date) {
    // Implement download functionality here
    console.log(`Downloading report for ${date}`);
  }
</script>

<section>
  <h2 class="text-2xl font-semibold mb-4">Score Reports</h2>

  {#each scoreReports as report}
    <div class="bg-gray-100 p-6 rounded-lg mb-4">
      <h3 class="text-lg font-medium mb-2">Test Date: {report.date}</h3>
      <p class="text-xl mb-4">Overall Band Score: {report.overallBand}</p>

      <h4 class="text-md font-medium mb-2">Detailed Scores:</h4>
      <ul class="mb-4">
        <li>Fluency: {report.detailedScores.fluency}</li>
        <li>Coherence: {report.detailedScores.coherence}</li>
        <li>Lexical Resource: {report.detailedScores.lexicalResource}</li>
        <li>Pronunciation: {report.detailedScores.pronunciation}</li>
      </ul>

      <h4 class="text-md font-medium mb-2">Feedback:</h4>
      <p class="mb-4">{report.feedback}</p>

      <button 
        on:click={() => downloadReport(report.date)}
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Download Report
      </button>
    </div>
  {/each}
</section>