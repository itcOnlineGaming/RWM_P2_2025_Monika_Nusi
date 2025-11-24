<script lang="ts">
  import { onDestroy } from 'svelte';

  // Default timer (25 minutes)
  export let initialMinutes: number = 25;

  // Plant stages that change as time progresses
  export let plantStages: string[] = ['🌱', '🌿', '🌳'];

  // Convert minutes to seconds
  let durationSeconds = initialMinutes * 60;
  let timeLeft = durationSeconds;

  let running = false;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  // When the user types a new minute value
  function setMinutes(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);

    if (!Number.isNaN(value) && value > 0 && !running) {
      initialMinutes = value;
      durationSeconds = initialMinutes * 60;
      timeLeft = durationSeconds;
    }
  }

  // Start the countdown
  function start() {
    if (running) return;
    running = true;

    intervalId = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft -= 1;
      } else {
        stop();
      }
    }, 1000);
  }

  // Stop timer
  function stop() {
    running = false;

    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Reset timer
  function reset() {
    stop();
    timeLeft = durationSeconds;
  }

  // Derived values (auto-update)
  $: minutes = Math.floor(timeLeft / 60);
  $: seconds = timeLeft % 60;

  // Progress 0 → 1
  $: progress = durationSeconds > 0 ? 1 - timeLeft / durationSeconds : 0;

  // Which plant stage should show?
  $: stageIndex = Math.min(
    plantStages.length - 1,
    Math.floor(progress * plantStages.length)
  );

  $: currentPlant = plantStages[stageIndex];

  // Cleanup
  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });
</script>

<div class="card">
  <div class="plant">{currentPlant}</div>

  <div class="time">
    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
  </div>

  <div class="duration-input">
    <label for="minutesInput">Minutes:</label>
    <input
      id="minutesInput"
      type="number"
      min="1"
      bind:value={initialMinutes}
      on:change={setMinutes}
      disabled={running}
    />
  </div>

  <div class="controls">
    <button class="start" on:click={start} disabled={running}>Start</button>
    <button class="stop" on:click={stop} disabled={!running}>Stop</button>
    <button class="reset" on:click={reset}>Reset</button>
  </div>
</div>

<style>
  .card {
    max-width: 420px;
    margin: 2rem auto;
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid #d8e8d8;
    background: #f7fff8;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    font-family: system-ui, sans-serif;
  }

  .plant {
    font-size: 3rem;
  }

  .time {
    font-size: 2.4rem;
    font-weight: 600;
  }

  .controls {
    display: flex;
    gap: 0.5rem;
  }

  button {
    padding: 0.4rem 1rem;
    border-radius: 999px;
    border: none;
    cursor: pointer;
  }

  .start {
    background: #0a7c42;
    color: white;
  }

  .stop {
    background: #b71c1c;
    color: white;
  }

  .reset {
    background: #999;
    color: white;
  }
</style>
