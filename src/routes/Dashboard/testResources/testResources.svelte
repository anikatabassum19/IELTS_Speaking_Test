<script>
  let studyMaterials = [
    { title: 'Sample Speaking Questions', url: '/resources/sample-questions' },
    { title: 'Tips and Strategies', url: '/resources/tips-strategies' },
    { title: 'Common Topics and Vocabulary', url: '/resources/topics-vocabulary' },
  ];

  let videoTutorials = [
    { title: 'Improving Fluency', url: '/tutorials/fluency' },
    { title: 'Mastering Pronunciation', url: '/tutorials/pronunciation' },
    { title: 'Expanding Vocabulary', url: '/tutorials/vocabulary' },
  ];
</script>

<section>
  <h2 class="text-2xl font-semibold mb-4">Test Resources</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h3 class="text-lg font-medium mb-2">Study Materials</h3>
      <ul class="space-y-2">
        {#each studyMaterials as material}
          <li>
            <a href={material.url} class="text-blue-500 hover:underline">{material.title}</a>
          </li>
        {/each}
      </ul>
    </div>

    <div>
      <h3 class="text-lg font-medium mb-2">Video Tutorials</h3>
      <ul class="space-y-2">
        {#each videoTutorials as tutorial}
          <li>
            <a href={tutorial.url} class="text-blue-500 hover:underline">{tutorial.title}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>