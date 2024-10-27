import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";

const Bill = () => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [roomDetails, setRoomDetails] = useState([]);
  const [services, setServices] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [arriveDate, setArriveDate] = useState(null);
  const [leaveDate, setLeaveDate] = useState(null);
  const [isPaid, setIsPaid] = useState(true);

  const apiUrl = process.env.BACKEND_URL;

  // useEffect(async () => {
  //     const {data} = await axios.get(`${apiUrl}/bill`);

  //     setCustomerName(data.customerName);
  //     setPhone(data.phoneNumber);
  //     setRoomDetails(data.roomDetails);
  //     setServices(data.services);
  //     setTotalCost(data.totalCost);
  //     setArriveDate(data.arriveDate);
  //     setLeaveDate(data.leaveDate);
  //     setIsPaid(data.isPaid);
  // }, []);

  return (
    <>
          <div className="border rounded my-4" style={{ margin: "0 10rem" }}>
            <h1 className="py-4 text-center">Bill</h1>
            <div className="d-flex justify-content-between mx-5 border-bottom mb-3">
              <p>Customer Name</p>
              <p>{customerName}</p>
            </div>
            <div className="d-flex justify-content-between mx-5 border-bottom mb-3">
              <p>Phone</p>
              <p>{phone}</p>
            </div>
            <div className="d-flex justify-content-between mx-5 border-bottom mb-3">
              <p>Arrive Date</p>
              <p>{arriveDate}</p>
            </div>
            <div className="d-flex justify-content-between mx-5 border-bottom">
              <p>Leave Date</p>
              <p>{leaveDate}</p>
            </div>

            <div className="mx-5 mt-5">
              <h5 className="fw-bolder">Room:</h5>
              <div className="mt-3 row mb-2">
                <p className="col-md-4 text-start fw-semibold m-0 mb-1">NAME</p>
                <p className="col-md-3 text-center fw-semibold m-0 mb-1">
                  TYPE
                </p>
                <p className="col-md-3 text-center fw-semibold m-0 mb-1">
                  AMOUNT
                </p>
                <p className="col-md-2 text-end fw-semibold m-0 mb-1">PRICE</p>
              </div>

              {roomDetails.forEach((roomDetail, index) => (
                <div key={index} className="d-flex">
                  {/* <p className="col-md-4 pt-3 pb-2 ps-3 m-0 mb-1 me-1 bg-light text-start rounded-start">
                                        <ul>
                                            <li>Room 102</li>
                                        </ul>
                                    </p> */}
                  <p className="col-md-3 pt-3 pb-2 m-0 mb-1 me-1 bg-light text-center">
                    {roomDetail.roomCategory}
                  </p>
                  <p className="col-md-3 pt-3 pb-2 m-0 mb-1 me-1 bg-light text-center">
                    {roomDetail.roomNumber}
                  </p>
                  <p className="col-md-2 pt-3 pb-2 m-0 mb-1 me-1 pe-4 bg-light text-end rounded-end">
                    {roomDetail.price}
                  </p>
                </div>
              ))}

              <div className="d-flex">
                {/* <p className="align-items-center col-md-4 pt-3 pb-2 ps-3 m-0 mb-1 me-1 bg-light text-start rounded-start">
                                        <ul>
                                            <li>Room 102</li>
                                        </ul>
                                    </p> */}
                <p className="col-md-3 pt-3 pb-2 m-0 mb-1 me-1 bg-light text-center">
                  Classic
                </p>
                <p className="col-md-3 pt-3 pb-2 m-0 mb-1 me-1 bg-light text-center">
                  1
                </p>
                <p className="col-md-2 pt-3 pb-2 m-0 mb-1 me-1 pe-4 bg-light text-end rounded-end">
                  1
                </p>
              </div>
              <div className="d-flex">
                {/* <p className="align-items-center col-md-4 pt-3 pb-2 ps-3 m-0 mb-1 me-1 bg-light text-start rounded-start">
                                        <ul>
                                            <li>Room 102</li>
                                        </ul>
                                    </p> */}
                <p className="col-md-3 pt-3 pb-2 m-0 mb-1 me-1 bg-light text-center">
                  Classic
                </p>
                <p className="col-md-3 pt-3 pb-2 m-0 mb-1 me-1 bg-light text-center">
                  1
                </p>
                <p className="col-md-2 pt-3 pb-2 m-0 mb-1 me-1 pe-4 bg-light text-end rounded-end">
                  1
                </p>
              </div>
            </div>

            <div className="mx-5 mt-5">
              <h5 className="fw-bolder">Service:</h5>
              <ul>
                {services.forEach((service, index) => (
                  <li key={index}>
                    {service.serviceName}: {service.servicePrice}VND
                  </li>
                ))}
                <li>Service 1: 200000 VND</li>
                <li>Service 2: 200000 VND</li>
                <li>Service 3: 200000 VND</li>
              </ul>
            </div>

            <div className="d-flex justify-content-between mx-5 pt-5 pb-3 fw-bold">
              <p>Total Cost:</p>
              <p>{totalCost}</p>
            </div>
            <div className="d-flex justify-content-center my-3">
              {isPaid ? (
                <h5
                  className="fw-bolder text-center bg-success text-white rounded py-1"
                  style={{ width: "5rem" }}
                >
                  PAID
                </h5>
              ) : (
                <Button variant="primary">Pay</Button>
              )}
            </div>
          </div>
    </>
  );
};

export default Bill;
