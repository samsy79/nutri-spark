"use client"

import { IFoodReduced, IFood } from "../types"
import { useEffect, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/src/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandList,
  CommandInput,
  CommandItem,
} from "@/src/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover"
import { log } from "console"
import { useRouter } from "next/navigation"



export default function Home() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [foods, setFoods] = useState<IFoodReduced[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  const fetchFoods = async () => {
    try {
      const response = await fetch('/api/foods/all-foods');
      const data = await response.json()
      const foodReduced: IFoodReduced[] = data.map((food: IFood) => ({
        value: food.name.toLowerCase().replace(/ /g, '-'),
        label: food.name
      }))
      setFoods(foodReduced);

    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    const initialize = async () => {

      await fetchFoods();
      setIsLoading(false);
    }

    initialize()
  }, [])
  useEffect(() => {
    if (value.length != 0) {
      router.push(`/food/${value}`)
    }
  }, [value])
  return (
    <>
      {!isLoading ? (
        <div className="min-h-screen  text-white flex flex-col items-center justify-center p-6">
          <h1 className="text-5xl font-extrabold mb-4"> Welcome to 
            <span className="title_colored"> NutiSpark
            </span>
          </h1>
          <p className="text-lg mb-8 text-center
         max-w-2xl">Discover  the nutritional values
            of your favorite foods . Use the search below
            to  <br />get started. </p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] justify-between"
              >
                {value
                  ? foods.find((food) => food.value === value)?.label
                  : "Select food..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search food..." />
                <CommandEmpty>No food found.</CommandEmpty>
                <CommandList>
                  {foods.map((food) => (
                    <CommandItem
                      key={food.value}
                      value={food.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === food.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {food.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen text-white">
          <p className="text-2xl">Loading...</p>
        </div>
      )}
    </>
  )
}
