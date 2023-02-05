<script lang="ts">
  //   import { HabitDay } from './HabitDay'
  import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
  import { api } from '../lib/axios'
  import dayjs from 'dayjs'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import axios from 'axios'
  import { each } from 'svelte/internal'

  type Summary = {
    id: string
    date: string
    amount: number
    completed: number
  }[]

  export let token: string

  const summary = writable<Summary>([])

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const summaryDates = generateDatesFromYearBeginning()

  const minimumSummaryDatesSize = 18 * 7
  const ammountOfDaysToFil = minimumSummaryDatesSize - summaryDates.length

  const filler = Array.from({ length: ammountOfDaysToFil })

  const fetchData = async (token: string) => {
    const res = await api.get('/summary', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    summary.set(res.data)
    console.log($summary)
  }
  onMount(() => {
    if (token) {
      fetchData(token)
    }
  })
</script>

<div class="w-full flex ">
  <div class="grid grid-rows-7 grid-flow-row gap-2">
    {#each weekDays as day}
      <div
        class="text-zinc-400 text-xl h-10 w-10 flex justify-center items-center font-bold"
      >
        {day}
      </div>
    {/each}
  </div>
  <div class="grid grid-rows-7 grid-flow-col gap-2">
    {#if summary.length > 0}
      {#each summaryDates as date}
        <!-- <HabitDay summary/> -->
      {/each}
    {/if}
    <!-- {
            summary.length > 0 && summaryDates.map(date => {
                const dayInSummary = summary.find(day => dayjs(date).isSame(day.date, 'day'))

                return (
                    <HabitDay
                        key={date.toString()}
                        date={date}
                        amount={dayInSummary?.amount}
                        defaultCompleted={dayInSummary?.completed}
                    />
                )
            })
        } -->
    {#if filler.length > 0}
      {#each filler as fill, index}
        <div
          class="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg
      opacity-40 cursor-not-allowed"
        />
      {/each}
    {/if}
  </div>
</div>
