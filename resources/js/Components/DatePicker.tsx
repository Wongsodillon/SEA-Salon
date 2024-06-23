import { Calendar } from "@/Components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { useEffect } from "react"

type DatePickerProps = {
    date: Date | undefined
    setDate: (date: Date | undefined) => void
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={"outline"}
                className={cn(
                    "bg-[#fcf5f5] py-8 px-6 border-none focus:ring-0 text-[#89868d] mt-2 hover:bg-[#fcf5f5] w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

export default DatePicker;
