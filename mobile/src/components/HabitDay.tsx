import { TouchableOpacity, TouchableOpacityProps, Dimensions } from "react-native"
import { generateProgressPercentage } from "../utils/generate-progress-percentage"
import clsx from "clsx";
import dayjs from "dayjs";

const weekDays = 7
const screenHorizontalPadding = (32 * 2) / 5

export const dayMarginBetween = 8
export const daySize = (Dimensions.get('screen').width / weekDays) - (screenHorizontalPadding + 5)

interface Props extends TouchableOpacityProps {
  amountOfHabits?: number
  amountCompleted?: number
  date: Date
}


export const HabitDay = ({ amountOfHabits = 0, amountCompleted = 0, date, ...rest }: Props) => {

  const amountCompletedPercentage = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted) : 0
  const today = dayjs().startOf('day').toDate()
  const isToday = dayjs(date).isSame(today)

  return (
    <TouchableOpacity
      className={clsx('rounded-lg border-2 m-1', {
        ['bg-violet-500 border-violet-400']: amountCompletedPercentage >= 80,
        ['bg-violet-600 border-violet-500']: amountCompletedPercentage < 80 && amountCompletedPercentage >= 60,
        ['bg-violet-700 border-violet-500']: amountCompletedPercentage < 60 && amountCompletedPercentage >= 40,
        ['bg-violet-800 border-violet-600']: amountCompletedPercentage < 40 && amountCompletedPercentage >= 20,
        ['bg-violet-900 border-violet-700']: amountCompletedPercentage < 20 && amountCompletedPercentage >= 1,
        ['bg-zinc-900 border-zinc-800']: amountCompletedPercentage == 0,
        ['border-zinc-600 border-4']: isToday

      })}
      style={{ width: daySize, height: daySize }}
      activeOpacity={0.7}
      {...rest}
    />
  )
}