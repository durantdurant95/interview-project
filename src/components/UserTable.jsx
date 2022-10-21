import { useState, useEffect } from "react";
import { Table, Button, Modal, Divider, Spin } from "antd";
import axios from "axios";

function UserTable() {
	const [data, setdata] = useState([]);
	const [modalData, setModalData] = useState({});
	const [modalOpen, setModalOpen] = useState(false);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		getData();
	}, []);

	const getData = async () => {
		const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
		setdata(
			res.data.map((row) => ({
				id: row.id,
				name: row.name,
				username: row.username,
				email: row.email,
				address: {
					street: row.address.street,
					suite: row.address.suite,
					city: row.address.city,
					zipcode: row.address.zipcode,
					geo: {
						lat: row.address.geo.lat,
						lng: row.address.geo.lng,
					},
				},
				phone: row.phone,
				website: row.website,
				company: {
					name: row.company.name,
					catchPhrase: row.company.catchPhrase,
					bs: row.company.bs,
				},
			}))
		);
		setLoading(false);
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (text, selected) => (
				<Button type="secondary" onClick={() => showModal(selected)}>
					{text}
				</Button>
			),
		},
		{
			title: "Username",
			dataIndex: "username",
			key: "username",
		},
	];

	const showModal = (selected) => {
		console.log(selected);
		setModalData(selected);
		setModalOpen(true);
	};

	const handleOk = () => {
		setModalOpen(false);
	};

	const handleCancel = () => {
		setModalOpen(false);
	};
	if (isLoading) {
		return <Spin size="large" />;
	}
	return (
		<>
			<Table dataSource={data} columns={columns} />
			<Modal
				title="User Data"
				open={modalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[null]}
			>
				<p>Name: {modalData.name}</p>
				<p>Username: {modalData.username}</p>
				<p>Email: {modalData.email}</p>
				<Divider orientation="left">Address</Divider>
				<p>Street: {modalData.address?.street}</p>
				<p>Suite: {modalData.address?.suite}</p>
				<p>City: {modalData.address?.city}</p>
				<p>Zipcode: {modalData.address?.zipcode}</p>
				<Divider orientation="left">Geolocalization</Divider>
				<p>Latitude: {modalData.address?.geo?.lat}</p>
				<p>Longitude: {modalData.address?.geo?.lng}</p>
				<p>Phone: {modalData.phone}</p>
				<p>Website: {modalData.website}</p>
				<Divider orientation="left">Company</Divider>
				<p>Name: {modalData.company?.name}</p>
				<p>Catch Phrase: {modalData.company?.catchPhrase}</p>
				<p>Bs: {modalData.company?.bs}</p>
			</Modal>
		</>
	);
}

export default UserTable;
