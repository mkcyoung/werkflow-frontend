import React from 'react';
import {format, sub, add, isSameDay} from 'date-fns';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { colors } from '../../constants';


import { WeekDayObj } from '../../types';


type Props = {
    date: Date;
    week: WeekDayObj[];
    onChange: (value: Date) => void;
};

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: 14
}));


const CalendarHeader = ( {date, week, onChange}: Props) => {

    return (
        <>
        <Grid container spacing={1} >
            <Grid item xs={6}>
                <Typography variant="h2" component="div" >
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
            <Grid container item spacing={1} columns={7}>
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
        </>
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
        backgroundColor: colors[0]
    }
}

export default CalendarHeader