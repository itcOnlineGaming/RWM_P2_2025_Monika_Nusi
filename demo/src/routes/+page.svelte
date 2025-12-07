<script>
  import { TreeTimer } from '@monika/monika-tree-timer';
  import { authUser, login, logout } from '$lib/authStore.js';
</script>

<h1>Tree Timer Demo</h1>

{#if $authUser}
  <p>Logged in as {$authUser.name}</p>
  <button on:click={logout}>Logout</button>

  <TreeTimer initialMinutes={25} plantStages={['🌱','🌿','🌳']} />
{:else}
  <button on:click={() => login("Monika")}>Login</button>
  <p>Please log in to use the timer</p>
{/if}
