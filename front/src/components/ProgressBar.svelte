<script lang="ts">
  export let progress: number = 50
</script>

<div class="h-3 rounded-xl bg-zinc-700 w-full mt-4">
  <div
    role="progressbar"
    aria-label="Progresso de hábitos completados nesse dia"
    aria-valuenow={progress}
    class={`h-full rounded-xl bg-violet-600 transition-all`}
  />
</div>

<style>
  div[role='progressbar'] {
    width: progressbar;
  }
</style>
