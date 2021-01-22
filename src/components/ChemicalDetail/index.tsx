import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Drawer, Divider, Col, Row, Anchor, Typography, message } from 'antd';
import { ChemicalForm } from '../../interface/chemical';
import style from './index.module.scss';
import { updateChemical } from '../../api/chemical';
import { Titles, Items } from '../../constant/chemical';

const { Link } = Anchor;
const { Text } = Typography;
interface ItemProps {
    attr: string,
    name: string | null,
}

const DataCtx = React.createContext({} as ChemicalForm);

const DescriptionItem: React.FC<ItemProps> = (props) => {

    const data = useContext(DataCtx);
    const { name, attr } = props;
    const [cont, setCont] = useState(data[attr]);

    return (
        <div className={style.descItem}>
            {
                name ? <p className={style.descItemLabel}>{name}:</p> : null
            }
            <Text editable={{
                tooltip: '编辑',
                onStart: () => {
                    console.log('start')
                },
                onChange: async (s) => {
                    console.log('change:    ', s)
                    if (s !== cont) {
                        setCont(s);
                        await updateChemical({
                            id,
                            [attr]: s
                        })
                        message.success(`成功更新: ${attr}`, 1);
                    }

                }
            }}>{cont}</Text>
        </div>
    )
};
interface GroupProps {
    id: string,
    title: string,
    items: Array<ItemProps>
}

const DetailGroup: React.FC<GroupProps> = (props) => {

    const { id, title, items } = props;

    return (
        <>
            <Divider />
            <p id={id} className={style.descItemP}>{title}</p>
            {
                items.length > 1 ? (
                    Array.from(new Array(Math.ceil(items.length / 2)).keys()).map(idx => (
                        <Row key={items[idx].attr+idx}>
                            <Col span={12}>
                                <DescriptionItem name={items[idx * 2].name} attr={items[idx * 2].attr} />
                            </Col>
                            {
                                (idx * 2 + 1) < items.length ? (
                                    <Col span={12}>
                                        <DescriptionItem name={items[idx * 2 + 1].name} attr={items[idx * 2 + 1].attr} />
                                    </Col>
                                ) : null
                            }
                        </Row>
                    ))
                ) : (
                        <Row>
                            <Col span={24}>
                                <DescriptionItem name={items[0].name} attr={items[0].attr} />
                            </Col>
                        </Row>
                    )
            }
        </>
    );
};

let id: number;

interface Props {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    data: ChemicalForm,
}

const ChemicalDetail: React.FC<Props> = (props) => {

    const { visible, setVisible, data } = props;
    id = data.id;

    return (
        <Drawer
            destroyOnClose
            className='DETAIL'
            width='60vw'
            placement="right"
            closable={false}
            onClose={() => setVisible(false)}
            visible={visible}
            bodyStyle={{
                display: 'flex'
            }}
        >

            <div id={style.left}>
                <Anchor getContainer={() => document.querySelector('.DETAIL .ant-drawer-body') as HTMLElement}>
                    {
                        Titles.map((item, idx) => <Link key={item} href={`#${idx + 1}`} title={item} />)
                    }
                </Anchor>
                <Divider type="vertical" dashed={true} className={style.divi} />
            </div>
            <div id={style.right}>
                <DataCtx.Provider value={data}>
                    {
                        Titles.map((item, idx) => (
                            <DetailGroup
                                key={item+idx}
                                id={idx + 1 + ''}
                                title={item}
                                items={Items[idx]}
                            />
                        ))
                    }
                </DataCtx.Provider>
            </div>
        </Drawer>
    )
};

export default ChemicalDetail