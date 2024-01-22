import { IAddMasterPayload, IAddTaskPayload } from "../Model/constant"

export const getToDoData = (): Promise<any> => {
    return fetch('/api/viewToDoList')
        .then((res) => {
            return Promise.resolve(returnJson(res))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export const addTask = (payload: IAddTaskPayload): Promise<any> => {
    const init: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }
    return fetch('/api/insertTasks', init)
        .then((res) => {
            return Promise.resolve(returnJson(res))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export const addChecked = (payload: IAddTaskPayload): Promise<any> => {
    const init: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }
    return fetch('/api/checkedTask', init)
        .then((res) => {
            return Promise.resolve(returnJson(res))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export const addMaster = (payload: IAddMasterPayload): Promise<any> => {
    const init: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }
    return fetch('/api/createToDoList', init)
        .then((res) => {
            return Promise.resolve(returnJson(res))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export const deleteMaster = (payload: IAddMasterPayload): Promise<any> => {
    const init: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }
    return fetch('/api/deleteMaster', init)
        .then((res) => {
            return Promise.resolve(returnJson(res))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export const addPinnedChange = (payload: IAddMasterPayload): Promise<any> => {
    const init: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }
    return fetch('/api/updateIsPinned', init)
        .then((res) => {
            return Promise.resolve(returnJson(res))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export const deleteTask = (payload: IAddTaskPayload): Promise<any> => {
    const init: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }
    return fetch('/api/deleteTasks', init)
        .then((res) => {
            return Promise.resolve(returnJson(res))
        }).catch((err) => {
            return Promise.reject(err)
        })
}

export const updateTodoData = () => {

}

export const updateTaskData = () => {

}

const returnJson = (response: Response) => {
    return response.json();
}