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
                            <div>Chào mừng bạn đến với Hệ thống tư vấn việc làm cho sinh viên</div>
                            <p>Chúng tôi sẽ cần một số thông tin của bạn. </p>
                            <p> * Lưu ý: thông tin này chỉ thu thập với mục đích đưa ra việc làm phù hợp với bạn. Và các công việc chúng tôi tư vấn cho bạn sẽ có xu hướng phù hợp với chuyên ngành của bạn, nên xin vui lòng nhập chính xác thông tin</p>
                            <p>
                                Tên của bạn là gì
                            </p>
                            <Input placeholder="Nhập tên của bạn" value={name} onChange={(e) => setName(e.target.value)} style={{ maxWidth: "30%" }} onPressEnter={() => {
                                setShowName(false)
                                setShowForm(true)
                            }} />
                        </div>
                    }
                    {
                        showForm && <div>
                            <p style={{ marginLeft: "15px", fontSize: '18px', fontWeight: '600' }}>
                                {`Xin chào ${name} bạn hãy điền các thông tin để chúng tôi tư vấn công việc phù hợp với bạn nhất`}
                            </p>

                            <Form
                                name="validate_other"
                                form={form}
                                {...formItemLayout}
                                onFinish={onFinish}
                                initialValues={{
                                }}
                            >
                                <Form.Item name="sex" label="Giới tính"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your sex!',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value="nam">Nam</Radio>
                                        <Radio value="nu">Nữ</Radio>
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
                                        <Radio value="k">Không</Radio>
                                        <Radio value="6-7">Từ 6.0-7.0</Radio>
                                        <Radio value="7-8"> Từ 7.0-8.0</Radio>
                                        <Radio value="8+">Từ 8+ trở lên</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name="level" label="Bằng cấp"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your level!',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value="dai_hoc">Đại học</Radio>
                                        <Radio value="cao_dang">Cao đẳng</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    name="specialized"
                                    label="Ngành học"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your specialized!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Ngành học của bạn">
                                        <Option value="marketing">Marketing</Option>
                                        <Option value="kinhte_quantri">Kinh tế-Quản trị</Option>
                                        <Option value="CNTT">CNTT</Option>
                                        <Option value="truyen_thong">Truyền thông</Option>
                                        <Option value="vantai_dulich">Vận tải và du lịch</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="degree" label="Bằng cấp"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your degree!',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value="gioi">Bằng giỏi</Radio>
                                        <Radio value="kha">Bằng khá</Radio>
                                        <Radio value="trung_binh">Trung Bình</Radio>
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
                                                                <Input placeholder='Các trường'/>
                                                            </Form.Item>
                                                        )}
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        label="Value"
                                                        name={[field.name, 'value']}
                                                        rules={[{ required: true, message: 'Missing price' }]}
                                                    >
                                                        <Input placeholder='Thuộc tính'/>
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
                                <div>Bạn thích giao tiếp bằng lời nói hơn hay qua văn bản hơn</div>
                                <Form.Item name="communicate_q1" label="">
                                    <Radio.Group>
                                        <Radio value="1">Lời nói</Radio>
                                        <Radio value="2">Văn bản</Radio>
                                    </Radio.Group>
                                </Form.Item >
                                <div>Ngoài người thân và bạn bè, bạn có nhiều mối quan hệ xã hội chứ</div>
                                <Form.Item name="communicate_q2" label="">
                                    <Radio.Group>
                                        <Radio value="1">Có</Radio>
                                        <Radio value="2">Không</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <div>Bạn là người thích làm việc độc lập hay làm việc nhóm</div>
                                <Form.Item name="work_grops_q1" label="">
                                    <Radio.Group>
                                        <Radio value="1">Làm việc nhóm</Radio>
                                        <Radio value="2">Làm việc độc lập</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <div>Bạn có thích thường xuyên tham gia các hoạt động tập thể nhiều người lạ hay không?</div>
                                <Form.Item name="work_grops_q2" label="">
                                    <Radio.Group>
                                        <Radio value="1">Có</Radio>
                                        <Radio value="2">Không</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <div>Bạn đã bao giờ làm leader trong 1 nhóm trong lớp và hoàn thành công việc thuận lợi chưa.Nếu chưa từng thì nếu bảo bạn làm leader 1 nhóm thì bạn có tự tin mình làm tốt công việc không? </div>
                                <Form.Item name="leader_q1" label="">
                                    <Radio.Group>
                                        <Radio value="1">Có</Radio>
                                        <Radio value="2">Không</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <div>Khi đối mặt với 1 số rủi ro, bạn sẽ bình tĩnh suy nghĩ tìm ra hướng giải quyết hay không?</div>
                                <Form.Item name="leader_q2" label="">
                                    <Radio.Group>
                                        <Radio value="1">Có</Radio>
                                        <Radio value="2">Không</Radio>
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
                                <div>-Bạn có tự tin khi phải đứng trước lớp thuyết trình cho mọi người nghe không?</div>
                                <Form.Item name="presentation_q1" label="">
                                    <Radio.Group>
                                        <Radio value="1">Có</Radio>
                                        <Radio value="2">Không</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <div>-Bạn nghĩ có biết cách tổ chức nội dung thuyết trình để diễn đạt ý kiến của mình ?</div>
                                <Form.Item name="presentation_q2" label="">
                                    <Radio.Group>
                                        <Radio value="1">Có</Radio>
                                        <Radio value="2">Không</Radio>
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
                                Theo những câu trả lời của bạn ở hệ thống chúng tôi đã xem xét những điểm mạnh và điểm yếu của bạn và đưa ra kết luận sau:
                            </div>
                            <div>
                                {`Công việc phù hợp : ${answer.job}`}
                            </div>
                            <div>
                                {`Mô tả công việc : ${answer.des}`}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div >
    );
};




export default Home;