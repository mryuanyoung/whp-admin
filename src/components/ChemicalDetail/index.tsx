/**
 * todo
 * 改掉这坨屎山，重构！！！
 * 长字段还没有添加修改
 */
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Drawer, Divider, Col, Row, Anchor, Typography, message } from 'antd';
import { ChemicalForm } from '../../interface/chemical';
import style from './index.module.scss';
import {updateChemical} from '../../api/chemical';
import {Titles} from '../../constant/chemical';

const { Link } = Anchor;
const { Text } = Typography;
interface Props {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    data: ChemicalForm,
}

interface ItemProps {
    title: string,
    content: string,
    attr: string,
    id: number,
}

const DescriptionItem: React.FC<ItemProps> = ({ title, content, attr, id }) => {

    const [cont, setCont] = useState(content);

    return (
        <div className={style.descItem}>
            <p className={style.descItemLabel}>{title}:</p>
            <Text editable={{
                tooltip: '编辑',
                onStart: () => {
                    console.log('start')
                },
                onChange: async(s) => {
                    console.log('change:    ', s)
                    setCont(s);
                    await updateChemical({
                        id,
                        [attr]: s
                    })
                    message.success(`成功更新: ${attr}`, 1);
                }
            }}>{cont}</Text>
        </div>
    )
};

const ChemicalDetail: React.FC<Props> = (props) => {

    const { visible, setVisible, data } = props;

    return (
        <Drawer
            // destroyOnClose
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
                        Titles.map((item, idx) => <Link key={idx} href={`#${idx + 1}`} title={item} />)
                    }
                </Anchor>
                <Divider type="vertical" dashed={true} className={style.divi} />
            </div>
            <div id={style.right}>
                <p className={style.descItemP} style={{ marginBottom: 24 }}>
                    {data.cn_name}
                </p>
                <p id='1' className={style.descItemP}>基本信息</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title='中文别名' content={data.cn_alia} attr='cn_alia' />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title='英文名称' content={data.en_name} attr='en_name' />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title='CAS号' content={data.cas} attr='cas' />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title='分子式' content={data.formula} attr='formula' />
                    </Col>
                </Row>
                {/* 二维码? */}
                <Divider />
                <p id='2' className={style.descItemP}>紧急情况描述</p>
                <Row>
                    <Col span={24}>
                        <span className={style.descItem}>{data.emergency}</span>
                    </Col>
                </Row>
                <Divider />
                <p id='3' className={style.descItemP}>理化特性</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="外观与性状" content={data.look} attr='look' />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="ph值" content={data.ph} attr='ph' />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="气味" content={data.smell} attr='smell' />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="沸点、初沸点和沸程(℃)" content={data.fei} attr='fei' />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="熔点/凝固点(℃)" content={data.rong} attr='rong' />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="相对蒸汽密度(空气=1)" content={data.sky} attr='sky' />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="饱和蒸气压(kPa)" content={data.kpa} attr='kpa' />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="相对密度(水=1)" content={data.water} attr='water' />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="粘度(mm2/s)" content={data.mm2} attr='mm2' />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="闪点(℃)" content={data.shan} attr='shan' />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="n-辛醇/水分配系数" content={data.xinchun} attr='xinchun' />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="分解温度" content={data.fenjie} attr='fenjie' />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="引燃温度" content={data.yinran} attr='yinran' />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="爆炸上限/下限[%(V/V)]" content={data.baozha} attr='baozha' />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="溶解性(mg/L)" content={data.rongjie} attr='rongjie' />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="易燃性" content={data.yiran} attr='yiran' />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="稳定性" content={data.stability} attr='stability' />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="危险反应" content={data.danger_act} attr='stability' />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="应避免的条件" content={data.avoid} attr='avoid' />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="不相容的物质" content={data.no_rong} attr='no_rong' />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem id={data.id} title="分解产物" content={data.apart} attr='apart' />
                    </Col>
                </Row>
                <Divider />
                <p id='4' className={style.descItemP}>GHS危害性分类</p>
                <Row>
                    <Col span={24}>
                        <span className={style.descItem}>{data.other}</span>
                        <br />
                        <span className={style.descItem}>{data.danger_class}</span>
                    </Col>
                </Row>
                <Divider />
                <p id='5' className={style.descItemP}>危险信息</p>
                <Row>
                    <Col span={24}>
                        <span className={style.descItem}>{data.danger}</span>
                    </Col>
                </Row>
                <Divider />
                <p id='6' className={style.descItemP}>预防措施</p>
                <Row>
                    <Col span={24}>
                        <span className={style.descItem}>{data.prevent}</span>
                    </Col>
                </Row>
                <Divider />
                <p id='7' className={style.descItemP}>事故响应</p>
                <Row>
                    <Col span={24}>
                        <span className={style.descItem}>{data.response}</span>
                    </Col>
                </Row>
                <Divider />
                <p id='8' className={style.descItemP}>安全存储</p>
                <Row>
                    <Col span={24}>
                        <span className={style.descItem}>{data.store}</span>
                    </Col>
                </Row>
                <Divider />
                <p id='9' className={style.descItemP}>废弃处置</p>
                <Row>
                    <Col span={24}>
                        <span className={style.descItem}>{data.disposal_overview}</span>
                    </Col>
                </Row>
                <Divider />
                <p id='10' className={style.descItemP}>物理和化学危险</p>
                <Row>
                    <Col span={24}>
                        <span className={style.descItem}>{data.physical_chemical}</span>
                    </Col>
                </Row>
                <Divider />
                <p id='11' className={style.descItemP}>健康危害</p>
                <Row>
                    <Col span={24}>
                        <span className={style.descItem}>{data.health}</span>
                    </Col>
                </Row>
                <Divider />
                <p id='12' className={style.descItemP}>环境危害</p>
                <Row>
                    <Col span={24}>
                        <span className={style.descItem}>{data.environment}</span>
                    </Col>
                </Row>
                <Divider />
                <p id='13' className={style.descItemP}>急救措施</p>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="一般性建议" content={data.first_aid} attr='first_aid' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="眼睛接触" content={data.eye_touch} attr='eye_touch' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="皮肤接触" content={data.skin_touch} attr='skin_touch' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="食入" content={data.eat} attr='eat' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="吸入" content={data.breath} attr='breath' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="对保护施救者的忠告" content={data.advice} attr='advice' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="对医生的特别提示" content={data.doctor} attr='doctor' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="危险特性" content={data.danger_properties} attr='danger_properties' />
                    </Col>
                </Row>
                <Divider />
                <p id='14' className={style.descItemP}>泄露应急处理</p>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="合适的灭火介质" content={data.fire_stuff} attr='fire_stuff' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="不合适的灭火介质" content={data.not_fire_stuff} attr='not_fire_stuff' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="灭火注意事项及措施" content={data.fire_step} attr='fire_step' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="作业人员防护措施、防护装备和应急处置程序" content={data.protective_step} attr='protective_step' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="环境保护措施" content={data.environment_step} attr='environment_step' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="泄漏化学品的收容、清除方法及处置材料" content={data.leak_method} attr='leak_method' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="操作注意事项" content={data.step_attention} attr='step_attention' />
                    </Col>
                </Row>
                <Divider />
                <p id='15' className={style.descItemP}>操作处置与存储</p>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="操作注意事项" content={data.step_attention2} attr='step_attention2' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="储存注意事项" content={data.store_attention} attr='store_attention' />
                    </Col>
                </Row>
                <Divider />
                <p id='16' className={style.descItemP}>工程控制</p>
                <Row>
                    <Col span={24}>
                        <span className={style.descItem}>{data.eng_control}</span>
                    </Col>
                </Row>
                <Divider />
                <p id='17' className={style.descItemP}>个体防护</p>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="眼睛防护" content={data.eye_protect} attr='eye_protect' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="手部防护" content={data.hand_protect} attr='hand_protect' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="呼吸系统防护" content={data.breath_protect} attr='breath_protect' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem id={data.id} title="皮肤和身体防护" content={data.skin_protect} attr='skin_protect' />
                    </Col>
                </Row>
                <Divider />
                <p id='18' className={style.descItemP}>运输注意</p>
                <Row>
                    <Col span={24}>
                        <span className={style.descItem}>{data.trans_attention}</span>
                    </Col>
                </Row>
                <Divider />
                <p id='19' className={style.descItemP}>列入名录情况</p>
                {
                    Array.from(new Array(8).keys()).map((idx) => (
                        <Row key={idx}>
                            <Col span={24}>
                                <span className={style.descItem}>{`${idx + 1}: ${data[`book${idx + 1}`] ? '' : '未'}列入`}</span>
                            </Col>
                        </Row>
                    ))
                }
            </div>
        </Drawer>
    )
};

export default ChemicalDetail