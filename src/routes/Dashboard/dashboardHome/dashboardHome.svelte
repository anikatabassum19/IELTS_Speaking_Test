<script>
  // Mock user data (replace with actual data fetching logic)
  let user = {
    name: "Olu Billi",
    email: "olubilai@daru.com",
    mobile: "01617234466",
    profilePicture: "/placeholder.svg?height=128&width=128"
  };

  // Mock previous scores (replace with actual data fetching logic)
  let previousScores = [
    { date: "2023-05-15", score: 7.5 },
    { date: "2023-03-10", score: 7.0 },
    { date: "2023-01-22", score: 6.5 },
  ];
</script>

<div class="container mx-auto p-6">
  <div class="bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="p-6 sm:p-8">
      <div class="flex flex-col sm:flex-row items-center">
        <img 
          src={user.profilePicture || "/placeholder.svg"} 
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

    <div class="border-t border-gray-200 p-6 sm:p-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Previous Scores</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr>
              <th class="py-2 px-4 bg-gray-100 font-semibold text-gray-700 border-b">Date</th>
              <th class="py-2 px-4 bg-gray-100 font-semibold text-gray-700 border-b">Score</th>
            </tr>
          </thead>
          <tbody>
            {#each previousScores as { date, score }}
              <tr class="hover:bg-gray-50">
                <td class="py-2 px-4 border-b">{date}</td>
                <td class="py-2 px-4 border-b">{score}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>