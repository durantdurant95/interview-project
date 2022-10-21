import { Row } from "antd";
import UserTable from "./components/UserTable";
import "./App.css";

function App() {
	return (
		<>
			<Row justify="center" align="middle">
				<UserTable />
			</Row>
		</>
	);
}

export default App;
