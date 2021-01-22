import React, { Dispatch, SetStateAction, useState, useContext } from 'react';
import { Drawer, Button, Typography, message, Form, Input, Progress } from 'antd';
import { ChemicalInfo } from '../../interface/chemical';
import style from './index.module.scss';
import { addChemical } from '../../api/chemical';
import { Titles, Items, ContentType } from '../../constant/chemical';
import {INVALID_LOGIN_MSG} from '../../constant/index';
import {UserInfoCtx} from '../../App';
const { Title } = Typography;

const { TextArea } = Input;

const FormCtx = React.createContext({} as any);

const StepContent: React.FC<{ items: ContentType, name: string }> = (props) => {

    const { items, name } = props;
    const form = useContext(FormCtx);

    return (
        <>
            <Title className={style.title} level={4}>{name}</Title>
            <Form
                scrollToFirstError
                labelCol={{ span: 9 }}
                form={form}
            >
                {
                    items.map((item) => item.name ? (
                        <Form.Item
                            key={item.attr}
                            name={item.attr}
                            label={item.name}
                            rules={[{ required: true, message: `请输入${item.name}!` }]}
                        >
                            <TextArea autoSize className={style.TextArea} />
                        </Form.Item>
                    ) : (
                            <Form.Item
                                key={item.attr}
                                name={item.attr}
                                label='请输入'
                                rules={[{ required: true, message: '请输入内容!' }]}
                            >
                                <TextArea autoSize={{ minRows: 5 }} className={style.TextArea} />
                            </Form.Item>
                        ))
                }
            </Form>
        </>
    );
};

const Contents = Items.map((item, idx) => (
    <StepContent items={item} key={idx} name={Titles[idx]} />
));

interface Props {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    setFresh: () => void,
}

const STEP = Math.floor(100 / 19);

const ChemicalAddition: React.FC<Props> = (props) => {

    const { visible, setVisible, setFresh } = props;
    const [current, setCurrent] = React.useState(0);
    const [percent, setPercent] = useState(STEP * 2);
    const [submitForm, setSubmitForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const next = async () => {
        await form.validateFields();
        setSubmitForm((f) => ({ ...f, ...(form.getFieldsValue()) }))
        const p = percent + STEP;
        setPercent(p > 100 ? 100 : p);
        setCurrent(current + 1);
    };

    const prev = () => {
        const p = percent - STEP;
        setPercent(p < 0 ? 0 : p);
        setCurrent(current - 1);
    };

    const formFinished = async () => {
        setLoading(true);
        addChemical(submitForm as ChemicalInfo)
            .then(() => {
                message.success('成功添加化学品', 2);
                setLoading(false);
                setVisible(false);
                setFresh();
            }).catch((error) => {
                message.error('网络错误: ', 2);
                setLoading(false);
            })
    };

    return (
        <FormCtx.Provider value={form}>
            <Drawer
                width='60vw'
                placement="right"
                closable={false}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Progress className={style.progress} percent={percent} />
                <div id={style.content}>
                    {Contents[current]}
                </div>
                <div id={style.btns}>
                    {current < Titles.length - 1 && (
                        <Button type="primary" onClick={next}>
                            下一页
                        </Button>
                    )}
                    {current === Titles.length - 1 && (
                        <Button type="primary" onClick={formFinished} loading={loading}>
                            提交
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={prev}>
                            上一页
                        </Button>
                    )}
                </div>
            </Drawer>
        </FormCtx.Provider>
    )
}

export default ChemicalAddition;