import React, {useState, useEffect} from 'react';
import {format, sub, add, isSameDay} from 'date-fns';

import AddPersonModal from "../AddPersonModal";
import AddTaskModal from "../AddTaskModal";
import { useDispatch } from 'react-redux'
import { getTasks, addTask } from '../../reducers/taskReducer'
import { getPeople, addPerson } from '../../reducers/peopleReducer'
import { Task, Person, PersonFormValues, TaskFormValues, useAppSelector } from '../../types'

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import SaveIcon from '@mui/icons-material/Save';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddTaskIcon from '@mui/icons-material/AddTask';

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

    const dispatch = useDispatch()

    // initalize tasks & people
    useEffect(() => {
        console.log(" in app use effect")
        dispatch(getTasks())
        dispatch(getPeople())
    }, [dispatch])
    const tasks : Task[] = useAppSelector(state => state.tasks)
    const people : Person[] = useAppSelector(state => state.people)
    console.log("Tasks: ",tasks)
    console.log("People: ",people)

    const modalState = {
        person: false,
        task: false
      }
    
    const [modalOpen, setModalOpen] = useState(modalState);
    const [error, setError] = useState<string | undefined>();

    const submitNewPerson = async (values: PersonFormValues ) => {
        console.log("submitted", values)
        dispatch(addPerson(values));
        closeModal();
    }

    const submitNewTask = async (values: TaskFormValues) => {
        console.log("submitted task: ", values)
        dispatch(addTask(values))
        closeModal();
    }

    const openModal = (modalType : 'person' | 'task'): void => {
        modalState[modalType] = true
        setModalOpen(modalState)
    }

    const closeModal = (): void => {
        modalState['person'] = false
        modalState['task'] = false
        setModalOpen(modalState);
        setError(undefined);
    }


    return (
        <>
        <Grid container spacing={1} >
            <Grid item xs={6}>
                <Typography variant="h2" component="div" >
                    {format(date,'MMMM y')}
                </Typography>
            </Grid>
            
            <Grid item sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}} xs={6} >
                <Stack direction='row' spacing={2}>
                    <Button variant="outlined" startIcon={<PersonAddIcon /> } onClick={() => openModal('person')}>
                        add person
                    </Button>
                    <Button variant="outlined" startIcon={<AddTaskIcon />} onClick={() => openModal('task')}>
                        add task
                    </Button>
                    <Button variant="outlined" startIcon={<SaveIcon />}>
                        Save
                    </Button>
                    <ButtonGroup >
                        <Button key='left' onClick={() => onChange(sub(date, {weeks: 1}))} > <ChevronLeftRounded/> </Button>
                        <Button key='today' onClick={() => onChange(new Date())} > today </Button>
                        <Button key='right' onClick={() => onChange(add(date, {weeks: 1}))}> <ChevronRightRounded/> </Button>
                    </ButtonGroup>
                </Stack>
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
                            <Item elevation={4}>{weekDay.formatted} <span style={dayStyle}> {weekDay.day} </span></Item>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
        <AddPersonModal
            modalOpen={modalOpen['person']}
            onSubmit={submitNewPerson}
            error={error}
            onClose={closeModal}
            taskData={tasks} // this might not work well, may need to move fetching tasks to the actual modal form?
        />
        <AddTaskModal
            modalOpen={modalOpen['task']}
            onSubmit={submitNewTask}
            error={error}
            onClose={closeModal}
            peopleData={people} // this might not work well, may need to move fetching tasks to the actual modal form?
            taskData={tasks}
        />
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