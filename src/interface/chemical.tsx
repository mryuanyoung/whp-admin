import ChemicalDetail from '../components/ChemicalDetail';
import {ListResponse} from './index';

export interface ChemicalInfo {
    cn_name: string,//中文名称
    en_name: string,//英文名称
    cn_alia: string,//中文别名
    cas: string,//CAS号
    formula: string,//分子式
    emergency: string, // 紧急情况描述
    danger_class: string,//GHS危害性分类
    other: string,// 未知列
    danger: string,//危险信息
    prevent: string,//预防措施
    response: string,//事故响应
    store: string,//安全存储
    disposal_overview: string,//废弃处置
    physical_chemical: string,//物理和化学危险
    health: string,//健康危害
    environment: string,//环境危害
    first_aid: string,//急救措施
    eye_touch: string,//急救措施-眼睛接触
    skin_touch: string,//急救措施-皮肤接触
    eat: string,//急救措施-食入
    breath: string,//急救措施-吸入
    advice: string,//对保护施救者的忠告
    doctor: string,//对医生的特别提示
    danger_properties: string,//危险特性
    fire_stuff: string,//适合的灭火介质
    not_fire_stuff: string,//不适合的灭火介质
    fire_step: string,//灭火注意事项及措施
    protective_step: string,//作业人员防护措施、防护装备和应急处置程序
    environment_step: string,//环境保护措施
    leak_method: string,//泄漏化学品的收容、清除方法及处置材料
    step_attention: string,//操作注意事项
    step_attention2: string,//操作注意事项
    store_attention: string,//储存注意事项
    eng_control: string,//工程控制
    eye_protect: string,//眼睛防护
    hand_protect: string,//手部防护
    breath_protect: string,//呼吸系统防护
    skin_protect: string,//皮肤和身体防护
    look: string,//外观与性状
    ph: string,//ph值（指明浓度）
    smell: string,//气味
    fei: string,//沸点、初沸点和沸程(℃)
    rong: string,//熔点/凝固点(℃)
    sky: string,//相对蒸气密度(空气=1)
    kpa: string,//饱和蒸汽压
    water: string,//相对密度
    mm2: string,//黏度
    shan: string,//闪点
    xinchun: string,//n-辛醇/水分配系数
    fenjie: string,//分解温度
    yinran: string,//引燃温度
    baozha: string,//爆炸上限/下限
    rongjie: string,//溶解性
    yiran: string,//易燃性
    stability: string,//稳定性
    danger_act: string,//危险反应
    avoid: string,//应避免的条件
    no_rong: string,//不相容的物质
    apart: string,//分解产物
    disposal: string,//废弃物质处置方法-产品
    disposal2: string,//废弃处置方法-不洁的包装
    disposal_attention: string,//废弃注意事项
    trans_attention: string,//运输注意事项
    book1: number,
    book2: number,
    book3: number,
    book4: number,
    book5: number,
    book6: number,
    book7: number,
    book8: number,
}


export interface ChemicalParam {
    key?: string,
    page: number,
    limit: number,
}

type book = 'book1' | 'book2' | 'book3' | 'book4'| 'book5' | 'book6' | 'book7' | 'book8'

export interface ChemicalForm extends ChemicalInfo {
    id: number,
    [key: string]: any
}

export interface updateForm {
    id: number,
    [key: string]: any
}

export type ChemicalList = ListResponse<Array<ChemicalForm>>