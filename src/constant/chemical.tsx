export type ContentType = Array<{attr: string, name: string | null}>

export const Titles = ['基本信息', '紧急情况描述', '理化特性', 'GHS危害性分类', '危险信息', '预防措施', '事故响应', '安全存储', '废弃处置', '物理和化学危险', '健康危害', '环境危害', '急救措施', '泄露应急处理', '操作处置与存储', '工程控制', '个体防护', '运输注意', '列入名录情况']

export const Items: Array<ContentType> = [
    [
        { attr: 'cn_name', name: '中文名称' },
        { attr: 'cn_alia', name: '中文别名' },
        { attr: 'en_name', name: '英文名称' },
        { attr: 'cas', name: 'CAS号' },
        { attr: 'formula', name: '分子式' },
    ],
    [
        { attr: 'emergency', name: null },
    ],
    [
        { attr: 'look', name: '外观与性状' },
        { attr: 'ph', name: 'ph值' },
        { attr: 'smell', name: '气味' },
        { attr: 'fei', name: '沸点、初沸点和沸程(℃)' },
        { attr: 'rong', name: '熔点/凝固点(℃)' },
        { attr: 'sky', name: '相对蒸汽密度(空气=1)' },
        { attr: 'kpa', name: '饱和蒸气压(kPa)' },
        { attr: 'water', name: '相对密度(水=1)' },
        { attr: 'mm2', name: '粘度(mm2/s)' },
        { attr: 'shan', name: '闪点(℃)' },
        { attr: 'xinchun', name: 'n-辛醇/水分配系数' },
        { attr: 'fenjie', name: '分解温度' },
        { attr: 'yinran', name: '引燃温度' },
        { attr: 'baozha', name: '爆炸上限/下限[%(V/V)]' },
        { attr: 'rongjie', name: '溶解性(mg/L)' },
        { attr: 'yiran', name: '易燃性' },
        { attr: 'stability', name: '稳定性' },
        { attr: 'danger_act', name: '危险反应' },
        { attr: 'avoid', name: '应避免的条件' },
        { attr: 'no_rong', name: '不相容的物质' },
        { attr: 'apart', name: '分解产物' },
    ],
    [
        { attr: 'danger_class', name: null },
    ],
    [
        { attr: 'danger', name: null },
    ],
    [
        { attr: 'prevent', name: null },
    ],
    [
        { attr: 'response', name: null },
    ],
    [
        { attr: 'store', name: null },
    ],
    [
        { attr: 'disposal_overview', name: null },
    ],
    [
        { attr: 'physical_chemical', name: null },
    ],
    [
        { attr: 'health', name: null },
    ],
    [
        { attr: 'environment', name: null },
    ],
    [
        { attr: 'first_aid', name: '一般性建议' },
        { attr: 'eye_touch', name: '眼睛接触' },
        { attr: 'skin_touch', name: '皮肤接触' },
        { attr: 'eat', name: '食入' },
        { attr: 'breath', name: '吸入' },
        { attr: 'advice', name: '对保护施救者的忠告' },
        { attr: 'doctor', name: '对医生的特别提示' },
        { attr: 'danger_properties', name: '危险特性' },
    ],
    [
        { attr: 'fire_stuff', name: '合适的灭火介质' },
        { attr: 'not_fire_stuff', name: '不合适的灭火介质' },
        { attr: 'fire_step', name: '灭火注意事项及措施' },
        { attr: 'protective_step', name: '作业人员防护措施、防护装备和应急处置程序' },
        { attr: 'environment_step', name: '环境保护措施' },
        { attr: 'leak_method', name: '泄漏化学品的收容、清除方法及处置材料' },
        { attr: 'step_attention', name: '操作注意事项' },
    ],
    [
        { attr: 'step_attention2', name: '操作注意事项' },
        { attr: 'store_attention', name: '储存注意事项' },
    ],
    [
        { attr: 'eng_control', name: null },
    ],
    [
        { attr: 'eye_protect', name: '眼睛防护' },
        { attr: 'hand_protect', name: '手部防护' },
        { attr: 'breath_protect', name: '呼吸系统防护' },
        { attr: 'skin_protect', name: '皮肤和身体防护' },
    ],
    [
        { attr: 'trans_attention', name: null },
    ],
    [
        { attr: 'book1', name: '1' },
        { attr: 'book2', name: '2' },
        { attr: 'book3', name: '3' },
        { attr: 'book4', name: '4' },
        { attr: 'book5', name: '5' },
        { attr: 'book6', name: '6' },
        { attr: 'book7', name: '7' },
        { attr: 'book8', name: '8' },
    ],
]
