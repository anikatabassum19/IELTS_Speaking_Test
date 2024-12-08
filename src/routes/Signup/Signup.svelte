<script>
  import { goto } from '$app/navigation';

  let name = '';
  let mobile = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let error = '';

  // @ts-ignore
  async function handleSignup(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      error = "Passwords do not match!";
      return;
    }

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, mobile, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        goto('/Login');
      } else {
        error = result.error || 'Something went wrong!';
      }
    } catch (err) {
      error = 'Connection Problem';
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white shadow-md rounded-lg w-full max-w-md p-6">
    <div class="mb-6">
      <h1 class="text-xl font-semibold text-gray-800">Signup</h1>
      <p class="text-sm text-gray-600">Create an account to get started</p>
    </div>
    <form class="space-y-4" on:submit|preventDefault={handleSignup}>
      <!-- Form Fields -->
      <div class="space-y-2">
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input id="name" type="text" bind:value={name} required class="w-full px-4 py-2 border border-gray-300 rounded-md" />
      </div>
      <div class="space-y-2">
        <label for="mobile" class="block text-sm font-medium text-gray-700">Mobile</label>
        <input id="mobile" type="tel" bind:value={mobile} required class="w-full px-4 py-2 border border-gray-300 rounded-md" />
      </div>
      <div class="space-y-2">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input id="email" type="email" bind:value={email} required class="w-full px-4 py-2 border border-gray-300 rounded-md" />
      </div>
      <div class="space-y-2">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input id="password" type="password" bind:value={password} required class="w-full px-4 py-2 border border-gray-300 rounded-md" />
      </div>
      <div class="space-y-2">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input id="confirmPassword" type="password" bind:value={confirmPassword} required class="w-full px-4 py-2 border border-gray-300 rounded-md" />
      </div>
      {#if error}
        <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
          <p>{error}</p>
        </div>
      {/if}
      <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md">Signup</button>
    </form>
    <p class="text-sm text-center mt-4">
      Already have an account? <a href="/Login" class="text-blue-500 hover:underline">Login</a>
    </p>
  </div>
</div>
