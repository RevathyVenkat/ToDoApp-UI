import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import CardComponent from '../components/Card';
import { IAddMasterPayload, ITask, IToDoData, InitToDoData, NotificationType } from '../Model/constant';
import { addMaster, getToDoData } from '../api/taskApi';
import { Button, Col, Divider, Empty, FloatButton, Input, Modal, Row, Spin, notification } from 'antd';
import { CustomerServiceOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './index.css'

function Home() {
    const [toDoData, setToDoData] = useState<IToDoData[] | []>([])
    const [pinnedData, setPinnedData] = useState<IToDoData[] | []>([])
    const [notPinnedData, setNotPinnedData] = useState<IToDoData[] | []>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [titleValue, setTitleValue] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, message: String, description: String) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    useEffect(() => {
        setIsLoading(true)
        getToDoData()
            .then((data) => {
                setToDoData(data);
            }).catch((err: any) => {
            }).finally(() => {
                setIsLoading(false)
            });
    }, [])

    useEffect(() => {
        if (toDoData && toDoData.length > 0) {
            let pinnedData: IToDoData[] = []
            let notPinnedData: IToDoData[] = []
            toDoData.filter((x: IToDoData) => {
                if (x.pinned) {
                    pinnedData.push(x)
                } else {
                    notPinnedData.push(x)
                }
            })
            setPinnedData(pinnedData)
            setNotPinnedData(notPinnedData)
        }
    }, [toDoData])

    const changeMasterData = (updatedData: IToDoData[]) => {
        setToDoData(updatedData)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setTitleValue('')
        setIsModalOpen(false);
        const payload: IAddMasterPayload = {
            todoId: null,
            title: titleValue,
            isPinned: false,
            userId: 'revathyvenkat'
        }
        addMaster(payload)
            .then((res) => {
                changeMasterData(res)
                openNotificationWithIcon('success', "Success", "To do List created successfully")
            }).catch((err) => {
                openNotificationWithIcon('error', "Error", "Unable to create todo list")
            })
    };

    const handleCancel = () => {
        setTitleValue('')
        setIsModalOpen(false);
    };

    const onEditFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value)
    }

    return (
        <div className='home-container'>
            {contextHolder}
            <Header />
            <FloatButton
                shape="circle"
                type="primary"
                style={{ right: 94 }}
                onClick={showModal}
                icon={<PlusOutlined />}
            />
            <Modal title="Create ToDo List" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Submit
                    </Button>,
                ]}>
                <Input
                    placeholder='Enter title'
                    value={titleValue}
                    onPressEnter={handleOk}
                    onChange={onEditFieldChange}
                />
            </Modal>
            {isLoading
                ? <div className='loading-container'>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
                </div>
                : <>
                    {toDoData.length > 0 ? <>
                        <Row gutter={[32, 32]} className='card-container'>
                            {pinnedData && pinnedData.length > 0 && pinnedData.map((x: IToDoData, index) => {
                                return <Col span={6}>
                                    <CardComponent
                                        key={index}
                                        data={x}
                                        changeMasterData={changeMasterData}
                                        notificationUpdate={openNotificationWithIcon} />
                                </Col>
                            })}
                        </Row>
                        {notPinnedData && notPinnedData.length > 0  && pinnedData && pinnedData.length > 0 && <Divider />}
                        <Row gutter={[32, 32]} className='card-container'>
                            {notPinnedData && notPinnedData.length > 0 && notPinnedData.map((x: IToDoData, index) => {
                                return <Col span={6}>
                                    <CardComponent
                                        key={index}
                                        data={x}
                                        changeMasterData={changeMasterData}
                                        notificationUpdate={openNotificationWithIcon} />
                                </Col>
                            })}
                        </Row>
                    </> : <>
                        <Empty
                            className=''
                            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                            imageStyle={{
                                height: 60,
                                marginTop: '20%'
                            }}
                            description={
                                <span>No ToDo List present</span>
                            }
                        >
                            <Button type="primary" onClick={showModal}>Create Now</Button>
                        </Empty>
                    </>}
                </>
            }
        </div>
    )
}

export default Home