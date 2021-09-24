import React, {useEffect, useState} from 'react';
import { WeekDayObj, Task } from '../../types';
import {addDays, format, getDate, isSameDay, startOfWeek, sub, add} from 'date-fns';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

type Props = {
    taskData: Task[];
    week: WeekDayObj[];
  };

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: 14
}));


const CalendarBody = ({taskData, week}: Props) => {

    const taskCategories = taskData.length > 0 ? taskData
        .map(task => task.category)
        .filter(onlyUnique) : []

    return (
        <Grid container spacing={1} columns={7} sx={{paddingTop:'10px'}}>
            {
                taskCategories.map((category, index) => {
                    const tasksInCategory = taskData.filter((task) => task.category === category)
                    return (
                        <Grid key={index} container item spacing={1}>
                            <Grid item xs={7}> 
                                <Item> {category}</Item>
                            </Grid>
                            {
                                week.map((weekDay, index) => {
                                    const tasksOnDay = tasksInCategory.filter((task) => task.schedule.map(day => day.day).includes(format(weekDay.date, 'EEEE').toLowerCase()))
                                    if (tasksOnDay.length > 0 ) {
                                        return tasksOnDay.map((task) => {
                                                console.log(task)
                                                return (
                                                    <Grid item key={index} xs={1}>
                                                        <Item>{task.name}</Item>
                                                    </Grid>
                                                    )
                                                })
                                    } else {
                                        return (
                                            <Grid item key={index} xs={1}>
                                                <Item> </Item>
                                            </Grid>
                                            )
                                    }
                                })
                            }
                        </Grid>
                )})
            }
        </Grid>
    )
}

const onlyUnique = (value: any, index: any, self: any) => {
    return self.indexOf(value) === index;
}

export default CalendarBody