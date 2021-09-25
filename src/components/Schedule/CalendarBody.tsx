import React, {useEffect, useState} from 'react';
import { WeekDayObj, Task } from '../../types';
import {addDays, format, getDate, isSameDay, startOfWeek, sub, add} from 'date-fns';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import TaskCard from './TaskCard';

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

    // Create an object that represents the week, this may make populating the schedule easier
    // plus I can assign people to each task, then I can save this object to the backend to be 
    // retrieved later, I think that's how I'll populate the chart....
    // Maybe it makes sense here to make this one big form using formik...
    const weekObj: any = {
        week: week[0] ? format(week[0].date,'I') : null
    }
    week.map((weekDay) => {
        const tasksOnDay = taskData.filter((task) => task.schedule.map(day => day.day).includes(format(weekDay.date, 'EEEE').toLowerCase()))
        weekObj[`${weekDay.formatted}`] = {
            day: weekDay.date,
            tasks: tasksOnDay.map((task) => {
                const taskDaySchedule = task.schedule.filter((day) => day.day === format(weekDay.date, 'EEEE').toLowerCase())[0]
                return {
                    name: task.name,
                    category: task.category,
                    people: task.people,
                    taskTime: task.taskTime,
                    taskList: taskDaySchedule.subTasks ? taskDaySchedule.subTasks.map((subTask: any) => {
                        return {
                            taskName: `${task.name} @ ${subTask.start}`,
                            person: null
                        }
                    }) : 
                    [{
                        taskName: `${task.name}`,
                        person: null
                    }]
                }
            })
        }
    })
    
    console.log("Week Obj",weekObj)

    return (
        <Grid container spacing={1} columns={7} sx={{paddingTop:'10px'}}>
            {
                taskCategories.map((category,index) => {
                    return (
                        <Grid key={index} container item spacing={1}>
                            <Grid item xs={7}> 
                                <Item>{category}</Item>
                            </Grid>
                        
                        {
                            week.map((weekDay, i) => {
                                const tasksOnDay = weekObj[`${weekDay.formatted}`].tasks?.filter((task: any) => task.category === category)
                                if (tasksOnDay.length > 0){
                                    return tasksOnDay.map((task: any) => {
                                        return <TaskCard key={i} task={task} weekDay={weekDay} />
                                        // return task.taskList.map((subTask: any, j: any) => {
                                        //     return (
                                        //         <Grid item key={`${i}-${j}`} xs={1}>
                                        //             <Item>{subTask.taskName}</Item>
                                        //         </Grid>
                                        //     )
                                        // })

                                    })
                                } else {
                                    return (
                                        <Grid item key={i} xs={1}>
                                            <Item></Item>
                                        </Grid>
                                    )
                                }
                            })
                        }
                        </Grid>
                    )
                })
            }
        </Grid>
        // <Grid container spacing={1} columns={7} sx={{paddingTop:'10px'}}>
        //     {
        //         taskCategories.map((category, index) => {
        //             const tasksInCategory = taskData.filter((task) => task.category === category)
        //             return (
        //                 <Grid key={index} container item spacing={1}>
        //                     <Grid item xs={7}> 
        //                         <Item> {category}</Item>
        //                     </Grid>
        //                     {
        //                         week.map((weekDay, index) => {
        //                             const tasksOnDay = tasksInCategory.filter((task) => task.schedule.map(day => day.day).includes(format(weekDay.date, 'EEEE').toLowerCase()))
        //                             if (tasksOnDay.length > 0 ) {
        //                                 return tasksOnDay.map((task) => {
        //                                         console.log(task)
        //                                         return (
        //                                             <Grid item key={index} xs={1}>
        //                                                 <Item>{task.name}</Item>
        //                                             </Grid>
        //                                             )
        //                                         })
        //                             } else {
        //                                 return (
        //                                     <Grid item key={index} xs={1}>
        //                                         <Item> </Item>
        //                                     </Grid>
        //                                     )
        //                             }
        //                         })
        //                     }
        //                 </Grid>
        //         )})
        //     }
        // </Grid>
    )
}

const onlyUnique = (value: any, index: any, self: any) => {
    return self.indexOf(value) === index;
}

export default CalendarBody