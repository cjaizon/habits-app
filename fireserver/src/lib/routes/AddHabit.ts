import { db } from '../firebase/firebase-config'

import express from 'express'
import dayjs from 'dayjs'
const router = express.Router()

// add a habit specifying in which days it is avaliable
router.post('/habits', async (req, res) => {
  // const createHabitBody = z.object({
  //   title: z.string(),
  //   weekDays: z.array(z.number().min(0).max(6)),
  // })

  // const { title, weekDays } = createHabitBody.parse(request.body)

  console.log(req.user.uid);
  
  await db.collection('habits').doc().set({
    title: title,
    weekDays: weekDays,
    createdAt: ,
    userId: req.user.uid
  })

})

module.exports = router
