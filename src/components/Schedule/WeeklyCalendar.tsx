import {addDays, format, getDate, startOfWeek} from 'date-fns';
import React, {useEffect, useState} from 'react';
import { WeekDayObj } from '../../types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import { Task } from '../../types';


type Props = {
    taskData: Task[];
    date: Date;
    onChange: (value: Date) => void;
  };

const WeeklyCalendar = ({taskData, date, onChange} : Props) => {
    const [week, setWeek] = useState<WeekDayObj[]>([]);

    useEffect(() => {
        const weekDays = getWeekDays(date);
        setWeek(weekDays);
    }, [date]);

    return (
        <Box sx={{width: '95%', margin: '0 auto', flexGrow: 1 }}>
        {/* // <Grid container style={{width: '95%', margin: '0 auto' }} spacing={0} > */}
            <CalendarHeader date={date} week={week} onChange={onChange} />
            <CalendarBody taskData={taskData} week={week} />
        {/* // </Grid> */}
        </Box>
    )
}

// get week days
export const getWeekDays = (date: Date): WeekDayObj[] => {
    const start = startOfWeek(date, {weekStartsOn: 0});
  
    const final = [];
  
    for (let i = 0; i < 7; i++) {
      const date = addDays(start, i);
      final.push({
        formatted: format(date, 'EEE'),
        date,
        day: getDate(date),
      });
    }
  
    return final;
};

export default WeeklyCalendar