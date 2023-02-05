const express = require('express')
const router = express.Router()

// (dis)complete habit
router.patch('/habits/:id/toggle', async (request) => {
  // route param
  const toggleHabitParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = toggleHabitParams.parse(request.params)
  const today = dayjs().startOf('day').toDate()

  let day = await prisma.day.findUnique({
    where: {
      date: today,
    },
  })

  if (!day) {
    day = await prisma.day.create({
      data: {
        date: today,
      },
    })
  }

  // check if day habit is checked
  const dayHabit = await prisma.dayhabit.findUnique({
    where: {
      day_id_habit_id: {
        day_id: day.id,
        habit_id: id,
      },
    },
  })

  if (dayHabit) {
    // remove check
    console.log(dayHabit)

    await prisma.dayhabit.delete({
      where: {
        id: dayHabit.id,
      },
    })
  } else {
    // add check
    await prisma.dayhabit.create({
      data: {
        day_id: day.id,
        habit_id: id,
      },
    })
  }
})

module.exports = router
