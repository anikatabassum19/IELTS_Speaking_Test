<script>
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";
  let error = "";


</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white w-full max-w-md shadow-md rounded-lg p-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Login</h1>
      <p class="text-gray-600">Enter your credentials to access your account</p>
    </header>
    <form on:submit class="space-y-4">
      <div class="space-y-2">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          bind:value={email}
          required
          class="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div class="space-y-2">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          bind:value={password}
          required
          class="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {#if error}
        <div class="bg-red-100 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      {/if}
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Login
      </button>
    </form>
    <div class="mt-5">
        <h1>Don't have an account? <a href="/Signup" class="text-blue-500">Signup</a></h1>
    </div>
  </div>
</div>
