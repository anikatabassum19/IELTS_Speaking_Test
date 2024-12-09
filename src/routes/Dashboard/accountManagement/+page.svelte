<script>
  let user = {
    name: "John Doe",
    email: "john.doe@example.com",
    notifications: {
      upcomingTests: true,
      newFeedback: true,
      practiceReminders: false
    },
    subscription: "Premium"
  };

  function updateProfile() {
    // Implement profile update logic
    console.log("Profile updated");
  }

  function updateNotifications() {
    // Implement notifications update logic
    console.log("Notifications updated");
  }

  function manageSubscription() {
    // Implement subscription management logic
    console.log("Managing subscription");
  }
</script>

<section>
  <h2 class="text-2xl font-semibold mb-4">Account Management</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-gray-100 p-6 rounded-lg">
      <h3 class="text-lg font-medium mb-4">Profile Settings</h3>
      <form on:submit|preventDefault={updateProfile}>
        <div class="mb-4">
          <label for="name" class="block mb-2">Name:</label>
          <input type="text" id="name" bind:value={user.name} class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-2">Email:</label>
          <input type="email" id="email" bind:value={user.email} class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Update Profile
        </button>
      </form>
    </div>

    <div class="bg-gray-100 p-6 rounded-lg">
      <h3 class="text-lg font-medium mb-4">Notifications</h3>
      <form on:submit|preventDefault={updateNotifications}>
        {#each Object.entries(user.notifications) as [key, value]}
          <div class="mb-2">
            <label class="flex items-center">
              <input type="checkbox" >
              <span class="ml-2">{key}</span>
            </label>
          </div>
        {/each}
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4">
          Update Notifications
        </button>
      </form>
    </div>
  </div>

  <div class="mt-6 bg-gray-100 p-6 rounded-lg">
    <h3 class="text-lg font-medium mb-4">Subscription Management</h3>
    <p class="mb-4">Current Plan: {user.subscription}</p>
    <button 
      on:click={manageSubscription}
      class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Manage Subscription
    </button>
  </div>
</section>