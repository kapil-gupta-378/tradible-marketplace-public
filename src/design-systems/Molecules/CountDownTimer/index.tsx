import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'

interface TimerProps {
  startTime: string
  endTime: string
  interval: string
}

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

const Timer: React.FC<TimerProps> = ({ startTime, endTime, interval }) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [intervalValue, setIntervalValue] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  })
  const timerIdRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Convert the strings to Date objects and numeric values when the props change
    const newStartDate = new Date(startTime)
    const newEndDate = new Date(endTime)
    const newInterval = parseInt(interval, 10)

    setStartDate(newStartDate)
    setEndDate(newEndDate)
    setIntervalValue(newInterval)

    return () => {
      // Clean up the timer when the component unmounts or when props change
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current)
      }
    }
  }, [startTime, endTime, interval])

  const startTimer = () => {
    if (!startDate || !endDate || !intervalValue) {
      return
    }

    const timerId = setInterval(() => {
      const timeRemaining = endDate.getTime() - new Date().getTime()
      setTimeRemaining(calculateTimeRemaining(timeRemaining))

      if (timeRemaining <= 0) {
        clearInterval(timerId)
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          total: 0,
        })
      }
    }, intervalValue)

    timerIdRef.current = timerId
  }

  const calculateTimeRemaining = (time: number): TimeRemaining => {
    const total = time / 1000
    const days = Math.floor(total / (3600 * 24))
    const hours = Math.floor((total % (3600 * 24)) / 3600)
    const minutes = Math.floor((total % 3600) / 60)
    const seconds = Math.floor(total % 60)

    return {
      days,
      hours,
      minutes,
      seconds,
      total,
    }
  }

  useEffect(() => {
    startTimer()
  }, [startDate, endDate, interval])

  if (moment(startTime).isAfter(moment())) {
    const auctionStartDate = moment(startTime, 'YYYY-MM-DD HH:mm:ss')

    const currentDate = moment()

    const diffSeconds = auctionStartDate.diff(currentDate, 'seconds')

    // Display the difference based on conditions
    let displayString = ''

    if (diffSeconds >= 86400) {
      // More than 24 hours left, show in days
      const diffDays = Math.ceil(diffSeconds / 86400)
      displayString = `${diffDays} days`
    } else if (diffSeconds >= 3600) {
      // More than 1 hour but less than 24 hours left, show in hours
      const diffHours = Math.ceil(diffSeconds / 3600)
      displayString = `${diffHours} hours`
    } else if (diffSeconds >= 60) {
      // More than 1 minute but less than 1 hour left, show in minutes
      const diffMinutes = Math.ceil(diffSeconds / 60)
      displayString = `${diffMinutes} minutes`
    } else {
      // Less than 1 minute left, show in seconds
      displayString = `${diffSeconds} seconds`
    }

    return (
      <div>
        <div>
          {/* Sale will start after {day ? `${day} days,` : ''} {day === 0 ? `${hours % 24} hours` : ''}. */}
          Sale will start after {displayString}.
        </div>
      </div>
    )
  }

  return (
    <div>
      <div>
        {timeRemaining && timeRemaining.total > 0 ? (
          <div>
            Time left: {timeRemaining.days} d, {timeRemaining.hours} h, {timeRemaining.minutes} m{' '}
            {/* {timeRemaining.seconds} s */}
          </div>
        ) : (
          <div>Sale has ended</div>
        )}
      </div>
    </div>
  )
}

export default Timer
