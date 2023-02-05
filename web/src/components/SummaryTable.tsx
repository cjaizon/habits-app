import { HabitDay } from "./HabitDay"
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { useContext, useEffect, useState } from "react"
import { api } from "../lib/axios"
import dayjs from "dayjs"
import { AuthContext } from "../contexts/AuthContext"

type Summary = {
    id: string
    date: string
    amount: number
    completed: number
}[]

export const SummaryTable = () => {
    const [summary, setSummary] = useState<Summary>([])
    const { userToken } = useContext(AuthContext)


    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
    const summaryDates = generateDatesFromYearBeginning()

    const minimumSummaryDatesSize = 18 * 7
    const ammountOfDaysToFil = minimumSummaryDatesSize - summaryDates.length

    const fetchData = async (token: string) => {

        const res = await api.get('/summary', {
            headers: {
                Authorization: 'Bearer ' + token,
            },

        })

        console.log(res);



        setSummary(res.data)
    }

    useEffect(() => {

        if (userToken) {
            fetchData(userToken)
        }

    }, [])


    return (
        <div className="w-full flex ">
            <div className="grid grid-rows-7 grid-flow-row gap-2">
                {weekDays.map((day, index) =>
                    <div
                        key={`${weekDays}-${index}`} className="text-zinc-400 text-xl h-10 w-10 flex justify-center items-center font-bold"
                    >
                        {day}
                    </div>
                )}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-2">
                {
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
                }
                {
                    ammountOfDaysToFil > 0 && Array.from({ length: ammountOfDaysToFil }).map((_, index) =>
                        <div
                            key={index}
                            className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
                        />)
                }
            </div>
        </div>
    )
}