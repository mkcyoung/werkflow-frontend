import {addDays, format, getDate, isSameDay, startOfWeek, sub, add} from 'date-fns';
import React, {useEffect, useState} from 'react';
import { WeekDayObj } from '../../types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import { purple } from '@mui/material/colors';

type Props = {
    date: Date;
    onChange: (value: Date) => void;
  };

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: 14
}));

const WeeklyCalendar = ({date, onChange} : Props) => {
    const [week, setWeek] = useState<WeekDayObj[]>([]);

    useEffect(() => {
        const weekDays = getWeekDays(date);
        setWeek(weekDays);
    }, [date]);

    return (
        <Box sx={{width: '90%', margin: '0 auto', flexGrow: 1 }}>
            <Grid container >
                <Grid item xs={6}>
                    <Typography variant="h2" component="div" gutterBottom>
                        {format(date,'MMMM y')}
                    </Typography>
                </Grid>
                
                <Grid item sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}} xs={6} >
                    <ButtonGroup >
                        <Button key='left' onClick={() => onChange(sub(date, {weeks: 1}))} > <ChevronLeftRounded/> </Button>
                        <Button key='today' onClick={() => onChange(new Date())} > today </Button>
                        <Button key='right' onClick={() => onChange(add(date, {weeks: 1}))}> <ChevronRightRounded/> </Button>
                    </ButtonGroup>
                </Grid>
                
            </Grid>
            
            <Grid container spacing={1} >
                <Grid container spacing={1} columns={7}>
                    {week.map((weekDay) => {
                        const sameDay = isSameDay(weekDay.date, new Date())
                        let dayStyle = styles.label
                        if (sameDay){
                            dayStyle = { ...dayStyle, ...styles.currentDayStyle}
                        }
                        return (
                            <Grid key={weekDay.formatted} item xs={1}>
                                <Item>{weekDay.formatted} <span style={dayStyle}> {weekDay.day} </span></Item>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Box>
    )
}

const styles = {
    label : {
        fontSize: 14
    },
    currentDayStyle: {
        borderRadius: 20,
        padding: 7.5,
        height: 25,
        width: 25,
        color: 'white',
        backgroundColor: 'coral'
    }
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