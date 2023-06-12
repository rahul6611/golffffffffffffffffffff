// ** React Imports
import { Fragment } from "react";

// Formik
import { Form, Formik, Field } from "formik";

// Yup
import * as Yup from "yup";

// ** Reactstrap Imports
import {
    Label,
    Button,
    InputGroup,
    Card,
    Row,
    Col,
    CardHeader,
    CardTitle,
} from "reactstrap";

// ** Styles
import "react-slidedown/lib/slidedown.css";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import "../../assets/scss/custom.scss";

// Redux
import { useDispatch, useSelector } from "react-redux";
import CustomSpinner from "../../@core/components/customSpinner";
import { addTest } from "../../redux/clubs/slice";
import CustomTable from "../../@core/components/table/CustomTable";

const Calculator = () => {
    const dispatch = useDispatch();

    const { test, status } = useSelector((store) => store.club);
    const ColumnHeaders = () => (
        <>
            <th>No.</th>
            <th>Time</th>
            <th>Vx</th>
            <th>Ax</th>
            <th>Vy</th>
            <th>Ay</th>
            <th>Vz</th>
            <th>Az</th>
            <th>Vms</th>
            <th>Dx</th>
            <th>Dy</th>
            <th>Dz</th>
            <th>Dyd</th>
            <th>Trag angle</th>
            <th>Dir angle</th>
            <th>Cd</th>
            <th>Ci</th>
            <th>Back Spin Rate</th>
            <th>Reynolds</th>
            <th>Back spin</th>
            <th>Sidespin</th>
        </>
    );
    const DataRows = () => (
        <>
            {(test?.calculation_table || []).map((row, index) => (
                <tr key={index}>
                    <td>
                        <div className="avatar-shadow py-1">
                            {index + 1}
                        </div>
                    </td>
                    <td>
                        {row.time}
                    </td>
                    <td>
                        {row.Vx}
                    </td>
                    <td>
                        {row.Ax}
                    </td>
                    <td>
                        {row.Vy}
                    </td>
                    <td>
                        {row.Ay}
                    </td>
                    <td>
                        {row.Vz}
                    </td>
                    <td>
                        {row.Az}
                    </td>
                    <td>
                        {row.Vms}
                    </td>
                    <td>
                        {row.Dx}
                    </td>
                    <td>
                        {row.Dy}
                    </td>
                    <td>
                        {row.Dz}
                    </td>
                    <td>
                        {row.Dyd}
                    </td>
                    <td>
                        {row.trag_angle}
                    </td>
                    <td>
                        {row.dir_angle}
                    </td>
                    <td>
                        {row.Cd}
                    </td>
                    <td>
                        {row.Ci}
                    </td>
                    <td>
                        {row.back_spin_rate}
                    </td>
                    <td>
                        {row.reynolds}
                    </td>
                    <td>
                        {row.back_spin}
                    </td>
                    <td>
                        {row.side_spin}
                    </td>
                </tr>
            ))}
        </>)

    const ColumnHeaders1 = () => (
        <>
            <th>Club Speed</th>
            <th>Ball Speed</th>
            <th>Launch Angle</th>
            <th>Spin</th>
            <th>Horizonal Carry</th>
            <th>Lateral Carry</th>
            <th>Total Carry</th>
            <th>Impact Angle</th>
            <th>Total Distance</th>
            <th>Maximum Height</th>
            <th>Flight Time</th>
        </>
    );
    const DataRows1 = (index) => (
        <>
            {/* {(test?.initial_values || []).map((row, index) => ( */}
            <tr key={index} className='py-1'>
                <td>
                    {test?.outputvalue?.club_Speed.toFixed(2)}
                </td>
                <td>
                    {test?.outputvalue?.ball_speed}
                </td>
                <td>
                    {test?.outputvalue?.launch}
                </td>
                <td>
                    {test?.outputvalue?.spin.toFixed(2)}
                </td>
                <td>
                    {test?.outputvalue?.horizonal_carry}
                </td>
                <td>
                    {test?.outputvalue?.lateral_carry}
                </td>
                <td>
                    {test?.outputvalue?.total_carry}
                </td>
                <td>
                    {test?.outputvalue?.impect_Angle}
                </td>
                <td>
                    {test?.outputvalue?.TotalDistance?.toFixed(2)}
                </td>
                <td>
                    {test?.outputvalue?.Maximum_Height}
                </td>
                <td>
                    {test?.outputvalue?.Flight_time}
                </td>
            </tr>
            {/* ))} */}
        </>)

    return (
        <Fragment>
            {status === "loading" && <CustomSpinner />}
            <BreadCrumbs
                breadCrumbTitle="Calculator"
                breadCrumbParent={{ name: "Home", route: "/home" }}
                breadCrumbActive="Calculator"
            />
            <div className="row">
                <Col lg={6}>
                    <Card className='p-3 mt-2'>
                        <Formik
                            initialValues={{
                                BallSpeed: '',
                                InitialTrajectory: '',
                                InitialBackspin: '',
                                SpinAxis: '',
                                Temperature: '',
                                Elevation: '',
                                Humidity: '',
                                WindSpeed: '',
                                WindDirection: '',
                                // Pressure: '',
                            }}
                            validationSchema={Yup.object().shape({
                                BallSpeed: Yup.number().positive().required("Ball speed is required").max(190, "Ball speed must be less than 190"),
                                InitialTrajectory: Yup.number().required("Launch Angle is required").max(520, "Launch Angle must be less than 520"),
                                InitialBackspin: Yup.number().required("Spin Rate is required"),
                                SpinAxis: Yup.number().required("Spin axis is required"),
                                Temperature: Yup.number().required("Temperature is required").min(20, "Temperature must be greater than 20").max(120, "Temperature must be less than 120"),
                                Elevation: Yup.number().required("Elevation is required").min(0, "Elevation must be greater than 0").max(7000, "Elevation must be less than 7000"),
                                Humidity: Yup.number().required("Humidity is required").min(0, "Humidity must be greater than 0").max(100, "Humidity must be less than 100"),
                                WindSpeed: Yup.number().required("Wind speed is required").min(0, "WindSpeed must be greater than 0").max(60, "Wind speed must be less than 60"),
                                WindDirection: Yup.number().required("Wind direction is required").min(1, "Wind direction must be greater than 1").max(12, "Wind direction must be less than 12"),
                                // Pressure: Yup.number().required("Pressure is required")
                            })}
                            onSubmit={(values) => {
                                dispatch(addTest({ data: values }));
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleSubmit,
                                handleReset,
                                setFieldValue,
                            }) => (
                                <Form
                                    onSubmit={handleSubmit}
                                    onReset={handleReset}
                                >
                                    <Row>
                                        <h4>Weather Details</h4>
                                        <div className='mb-1 test-1'>
                                            <Label className='form-label' for='Temperature'>
                                                Temperature
                                            </Label>
                                            <InputGroup>
                                                <Field type='number' className="form-control" id='Temperature' placeholder='Temperature' name="Temperature"
                                                    onChange={(e) => setFieldValue("Temperature", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.Temperature && touched.Temperature ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.Temperature}</p>
                                            ) : null}
                                        </div>
                                        <div className='mb-1 test-1'>
                                            <Label className='form-label' for='Elevation'>
                                                Elevation
                                            </Label>
                                            <InputGroup>
                                                <Field type='number' className="form-control" id='Elevation' placeholder='Elevation' name="Elevation"
                                                    onChange={(e) => setFieldValue("Elevation", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.Elevation && touched.Elevation ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.Elevation}</p>
                                            ) : null}
                                        </div>
                                        <div className='mb-1 test-1'>
                                            <Label className='form-label' for='Humidity'>
                                                Humidity
                                            </Label>
                                            <InputGroup>
                                                <Field type='number' className="form-control" id='Humidity' placeholder='Humidity' name="Humidity"
                                                    onChange={(e) => setFieldValue("Humidity", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.Humidity && touched.Humidity ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.Humidity}</p>
                                            ) : null}
                                        </div>
                                        <div className='mb-1 test-1'>
                                            <Label className='form-label' for='WindSpeed'>
                                                Wind Speed
                                            </Label>
                                            <InputGroup>
                                                <Field type='number' className="form-control" id='WindSpeed' placeholder='WindSpeed' name="WindSpeed"
                                                    onChange={(e) => setFieldValue("WindSpeed", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.WindSpeed && touched.WindSpeed ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.WindSpeed}</p>
                                            ) : null}
                                        </div>
                                        <div className='mb-1 test-1'>
                                            <Label className='form-label' for='Wind Direction'>
                                                Wind Direction
                                            </Label>
                                            <InputGroup>
                                                <Field type='number' className="form-control" id='WindDirection' placeholder='WindDirection' name="WindDirection"
                                                    onChange={(e) => setFieldValue("WindDirection", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.WindDirection && touched.WindDirection ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.WindDirection}</p>
                                            ) : null}
                                        </div>
                                        <h4 className="mt-1">Club Details</h4>
                                        <Col className='mb-1 test'>
                                            <Label className='form-label' for='BallSpeed'>
                                                Ball Speed
                                            </Label>
                                            <InputGroup>
                                                <Field
                                                    type='number'
                                                    className="form-control"
                                                    id='BallSpeed'
                                                    placeholder='Ball speed'
                                                    name="BallSpeed"
                                                    onChange={(e) => setFieldValue("BallSpeed", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.BallSpeed && touched.BallSpeed ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.BallSpeed}</p>
                                            ) : null}
                                        </Col>
                                        <div className='mb-1 test'>
                                            <Label className='form-label' for='InitialTrajectory'>
                                                Launch Angle
                                            </Label>
                                            <InputGroup>
                                                <Field type='number' className="form-control" id='InitialTrajectory' placeholder='Launch Angle' name="InitialTrajectory"
                                                    onChange={(e) => setFieldValue("InitialTrajectory", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.InitialTrajectory && touched.InitialTrajectory ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.InitialTrajectory}</p>
                                            ) : null}
                                        </div>
                                        <div className='mb-1 test'>
                                            <Label className='form-label' for='email'>
                                                Spin Rate
                                            </Label>
                                            <InputGroup>
                                                <Field type='number' className="form-control" id='email' placeholder='Spin Rate' name="InitialBackspin"
                                                    onChange={(e) => setFieldValue("InitialBackspin", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.InitialBackspin && touched.InitialBackspin ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.InitialBackspin}</p>
                                            ) : null}
                                        </div>
                                        <div className='mb-1 test'>
                                            <Label className='form-label' for='SpinAxis'>
                                                Spin Axis
                                            </Label>
                                            <InputGroup>
                                                <Field type='number' role="input" className="form-control" id='SpinAxis' placeholder='Spin Axis' name="SpinAxis"
                                                    onChange={(e) => setFieldValue("SpinAxis", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.SpinAxis && touched.SpinAxis ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.SpinAxis}</p>
                                            ) : null}
                                        </div>
                                        {/* <div className='mb-1 test'>
                                            <Label className='form-label' for='Pressure'>
                                                Pressure
                                            </Label>
                                            <InputGroup>
                                                <Field type='number' className="form-control" id='Pressure' placeholder='Pressure' name="Pressure"
                                                    onChange={(e) => setFieldValue("Pressure", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.Pressure && touched.Pressure ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.Pressure}</p>
                                            ) : null}
                                        </div> */}
                                        <div className='d-flex'>
                                            <Button className='me-1' color='primary' type='submit'>
                                                Submit
                                            </Button>
                                        </div>
                                    </Row>
                                </Form>
                            )}
                        </Formik>

                    </Card>
                </Col>
                <Col lg={6}>
                    <Card className="mt-2 p-2 card-calc">
                        <CardTitle tag="h4">Calculation</CardTitle>
                        <div className="row">
                            <div className="col-lg-3">
                                <p>V =
                                    &nbsp;{test?.initial_values?.V}
                                </p>
                                <p>Vxo =
                                    &nbsp;{test?.initial_values?.Vxo}
                                </p>
                                <p>Vyo =
                                    &nbsp;{test?.initial_values?.Vyo}
                                </p>
                                <p>Vzo =
                                    &nbsp;{test?.initial_values?.Vzo}
                                </p>
                                <p>angular_f =
                                    &nbsp;{test?.initial_values?.angular_f}
                                </p>
                            </div>
                            <div className="col-lg-3">
                                <p>launch =
                                    &nbsp;{test?.initial_values?.launch}
                                </p>
                                <p>B =
                                    &nbsp;{test?.initial_values?.B}
                                </p>
                                <p>time_interval =
                                    &nbsp;{test?.initial_values?.time_interval}
                                </p>
                                <p>viscosity =
                                    &nbsp;{test?.initial_values?.viscosity.toFixed(2)}
                                </p>
                                <p>air_density =
                                    &nbsp;{test?.initial_values?.air_density}
                                </p>
                            </div>
                            <div className="col-lg-3">
                                <p>constant =
                                    &nbsp;{test?.initial_values?.constant}
                                </p>
                                <p>initial_direct =
                                    &nbsp;{test?.initial_values?.initial_direct}
                                </p>
                                <p>closed_open =
                                    &nbsp;{test?.initial_values?.closed_open}
                                </p>
                                <p>wind =
                                    &nbsp;{test?.initial_values?.wind}
                                </p>
                                <p>humidity =
                                    &nbsp;{test?.initial_values?.humidity}
                                </p>
                            </div>
                            <div className="col-lg-3">
                                <p>temp_c =
                                    &nbsp;{test?.initial_values?.temp_c}
                                </p>
                                <p>pressure =
                                    &nbsp;{test?.initial_values?.pressure}
                                </p>
                                <p>direction =
                                    &nbsp;{test?.initial_values?.direction}
                                </p>
                                <p>altitude =
                                    &nbsp;{test?.initial_values?.altitude}
                                </p>
                                <p>decay_rate =
                                    &nbsp;{test?.initial_values?.decay_rate}
                                </p>
                            </div>
                        </div>
                    </Card>
                </Col>
                <div className="react-dataTable name-width calc">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Calculation</CardTitle>
                        </CardHeader>
                        <CustomTable
                            columnHeaders={<ColumnHeaders1 />}
                            dataRows={<DataRows1 />}
                        />
                    </Card>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle tag="h4">Calculation</CardTitle>
                </CardHeader>
                <div className="react-dataTable name-width">
                    <CustomTable
                        columnHeaders={<ColumnHeaders />}
                        dataRows={<DataRows />}
                    />
                </div>
            </Card>
        </Fragment>
    );
};


export default Calculator;
