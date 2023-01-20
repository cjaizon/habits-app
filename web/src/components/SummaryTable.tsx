import { HabitDay } from "./HabitDay"
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'

export const SummaryTable = () => {
    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
    const summaryDates = generateDatesFromYearBeginning()

    const minimumSummaryDatesSize = 18 * 7
    const ammountOfDaysToFil = minimumSummaryDatesSize - summaryDates.length

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
                    summaryDates.map(date =>
                        <HabitDay
                            amount={5}
                            completed={Math.round(Math.random() * 5)}
                            key={date.toString()}
                        />
                    )
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