export interface IToDoData {
    todoId: number,
    title: string,
    createdDate: string,
    updatedDate: string,
    userId: string,
    pinned: boolean
    toDoTaskList: ITask[]
}

export interface ITask {
    taskId: number,
    content: string,
    createdDate: string,
    updatedDate: string,
    orderId: number,
    checked: boolean
}


export const InitTask: ITask = {
    taskId: 0,
    content: '',
    createdDate: '',
    updatedDate: '',
    orderId: 0,
    checked: false
}

export const InitToDoData: IToDoData = {
    todoId: 0,
    title: '',
    createdDate: '',
    updatedDate: '',
    userId: '',
    pinned: false,
    toDoTaskList: [InitTask]
}

export interface IAddTaskPayload {
    content: string,
    isChecked: boolean,
    todoId: number,
    taskId: number | null
}

export interface IAddMasterPayload {
    todoId: number,
    title: string,
    isPinned: boolean,
    userId: string,
}


export interface IEditData {
    isEdit: boolean,
    todoId: number,
    taskId: number
}

export const InitEditData: IEditData = {
    isEdit: false,
    todoId: 0,
    taskId: 0
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
