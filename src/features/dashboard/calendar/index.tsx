import React, { useState } from 'react'
import { format, addDays, subDays } from 'date-fns'
import { uz } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Calendar, Users, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/components/layout/theme'

interface ClassSession {
  id: string
  teacher: string
  room: string
  startTime: string
  endTime: string
  groupSize: number
  color: 'blue' | 'pink' | 'yellow' | 'green' | 'purple'
}

export function DailySchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [timeInterval, setTimeInterval] = useState<'15' | '30'>('30')
  const { theme } = useTheme()

  // Generate time slots based on the selected interval
  const generateTimeSlots = () => {
    const slots = []
    const interval = Number.parseInt(timeInterval)

    for (let hour = 8; hour <= 14; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const formattedHour = hour.toString().padStart(2, '0')
        const formattedMinute = minute.toString().padStart(2, '0')
        slots.push(`${formattedHour}:${formattedMinute}`)
      }
    }

    return slots
  }

  const timeSlots = generateTimeSlots()

  // Sample schedule data
  const scheduleData: ClassSession[] = [
    // Dushanba (Monday)
    {
      id: '1',
      teacher: 'Mr. Bardot',
      room: 'A101',
      startTime: '08:00',
      endTime: '09:00',
      groupSize: 2,
      color: 'blue',
    },
    {
      id: '2',
      teacher: 'Mrs. Thatcher',
      room: 'B203',
      startTime: '08:00',
      endTime: '09:30', // 1.5 hour class
      groupSize: 3,
      color: 'pink',
    },
    {
      id: '3',
      teacher: 'Mr. Harris',
      room: 'C105',
      startTime: '08:30',
      endTime: '10:30', // 2 hour class
      groupSize: 3,
      color: 'yellow',
    },
    {
      id: '4',
      teacher: 'Mr. Levine',
      room: 'D202',
      startTime: '08:30',
      endTime: '09:00',
      groupSize: 4,
      color: 'pink',
    },
    {
      id: '5',
      teacher: 'Mr. McKenna',
      room: 'C105',
      startTime: '10:30',
      endTime: '12:00', // 2 hour class
      groupSize: 1,
      color: 'blue',
    },
    {
      id: '6',
      teacher: 'Mr. Ford',
      room: 'A101',
      startTime: '09:00',
      endTime: '11:00', // 2 hour class
      groupSize: 2,
      color: 'green',
    },
    {
      id: '7',
      teacher: 'Mr. Daughtler',
      room: 'A101',
      startTime: '08:30',
      endTime: '10:00', // 1.5 hour class
      groupSize: 3,
      color: 'yellow',
    },
    {
      id: '8',
      teacher: 'Mr. Madison',
      room: 'B203',
      startTime: '08:30',
      endTime: '09:00',
      groupSize: 4,
      color: 'green',
    },
    {
      id: '9',
      teacher: 'Mr. Jenkins',
      room: 'A101',
      startTime: '08:30',
      endTime: '09:00',
      groupSize: 3,
      color: 'yellow',
    },
    {
      id: '10',
      teacher: 'Mr. Poverly',
      room: 'B203',
      startTime: '08:30',
      endTime: '09:00',
      groupSize: 4,
      color: 'green',
    },
    {
      id: '11',
      teacher: 'Mr. Adler',
      room: 'A101',
      startTime: '08:30',
      endTime: '09:30',
      groupSize: 3,
      color: 'green',
    },
    {
      id: '12',
      teacher: 'Mr. Huxley',
      room: 'B203',
      startTime: '08:30',
      endTime: '09:00',
      groupSize: 4,
      color: 'blue',
    },
    {
      id: '13',
      teacher: 'Mr. Ledger',
      room: 'C105',
      startTime: '10:30',
      endTime: '12:00',
      groupSize: 2,
      color: 'purple',
    },
    {
      id: '14',
      teacher: 'Mr. Hayes',
      room: 'D202',
      startTime: '09:00',
      endTime: '10:00',
      groupSize: 3,
      color: 'pink',
    },
    {
      id: '15',
      teacher: 'Mr. Wilson',
      room: 'B203',
      startTime: '09:00',
      endTime: '09:30',
      groupSize: 3,
      color: 'blue',
    },
  ]

  // Get day of week in Uzbek
  const getDayName = (date: Date) => {
    const days = [
      'Yakshanba',
      'Dushanba',
      'Seshanba',
      'Chorshanba',
      'Payshanba',
      'Juma',
      'Shanba',
    ]
    return days[date.getDay()]
  }

  // Check if a day is a weekend
  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  }

  // Helper function to convert time string to minutes since start of day
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  // Calculate duration in minutes
  const calculateDurationInMinutes = (
    startTime: string,
    endTime: string
  ): number => {
    const startMinutes = timeToMinutes(startTime)
    const endMinutes = timeToMinutes(endTime)
    return endMinutes - startMinutes
  }

  const getColorClasses = (color: string, isDark: boolean) => {
    if (isDark) {
      switch (color) {
        case 'green':
          return 'bg-emerald-900/50 border-l-4 border-emerald-600 text-emerald-300'
        case 'blue':
          return 'bg-sky-900/50 border-l-4 border-sky-600 text-sky-300'
        case 'yellow':
          return 'bg-amber-900/50 border-l-4 border-amber-600 text-amber-300'
        case 'purple':
          return 'bg-violet-900/50 border-l-4 border-violet-600 text-violet-300'
        case 'pink':
          return 'bg-pink-900/50 border-l-4 border-pink-600 text-pink-300'
        default:
          return 'bg-gray-800/50 border-l-4 border-gray-600 text-gray-300'
      }
    } else {
      switch (color) {
        case 'green':
          return 'bg-emerald-100 border-l-4 border-emerald-400 text-emerald-800'
        case 'blue':
          return 'bg-sky-100 border-l-4 border-sky-400 text-sky-800'
        case 'yellow':
          return 'bg-amber-100 border-l-4 border-amber-400 text-amber-800'
        case 'purple':
          return 'bg-violet-100 border-l-4 border-violet-400 text-violet-800'
        case 'pink':
          return 'bg-pink-100 border-l-4 border-pink-400 text-pink-800'
        default:
          return 'bg-gray-100 border-l-4 border-gray-400 text-gray-800'
      }
    }
  }

  const rooms = Array.from(
    new Set(scheduleData.map((session) => session.room))
  ).sort()

  const getClassesForDay = (date: Date) => {
    const dayOfWeek = date.getDay()

    const dayMapping: Record<number, string[]> = {
      0: [], // Sunday - no classes
      1: ['1', '2'], // Monday
      2: ['11'], // Tuesday
      3: ['9', '10'], // Wednesday
      4: ['12', '13', '14', '7'], // Thursday
      5: ['15', '3', '4', '5', '6'], // Friday
      6: [], // Saturday - no classes
    }

    return scheduleData.filter((session) => {
      return dayMapping[dayOfWeek]?.includes(session.id) || false
    })
  }

  const classesForSelectedDay = getClassesForDay(selectedDate)

  const handlePrevDay = () => {
    setSelectedDate((prevDate) => subDays(prevDate, 1))
  }

  const handleNextDay = () => {
    setSelectedDate((prevDate) => addDays(prevDate, 1))
  }

  const handleToday = () => {
    setSelectedDate(new Date())
  }

  const isDarkTheme = theme === 'dark'

  return (
    <div className='space-y-4'>
      <div className='mt-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='icon'
            onClick={handlePrevDay}
            aria-label='Previous day'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>

          <div className='flex items-center gap-2'>
            <span className='text-lg font-semibold'>
              {format(selectedDate, 'yyyy MMM dd', { locale: uz })}
            </span>
            <Button
              variant='ghost'
              size='sm'
              className='flex items-center gap-1'
              onClick={handleToday}
            >
              <Calendar className='h-4 w-4' />
              <span className='hidden sm:inline'>Bugun</span>
            </Button>
          </div>

          <Button
            variant='outline'
            size='icon'
            onClick={handleNextDay}
            aria-label='Next day'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>

        <h2 className='text-2xl font-bold'>{getDayName(selectedDate)}</h2>

        <div className='flex items-center gap-3'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className='flex items-center gap-1'
              >
                <Clock className='h-4 w-4' />
                <span>{timeInterval} daqiqa</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTimeInterval('15')}>
                15 daqiqa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeInterval('30')}>
                30 daqiqa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isWeekend(selectedDate) ? (
        <div className='flex h-64 items-center justify-center rounded-lg border bg-gray-50 dark:bg-gray-800'>
          <p className='text-xl font-medium text-gray-500 dark:text-gray-400'>
            Yopiq
          </p>
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <div className='min-w-[800px]'>
            <div
              className='grid'
              style={{
                gridTemplateColumns: `120px repeat(${timeSlots.length}, minmax(${timeInterval === '15' ? '100px' : '150px'}, 1fr))`,
              }}
            >
              <div className='py-3 text-sm font-medium text-gray-500 dark:text-gray-400'>
                Xona / Vaqt
              </div>

              {timeSlots.map((timeSlot) => (
                <div
                  key={timeSlot}
                  className='relative border-gray-200 p-3 text-start text-sm font-medium dark:border-gray-700'
                >
                  <span className='absolute -left-5'>{timeSlot}</span>
                </div>
              ))}

              {rooms.map((room) => (
                <React.Fragment key={room}>
                  <div className='border-t border-gray-200 p-3 text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400'>
                    {room}
                  </div>

                  {timeSlots.map((timeSlot) => (
                    <div
                      key={`${room}-${timeSlot}`}
                      className='min-h-[60px] border-l border-t border-gray-200 p-1 dark:border-gray-700'
                    >
                      {classesForSelectedDay
                        .filter(
                          (session) =>
                            session.room === room &&
                            session.startTime === timeSlot
                        )
                        .map((session) => {
                          const durationMinutes = calculateDurationInMinutes(
                            session.startTime,
                            session.endTime
                          )
                          const durationSlots = Math.ceil(
                            durationMinutes / Number.parseInt(timeInterval)
                          )
                          const colorClasses = getColorClasses(
                            session.color,
                            isDarkTheme
                          )

                          return (
                            <div
                              key={session.id}
                              className={cn(
                                'rounded-md p-2 shadow-sm',
                                colorClasses,
                                'transition-all duration-200'
                              )}
                              style={{
                                width:
                                  durationSlots > 1
                                    ? `calc(${durationSlots * 100}% + ${(durationSlots - 1) * 8}px)`
                                    : '100%',
                                gridColumn: `span ${durationSlots}`,
                              }}
                            >
                              <div className='font-medium'>
                                {session.teacher}
                              </div>
                              <div className='mt-1 flex items-center gap-1 text-xs'>
                                <Clock className='h-3 w-3' />
                                <span>
                                  {session.startTime} - {session.endTime}
                                </span>
                                {durationMinutes > 30 && (
                                  <span className='ml-1 rounded-full bg-gray-200 px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300'>
                                    {durationMinutes} daqiqa
                                  </span>
                                )}
                              </div>
                              <div className='mt-2 flex items-center justify-end'>
                                <div className='flex items-center gap-1 text-xs'>
                                  <Users className='h-3 w-3' />
                                  <span>{session.groupSize}</span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
