<script>
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';


  // @ts-ignore
  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await fetch('api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Navigate to the dashboard or home page after login
        goto('/dashboard');
      } else {
        error = result.error || 'Invalid email or password';
      }
    } catch (err) {
      error = 'Connection Problem';
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white w-full max-w-md shadow-md rounded-lg p-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Login</h1>
      <p class="text-gray-600">Enter your credentials to access your account</p>
    </header>
    <form on:submit|preventDefault={handleLogin} class="space-y-4">
      <div class="space-y-2">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input id="email" type="email" bind:value={email} required class="block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div class="space-y-2">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input id="password" type="password" bind:value={password} required class="block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      {#if error}
        <div class="bg-red-100 text-red-600 p-3 rounded-md text-sm">{error}</div>
      {/if}
      <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md">Login</button>
    </form>
    <p class="mt-4 text-sm text-center">
      Don't have an account? <a href="/Signup" class="text-blue-500 hover:underline">Signup</a>
    </p>
  </div>
</div>
