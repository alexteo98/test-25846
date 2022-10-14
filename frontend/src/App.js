import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import MainPage from "./components/MainPage";
import {Box} from "@mui/material";

function App() {
    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Router>
                    <Routes>
                        <Route path="/mainpage" element={<MainPage/>}/>
                        <Route path="/*" element={<Navigate replace to="/mainpage" />}/>
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;