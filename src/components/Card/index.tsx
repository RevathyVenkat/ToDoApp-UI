import React, { useState } from 'react';
import { Button, Card, Input, Space } from 'antd';
import { IAddMasterPayload, IAddTaskPayload, IEditData, ITask, IToDoData, InitEditData, NotificationType } from '../../Model/constant';
import { PushpinFilled, PushpinOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import './index.css'
import { addChecked, addMaster, addPinnedChange, addTask, deleteMaster, deleteTask } from '../../api/taskApi';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface IProps {
    data: IToDoData
    changeMasterData: (data: IToDoData[]) => void
    notificationUpdate: (type: NotificationType, message: String, description: String) => void
}

const CardComponent = (props: IProps) => {
    const { data, changeMasterData, notificationUpdate } = props
    const { todoId, title, pinned, toDoTaskList } = data

    const [textValue, setTextValue] = useState('')
    const [editFieldValue, setEditFieldValue] = useState('')
    const [titleValue, setTitleValue] = useState(title)

    const [editData, setEditData] = useState<IEditData>(InitEditData)

    const onCheckboxChange = (x: ITask, e: CheckboxChangeEvent) => {
        const payload: IAddTaskPayload = {
            content: textValue,
            isChecked: e.target.checked,
            todoId: todoId,
            taskId: x.taskId
        }
        addChecked(payload)
            .then((res) => {
                changeMasterData(res)
            }).catch((err) => {

            })
    }

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextValue(e.target.value)
    }

    const onAddTask = () => {
        const payload: IAddTaskPayload = {
            content: textValue,
            isChecked: false,
            todoId: todoId,
            taskId: null
        }
        addTask(payload)
            .then((res) => {
                setTextValue('')
                changeMasterData(res)
            }).catch((err) => {

            })
    }

    const onEditClick = (x: ITask) => {
        const data: IEditData = {
            isEdit: true,
            todoId: todoId,
            taskId: x.taskId
        }
        setEditFieldValue(x.content)
        setEditData(data)
    }

    const onEditFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditFieldValue(e.target.value)
    }

    const onEditSubmit = (x: ITask) => {
        if (editFieldValue !== x.content) {
            const payload: IAddTaskPayload = {
                content: editFieldValue,
                isChecked: x.checked,
                todoId: todoId,
                taskId: x.taskId
            }
            addTask(payload)
                .then((res) => {
                    setEditData(InitEditData)
                    changeMasterData(res)
                }).catch((err) => {

                })
        }
    }

    const onDeleteSubmit = (x: ITask) => {
        const payload: IAddTaskPayload = {
            content: x.content,
            isChecked: x.checked,
            todoId: todoId,
            taskId: x.taskId
        }
        deleteTask(payload)
            .then((res) => {
                setEditData(InitEditData)
                changeMasterData(res)
                notificationUpdate('success', 'Success', 'To Do List deleted successfully')
            }).catch((err) => {
                notificationUpdate('error', 'Error', 'Unable to delete To Do List')
            })
    }

    const changePinned = (pinned: boolean) => {
        const payload: IAddMasterPayload = {
            todoId: todoId,
            title: title,
            isPinned: pinned,
            userId: 'revathyvenkat',
        }
        addPinnedChange(payload)
            .then((res) => {
                changeMasterData(res)
            }).catch((err) => {
            })
    }

    const onTitleClick = () => {
        const data: IEditData = {
            isEdit: true,
            todoId: todoId,
            taskId: null
        }
        setTitleValue(title)
        setEditData(data)
    }

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value)
    }

    const onTitleSubmit = () => {
        const payload: IAddMasterPayload = {
            todoId: todoId,
            title: titleValue,
            isPinned: null,
            userId: null
        }
        addMaster(payload)
            .then((res) => {
                changeMasterData(res)
            }).catch((err) => {
            })
    }

    const deleteMasterData = () => {
        const payload: IAddMasterPayload = {
            todoId: todoId,
            title: null,
            isPinned: null,
            userId: null
        }
        deleteMaster(payload)
            .then((res) => {
                changeMasterData(res)
            }).catch((err) => {
            })
    }

    return (
        <Space direction="vertical" size={16}>
            <Card 
            hoverable
            title={
                editData.isEdit && editData.todoId === todoId
                    ? <div>
                        <Input
                            value={titleValue}
                            variant="borderless"
                            onChange={onTitleChange}
                            onBlur={() => onTitleSubmit()}
                        />
                    </div>
                    : <div>
                        <Input
                            variant="borderless"
                            value={title}
                            onFocus={() => onTitleClick()}
                        />
                    </div>
            }
                extra={
                    <>
                        {pinned ? <PushpinFilled onClick={() => changePinned(!pinned)} /> : <PushpinOutlined onClick={() => changePinned(!pinned)} />}
                        <DeleteOutlined onClick={deleteMasterData} />
                    </>
                }>
                <Space.Compact style={{ width: '100%' }}>
                    <Input placeholder='Add task to list' value={textValue} onChange={onTextChange} />
                    <Button type="primary" onClick={onAddTask}>Add</Button>
                </Space.Compact>
                {toDoTaskList && toDoTaskList.length > 0 && toDoTaskList.map((x: ITask, index) => {
                    return <div className='card-content-row' key={index}>
                        <Checkbox
                            checked={x.checked}
                            onChange={(e) => onCheckboxChange(x, e)}
                        >
                        </Checkbox>
                        <div className='card-text'>
                            {editData.isEdit && editData.todoId === todoId && editData.taskId === x.taskId
                                ? <div>
                                    <Input
                                        value={editFieldValue}
                                        variant="borderless"
                                        onChange={onEditFieldChange}
                                        onBlur={() => onEditSubmit(x)}
                                        autoFocus
                                        className = {`${x.checked ? 'strike-through': ''}`} 
                                        addonAfter={<CloseOutlined onClick={() => onDeleteSubmit(x)} />}
                                    />
                                </div>
                                : <div>
                                    <Input
                                        variant="borderless"
                                        value={x.content}
                                        className = {`${x.checked ? 'strike-through': ''}`} 
                                        onFocus={() => onEditClick(x)}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                })}
            </Card>
        </Space>
    )
}
export default CardComponent;