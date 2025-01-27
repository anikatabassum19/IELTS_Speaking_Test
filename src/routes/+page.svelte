<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let showFeatures = false;
  let testimonials = [
    { name: 'Sarah L.', text: 'TalkSmart helped me achieve a band 8 in IELTS Speaking!', avatar: '/placeholder.svg?height=60&width=60' },
    { name: 'Ahmed K.', text: 'The practice sessions are incredibly realistic. Highly recommended!', avatar: '/placeholder.svg?height=60&width=60' },
    { name: 'Maria G.', text: 'I feel much more confident for my test after using TalkSmart.', avatar: '/placeholder.svg?height=60&width=60' },
  ];

  onMount(() => {
    showFeatures = true;
  });
</script>

<nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
  <div class="text-2xl font-bold">TalkSmart</div>
  <ul class="flex space-x-6">
    <li><a href="/" class="hover:text-yellow-400 transition-colors">Home</a></li>
    <li><a href="/results" class="hover:text-yellow-400 transition-colors">Results</a></li>
    <li><a href="/Login" class="hover:text-yellow-400 transition-colors">Login/SignUp</a></li>
  </ul>
</nav>

<main>
  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20">
    <div class="container mx-auto text-center">
      <h1 class="text-5xl font-bold mb-4">Master IELTS Speaking with TalkSmart</h1>
      <p class="text-xl mb-8">Boost your confidence and improve your score with our AI-powered practice sessions</p>
      <a href="#" class="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors">Start Practicing Now</a>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-16 bg-gray-100">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center mb-12">Why Choose TalkSmart?</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#if showFeatures}
          {#each ['AI-Powered Feedback', 'Realistic Test Simulations', 'Personalized Study Plans'] as feature, i}
            <div
              class="bg-white p-6 rounded-lg shadow-md"
              in:fly="{{ y: 50, duration: 500, delay: i * 200 }}"
            >
              <h3 class="text-xl font-semibold mb-2">{feature}</h3>
              <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </section>

  <!-- How It Works Section -->
  <section class="py-16">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center mb-12">How TalkSmart Works</h2>
      <div class="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
        {#each ['Sign Up', 'Take a Practice Test', 'Get Instant Feedback', 'Improve and Succeed'] as step, i}
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">{i + 1}</div>
            <h3 class="text-xl font-semibold mb-2">{step}</h3>
            <p class="text-gray-600 max-w-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="py-16 bg-gray-100">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each testimonials as { name, text, avatar }}
          <div class="bg-white p-6 rounded-lg shadow-md">
            <p class="text-gray-600 mb-4">"{text}"</p>
            <div class="flex items-center">
              <img src={avatar || "/placeholder.svg"} alt={name} class="w-12 h-12 rounded-full mr-4" />
              <span class="font-semibold">{name}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section class="py-16">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
      <div class="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-8 md:space-y-0">
        {#each ['Basic', 'Pro', 'Premium'] as plan}
          <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
            <h3 class="text-2xl font-bold mb-4">{plan}</h3>
            <p class="text-4xl font-bold mb-6">${plan === 'Basic' ? '9.99' : plan === 'Pro' ? '19.99' : '29.99'}<span class="text-lg font-normal">/month</span></p>
            <ul class="mb-8">
              <li class="flex items-center mb-2">
                <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Feature 1
              </li>
              <li class="flex items-center mb-2">
                <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Feature 2
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Feature 3
              </li>
            </ul>
            <a href="#" class="block w-full bg-blue-600 text-white text-center py-2 rounded-full hover:bg-blue-700 transition-colors">Choose {plan}</a>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <div class="text-2xl font-bold mb-4 md:mb-0">TalkSmart</div>
      <ul class="flex space-x-6">
        <li><a href="#" class="hover:text-yellow-400 transition-colors">About</a></li>
        <li><a href="#" class="hover:text-yellow-400 transition-colors">Contact</a></li>
        <li><a href="#" class="hover:text-yellow-400 transition-colors">Privacy Policy</a></li>
        <li><a href="#" class="hover:text-yellow-400 transition-colors">Terms of Service</a></li>
      </ul>
    </div>
  </footer>
</main>

<style>
  /* Any additional custom styles can be added here */
</style>