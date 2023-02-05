const express = require('express')
const router = express.Router()

// get habits on the day
router.get('/day', async (request) => {
  const getDayParams = z.object({
    date: z.coerce.date(),
  })

  const { date } = getDayParams.parse(request.query)

  const parsedDate = dayjs(date).startOf('day')
  const weekDay = parsedDate.get('day')

  console.log(date, weekDay)

  // get all habits
  const possibleHabits = await prisma.habit.findMany({
    where: {
      created_at: {
        lte: date,
      },
      weekDays: {
        some: {
          week_day: weekDay,
        },
      },
    },
  })
  // get completed apps
  const day = await prisma.day.findUnique({
    where: {
      date: parsedDate.toDate(),
    },
    include: {
      dayHabits: true,
    },
  })

  const completedHabits =
    day?.dayHabits.map((dayHabit) => dayHabit.habit_id) ?? []

  return {
    possibleHabits,
    completedHabits,
  }
})

module.exports = router
