// 'use strict'
import React, { useEffect, useState } from 'react';
import { logic } from './const';
import {
    RightCircleOutlined, HomeOutlined, MinusCircleOutlined
    , PlusOutlined
} from '@ant-design/icons';
import './home.css'
import axios from 'axios'
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Space,
} from 'antd';


const Home = () => {
    const [showName, setShowName] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [showQuestion, setShowQuestion] = useState(false)
    const [showQuestion1, setShowQuestion1] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)

    const [name, setName] = useState("")
    const [input, setInput] = useState({});
    const [inputAnswer, setInputAnswer] = useState({})
    const [data, setData] = useState([])
    // const [show, setShow] = useState(false)
    const [answer, setAnswer] = useState({})

    // const [sum ,setSum] = useState(0)

    const _requestData = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/home")
            console.log("data", data);
            setData(data)
        } catch (error) {
            console.log("err", error);
        }
    }

    useEffect(() => {
        _requestData()
    }, [])

    const { Option } = Select;
    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 14,
        },
    };

    const result = async (inputClient ,tong) => {
        console.log("aaaaaa" ,tong);
        console.log("inputdata" , inputClient);
        const resultData = data.map(item => {

            console.log(
                // 3 * logic.sex[inputClient.sex][item.sex] , "=",
                //     6 * logic.ielts[inputClient.ielts][item.ielts] , "=",
                //     6 * logic.level[inputClient.level][item.level] , "=",
                //     5 * logic.specialized[inputClient.specialized][item.specialized] , "=",
                //     5 * logic.degree[inputClient.degree][item.degree] , "=",
                //     inputClient.hasOwnProperty("communicate") ? 5 * logic.communicate[inputClient.communicate][item.communicate] : 0 , "=",
                //     inputClient.hasOwnProperty("work_grops") ? 5 * logic.work_grops[inputClient.work_grops][item.work_grops] : 0 , "=",
                    // 5 * logic.leader[inputClient.leader][item.leader] , "=",
                    // 5 * logic.presentation[inputClient.presentation][item.presentation]
            );

            return {
                id: item.id, sum: ((3 * logic.sex[inputClient.sex][item.sex]) +
                    ( 6 * logic.ielts[inputClient.ielts][item.ielts]) +
                    (6 * logic.level[inputClient.level][item.level]) +
                    (10 * logic.specialized[inputClient.specialized][item.specialized]) +
                    (5 * logic.degree[inputClient.degree][item.degree]) +
                    (inputClient.hasOwnProperty("communicate") ? 5 * logic.communicate[inputClient.communicate][item.communicate] : 0) +
                    (inputClient.hasOwnProperty("work_grops") ? 5 * logic.work_grops[inputClient.work_grops][item.work_grops] : 0) +
                    (inputClient.hasOwnProperty("leader") ? 5 * logic.leader[inputClient.leader][item.leader] : 0) +
                    ( inputClient.hasOwnProperty("presentation") ? 5 * logic.presentation[inputClient.presentation][item.presentation] : 0)) / tong
            }
        })
        console.log("", resultData);
        var stt = 0;
        var max = 0
        for (let i = 0; i < resultData.length; i++) {
            if (resultData[i].sum >= max) {
                max = resultData[i].sum
                stt = resultData[i].id
            }
        }
        console.log("=======", { max, stt });
        console.log(data[stt - 1]);
        setAnswer({ des: data[stt - 1].desc, job: data[stt - 1].job })
        setShowAnswer(true)
        const res = await axios.post("http://localhost:5000/home", { ...inputClient, job: data[stt - 1].job, desc: data[stt - 1].desc })
        console.log("res", res);
        return resultData
    }

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setInput({ ...input, ...values })
        setShowForm(false)
        setShowQuestion(true)
        // console.log(
        //     "input", { ...input, ...values }
        // )
        // result({ ...input, ...values })
    };
    console.log("input", input);
    const onFinishQuestion = (value) => {
        console.log("val", value);
        setInputAnswer({ ...inputAnswer, ...value })
        setShowQuestion(false)
        setShowQuestion1(true)

    }
    const onFinishQuestion1 = (value) => {
        console.log("val", value);
        // setInputAnswer({ ...inputAnswer, ...value })
        const asw = {}
        var tong = 27;
        console.log("inputAs", { ...inputAnswer, ...value });
        const dataQ = { ...inputAnswer, ...value }
        if (dataQ.communicate_q1 == "1" && dataQ.communicate_q2 == "1") {
            asw.communicate = 4
            tong = tong +5
        }
        else if (dataQ.communicate_q1 == "1" && dataQ.communicate_q2 == undefined) {
            asw.communicate = 3
            tong = tong +5
        }
        else if (dataQ.communicate_q1 == undefined && dataQ.communicate_q2 == "1") {
            asw.communicate = 2
            tong = tong +5
        }
        else if (dataQ.communicate_q1 == "1" && dataQ.communicate_q2 == "2") {
            asw.communicate = 3
            tong = tong +5
        }
        else if (dataQ.communicate_q1 == "2" && dataQ.communicate_q2 == "1") {
            asw.communicate = 2
            tong = tong +5
        }
        else if (dataQ.communicate_q1 == "2" && dataQ.communicate_q2 == undefined){
            asw.communicate = 1
            tong = tong +5
        }
        else if (dataQ.communicate_q1 == "2" && dataQ.communicate_q2 == undefined){
            asw.communicate = 1
            tong = tong +5
        }
        else if (dataQ.communicate_q1 == undefined && dataQ.communicate_q2 == "2"){
            asw.communicate = 1
            tong = tong +5
        }
        else {
            // asw.communicate = 0
        }

        if (dataQ.work_grops_q1 == "1" && dataQ.work_grops_q2 == "1") {
            asw.work_grops = 4
            tong = tong +5
        }
        else if (dataQ.work_grops_q1 == "1" && dataQ.work_grops_q2 == undefined) {
            asw.work_grops = 3
            tong = tong +5
        }
        else if (dataQ.work_grops_q1 == undefined && dataQ.work_grops_q2 == "1") {
            asw.work_grops = 2
            tong = tong +5
        }
        else if (dataQ.work_grops_q1 == "1" && dataQ.work_grops_q2 == "2") {
            asw.work_grops = 3
            tong = tong +5
        }
        else if (dataQ.work_grops_q1 == "2" && dataQ.work_grops_q2 == "1") {
            asw.work_grops = 2
            tong = tong +5
        }
        else if (dataQ.work_grops_q1 == "2" && dataQ.work_grops_q2 == undefined){
            asw.work_grops = 1
            tong = tong +5
        }
        else if (dataQ.work_grops_q1 == undefined && dataQ.work_grops_q2 == "2"){
            asw.work_grops = 1
            tong = tong +5
        }
        else {
            // asw.work_grops = 0
        }

        if (dataQ.leader_q1 == "1" && dataQ.leader_q2 == "1") {
            asw.leader = 4
            tong = tong +5
        }
        else if (dataQ.leader_q1 == "1" && dataQ.leader_q2 == undefined) {
            asw.leader = 3
            tong = tong +5
        }
        else if (dataQ.leader_q1 == undefined && dataQ.leader_q2 == "1") {
            asw.leader = 2
            tong = tong +5
        }
        else if (dataQ.leader_q1 == "1" && dataQ.leader_q2 == "2") {
            asw.leader = 3
            tong = tong +5
        }
        else if (dataQ.leader_q1 == "2" && dataQ.leader_q2 == "1") {
            asw.leader = 2
            tong = tong +5
        }
        else if (dataQ.leader_q1 == "2" && dataQ.leader_q2 == undefined){
            asw.leader = 1
            tong = tong +5
        }
        else if (dataQ.leader_q1 == undefined && dataQ.leader_q2 == "2"){
            asw.leader = 1
            tong = tong +5
        }
        else {
            // asw.leader = 0
        }

        if (dataQ.presentation_q1 == "1" && dataQ.presentation_q2 == "1") {
            asw.presentation = 4
            tong = tong +5
        }
        else if (dataQ.presentation_q1 == "1" && dataQ.presentation_q2 == undefined) {
            asw.presentation = 3
            tong = tong +5
        }
        else if (dataQ.presentation_q1 == undefined && dataQ.presentation_q2 == "1") {
            asw.presentation = 2
            tong = tong +5
        }
        else if (dataQ.presentation_q1 == "1" && dataQ.presentation_q2 == "2") {
            asw.presentation = 3
            tong = tong +5
        }
        else if (dataQ.presentation_q1 == "2" && dataQ.presentation_q2 == "1") {
            asw.presentation = 2
            tong = tong +5
        }
        else if (dataQ.presentation_q1 == "2" && dataQ.presentation_q2 == undefined){
            asw.presentation = 1
            tong = tong +5
        }
        else if (dataQ.presentation_q1 == undefined && dataQ.presentation_q2 == "2"){
            asw.presentation = 1
            tong = tong +5
        }
        else {
            // asw.presentation = 0
        }

        console.log("asw", asw)
        console.log("tong" , tong);
        setInput({ ...input, ...asw  })
        // setSum(tong)
        setShowQuestion1(false)
        result({ ...input, ...asw } , tong)
    }
    const [form] = Form.useForm();
    const handleChange = () => {
        form.setFieldsValue({ sights: [] });
    };
    return (
        <div className='container'>
            <div>
                <div style={{ textAlign: 'center', paddingTop: "15px" }}>
                    <img src='https://png.pngtree.com/png-vector/20190226/ourlarge/pngtree-consultant-icon-business-and-finance---with-outline-filled-style-png-image_704645.jpg' style={{ maxWidth: "200px", maxHeight: "64px", borderRadius: '3px' }} />
                    <div style={{ fontSize: "22px", color: 'white', fontWeight: '800' }}>Employment Counseling</div>
                </div>
                <div className='form'>
                    {
                        showName &&

                        <div style={{ marginLeft: "15px", fontSize: '18px', fontWeight: '600' }}>
                            <div>Ch??o m???ng b???n ?????n v???i H??? th???ng t?? v???n vi???c l??m cho sinh vi??n</div>
                            <p>Ch??ng t??i s??? c???n m???t s??? th??ng tin c???a b???n. </p>
                            <p> * L??u ??: th??ng tin n??y ch??? thu th???p v???i m???c ????ch ????a ra vi???c l??m ph?? h???p v???i b???n. V?? c??c c??ng vi???c ch??ng t??i t?? v???n cho b???n s??? c?? xu h?????ng ph?? h???p v???i chuy??n ng??nh c???a b???n, n??n xin vui l??ng nh???p ch??nh x??c th??ng tin</p>
                            <p>
                                T??n c???a b???n l?? g??
                            </p>
                            <Input placeholder="Nh???p t??n c???a b???n" value={name} onChange={(e) => setName(e.target.value)} style={{ maxWidth: "30%" }} onPressEnter={() => {
                                setShowName(false)
                                setShowForm(true)
                            }} />
                        </div>
                    }
                    {
                        showForm && <div>
                            <p style={{ marginLeft: "15px", fontSize: '18px', fontWeight: '600' }}>
                                {`Xin ch??o ${name} b???n h??y ??i???n c??c th??ng tin ????? ch??ng t??i t?? v???n c??ng vi???c ph?? h???p v???i b???n nh???t`}
                            </p>

                            <Form
                                name="validate_other"
                                form={form}
                                {...formItemLayout}
                                onFinish={onFinish}
                                initialValues={{
                                }}
                            >
                                <Form.Item name="sex" label="Gi???i t??nh"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your sex!',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value="nam">Nam</Radio>
                                        <Radio value="nu">N???</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name="ielts" label="Ielts"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your ielts!',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value="k">Kh??ng</Radio>
                                        <Radio value="6-7">T??? 6.0-7.0</Radio>
                                        <Radio value="7-8"> T??? 7.0-8.0</Radio>
                                        <Radio value="8+">T??? 8+ tr??? l??n</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name="level" label="B???ng c???p"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your level!',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value="dai_hoc">?????i h???c</Radio>
                                        <Radio value="cao_dang">Cao ?????ng</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    name="specialized"
                                    label="Ng??nh h???c"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your specialized!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Ng??nh h???c c???a b???n">
                                        <Option value="marketing">Marketing</Option>
                                        <Option value="kinhte_quantri">Kinh t???-Qu???n tr???</Option>
                                        <Option value="CNTT">CNTT</Option>
                                        <Option value="truyen_thong">Truy???n th??ng</Option>
                                        <Option value="vantai_dulich">V???n t???i v?? du l???ch</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="degree" label="B???ng c???p"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your degree!',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value="gioi">B???ng gi???i</Radio>
                                        <Radio value="kha">B???ng kh??</Radio>
                                        <Radio value="trung_binh">Trung B??nh</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.List style={{ marginLeft: "200px" }} name="sights">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(field => (
                                                <Space key={field.key} align="baseline">
                                                    <Form.Item
                                                        noStyle
                                                        shouldUpdate={(prevValues, curValues) =>
                                                            prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                                        }
                                                    >
                                                        {() => (
                                                            <Form.Item
                                                                {...field}
                                                                label="Add"
                                                                name={[field.name, 'add']}
                                                                rules={[{ required: true, message: 'Missing sight' }]}
                                                            >
                                                                <Input placeholder='C??c tr?????ng'/>
                                                            </Form.Item>
                                                        )}
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        label="Value"
                                                        name={[field.name, 'value']}
                                                        rules={[{ required: true, message: 'Missing price' }]}
                                                    >
                                                        <Input placeholder='Thu???c t??nh'/>
                                                    </Form.Item>

                                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                                </Space>
                                            ))}

                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                    Add sights
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                                <Form.Item
                                    wrapperCol={{
                                        span: 12,
                                        offset: 5,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    }
                    {
                        showQuestion &&
                        <div style={{ marginLeft: "15px", fontSize: '18px', fontWeight: '600' }}>
                            <Form name="validate_other"
                                {...formItemLayout}
                                onFinish={onFinishQuestion}
                                initialValues={{
                                }}>
                                <div>B???n th??ch giao ti???p b???ng l???i n??i h??n hay qua v??n b???n h??n</div>
                                <Form.Item name="communicate_q1" label="">
                                    <Radio.Group>
                                        <Radio value="1">L???i n??i</Radio>
                                        <Radio value="2">V??n b???n</Radio>
                                    </Radio.Group>
                                </Form.Item >
                                <div>Ngo??i ng?????i th??n v?? b???n b??, b???n c?? nhi???u m???i quan h??? x?? h???i ch???</div>
                                <Form.Item name="communicate_q2" label="">
                                    <Radio.Group>
                                        <Radio value="1">C??</Radio>
                                        <Radio value="2">Kh??ng</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <div>B???n l?? ng?????i th??ch l??m vi???c ?????c l???p hay l??m vi???c nh??m</div>
                                <Form.Item name="work_grops_q1" label="">
                                    <Radio.Group>
                                        <Radio value="1">L??m vi???c nh??m</Radio>
                                        <Radio value="2">L??m vi???c ?????c l???p</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <div>B???n c?? th??ch th?????ng xuy??n tham gia c??c ho???t ?????ng t???p th??? nhi???u ng?????i l??? hay kh??ng?</div>
                                <Form.Item name="work_grops_q2" label="">
                                    <Radio.Group>
                                        <Radio value="1">C??</Radio>
                                        <Radio value="2">Kh??ng</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <div>B???n ???? bao gi??? l??m leader trong 1 nh??m trong l???p v?? ho??n th??nh c??ng vi???c thu???n l???i ch??a.N???u ch??a t???ng th?? n???u b???o b???n l??m leader 1 nh??m th?? b???n c?? t??? tin m??nh l??m t???t c??ng vi???c kh??ng? </div>
                                <Form.Item name="leader_q1" label="">
                                    <Radio.Group>
                                        <Radio value="1">C??</Radio>
                                        <Radio value="2">Kh??ng</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <div>Khi ?????i m???t v???i 1 s??? r???i ro, b???n s??? b??nh t??nh suy ngh?? t??m ra h?????ng gi???i quy???t hay kh??ng?</div>
                                <Form.Item name="leader_q2" label="">
                                    <Radio.Group>
                                        <Radio value="1">C??</Radio>
                                        <Radio value="2">Kh??ng</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        span: 12,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        <RightCircleOutlined />
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    }
                    {
                        showQuestion1 &&
                        <div style={{ marginLeft: "15px", fontSize: '18px', fontWeight: '600' }}>
                            <Form name="validate_other"
                                {...formItemLayout}
                                onFinish={onFinishQuestion1}
                                initialValues={{
                                }}>
                                <div>-B???n c?? t??? tin khi ph???i ?????ng tr?????c l???p thuy???t tr??nh cho m???i ng?????i nghe kh??ng?</div>
                                <Form.Item name="presentation_q1" label="">
                                    <Radio.Group>
                                        <Radio value="1">C??</Radio>
                                        <Radio value="2">Kh??ng</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <div>-B???n ngh?? c?? bi???t c??ch t??? ch???c n???i dung thuy???t tr??nh ????? di???n ?????t ?? ki???n c???a m??nh ?</div>
                                <Form.Item name="presentation_q2" label="">
                                    <Radio.Group>
                                        <Radio value="1">C??</Radio>
                                        <Radio value="2">Kh??ng</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        span: 12,

                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    }
                    {
                        showAnswer &&
                        <div style={{ marginLeft: "15px", fontSize: '18px', fontWeight: '600' }}>
                            <HomeOutlined style={{ fontSize: "50px", marginBottom: "15px", color: "pink" }}
                                onClick={() => {
                                    setShowName(true)
                                    setShowAnswer(false)
                                    setName("")
                                    setShowForm(false)
                                    setShowQuestion(false)
                                    setShowQuestion1(false)
                                    setShowAnswer(false)
                                    setInput({})
                                    setInputAnswer({})
                                    setAnswer({})
                                }}
                            />
                            <div>
                                Theo nh???ng c??u tr??? l???i c???a b???n ??? h??? th???ng ch??ng t??i ???? xem x??t nh???ng ??i???m m???nh v?? ??i???m y???u c???a b???n v?? ????a ra k???t lu???n sau:
                            </div>
                            <div>
                                {`C??ng vi???c ph?? h???p : ${answer.job}`}
                            </div>
                            <div>
                                {`M?? t??? c??ng vi???c : ${answer.des}`}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div >
    );
};




export default Home;