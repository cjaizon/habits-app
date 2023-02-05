import { db } from '../firebase/firebase-config'
import { DateConvert } from '../middleware/DateConvert'

import express from 'express'
const router = express.Router()

router.get('/summary', async (req, res) => {
  // return array with many
  // console.log(req.user.uid)
  const dateConvert = new DateConvert()

  try {
    const habitsRef = db.collection('habits')
    const snapshot = await habitsRef.get()

    let summary: {}[] = []

    snapshot.forEach((doc) => {
      const date = dateConvert.toDate(doc.data().createdAt)
      const time = dateConvert.toTime(date)

      summary.push({
        title: doc.data().title,
        id: doc.id,
        createdAt: date,
        weekDays: doc.data().weekDays,
        userId: doc.data().userId,
      })
    })
    console.log(summary)
    res.send(summary)
  } catch (error) {
    res.send(error)
  }

  return 'oi'
  //   const summary = await prisma.$queryRaw`
  //           SELECT
  //               D.id,
  //               D.date,
  //               (
  //                   SELECT cast(count(*) as float)
  //                   FROM day_habits DH
  //                   WHERE DH.day_id = D.id
  //               ) as completed,
  //               (
  //                   SELECT cast(count(*) as float)
  //                   FROM  habit_week_days HWD
  //                   JOIN habits H
  //                       ON H.id = HWD.habit_id
  //                   WHERE HWD.week_day = cast(strftime('%w', D.date / 1000.0, 'unixepoch') as int)
  //                   AND H.created_at <= D.date
  //               ) as amount
  //           FROM days D
  //       `
  //   return summary
})

export default router
