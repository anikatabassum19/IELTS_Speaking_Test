<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let name = '';
  let mobile = '';
  let email = '';
  let password = '';
  let error = '';

  const handleSubmit = async (event) => {
    event.preventDefault();
    error = '';

    // Simulate a signup logic
    if (email === 'user@example.com' && password === 'password') {
      console.log('Signup successful');
      goto('/dashboard'); // Redirect to dashboard
    } else {
      error = 'Invalid email or password';
    }
  };
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white shadow-md rounded-lg w-full max-w-md p-6">
    <div class="mb-6">
      <h1 class="text-xl font-semibold text-gray-800">Signup</h1>
      <p class="text-sm text-gray-600">Create an account to get started</p>
    </div>
    <form on:submit={handleSubmit} class="space-y-4">
      <!-- Name Field -->
      <div class="space-y-2">
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          bind:value={name}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <!-- Mobile Field -->
      <div class="space-y-2">
        <label for="mobile" class="block text-sm font-medium text-gray-700">Mobile</label>
        <input
          id="mobile"
          type="tel"
          placeholder="Enter your mobile number"
          bind:value={mobile}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Email Field -->
      <div class="space-y-2">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          bind:value={email}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Password Field -->
      <div class="space-y-2">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          bind:value={password}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

            <div class="space-y-2">
        <label for="password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          bind:value={password}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Error Alert -->
      {#if error}
        <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
          <p>{error}</p>
        </div>
      {/if}

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Signup
      </button>
    </form>
    <p class="text-sm text-center mt-4">
      Already have an account?{' '}
      <a href="/Login" class="text-blue-500 hover:underline">Login</a>
    </p>
  </div>
</div>
