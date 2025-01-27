<script>
  import DashboardHome from "./dashboardHome/dashboardHome.svelte";
    import AIModel from '../AIModel/Fmodel.svelte';
      import { showAIModel } from '../../stores/showAIModel.js';
</script>

<main>
    <DashboardHome />
    {#if showAIModel}
    <AIModel />
{/if}
</main>