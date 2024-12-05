<script>
  import Navbar from './Navbar/nav.svelte';   // Import Navbar from its folder
  import Home from './Home/home.svelte';         // Import Home from its folder
  import AIModel from './AIModel/Fmodel.svelte';
  import { showAIModel } from '../stores/showAIModel.js'; // Import the store
  import About from './about.svelte'; // Import the About component
  import Contact from './contact.svelte'; // Import the Contact component
  import Footer from './footer.svelte';

</script>

<Navbar />  <!-- This will display the Navbar -->
<Home />    <!-- This will display the Home page content -->
{#if showAIModel}
    <AIModel />
{/if}

<About/>
<Contact/>
<Footer/>