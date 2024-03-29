import React from 'react';
import {format} from 'date-fns';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { WeekDayObj } from '../../types';
import { styled } from "@mui/material/styles";

const CardContentPadding = styled(CardContent)(`
  padding: 10px;
  &:last-child {
    padding-bottom: 10px;
  }
`);

type Props = {
    task: any,
    weekDay: WeekDayObj,
    color: any
}
const TaskCard = ({task, weekDay, color} : Props) => {
    console.log("Tasks:",task,weekDay.day)
    // Alternatively here could get people from state based on IDs.... probably should do this.
    const peopleOnDay = task.people.filter((person: any) => person.schedule.map((day: any) => day.day).includes(format(weekDay.date, 'EEEE').toLowerCase()))
    console.log("people available for task",peopleOnDay)
    // TODO: Check here to see if they have the day off 
    // TODO: Implement sorting here based on that person's time for the day
    // TODO: Need to figure out what state to use and how that state interacts with the database storage
    // TODO: Make task cards responsive and size efficient
    return (
        <Grid item xs={1}>
            <Card elevation={4}  sx={{ display: 'flex', backgroundColor: color }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', flex: '1 1 auto' }}>
                    <CardContentPadding sx={{flex: '1 1 auto'}}>
                        <Stack spacing={2} sx={{flex: 1}}>
                        {
                            task.taskList.map((subTask: any, index: any) => {
                                return (
                                    <Autocomplete
                                        // multiple
                                        key={`${weekDay.formatted}-${weekDay.day}-${subTask.taskName}`}
                                        size='small'
                                        id={`${weekDay.formatted}-${weekDay.day}-${subTask.taskName}`}
                                        freeSolo
                                        options={peopleOnDay.map((person: any) => person.name.first)}
                                        // getOptionLabel={(person: any) => person.name.first}
                                        renderInput={(params) => <TextField {...params} 
                                            // InputLabelProps={{style: {fontSize: 18}}} 
                                            // sx={{ backgroundColor: 'white' }}
                                            label={subTask.taskName} />}
                                    />
                                       
                                )
                            })
                        }
                        </Stack>
                    </CardContentPadding>
                </Box>
            </Card>
        </Grid>
    )
}


export default TaskCard