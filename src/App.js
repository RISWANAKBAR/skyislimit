import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Jobform from './components/Vaccancies/jobform/Jobform';
import Jobvaccancies from './components/Vaccancies/jobvaccancies/Jobvaccancies';
import SheduledJobs from './components/Shedulejobs/sheduledjobs/SheduledJobs';
import Sheduledform from './components/Shedulejobs/sheduledform/Sheduledform';
import Editform from './components/Vaccancies/editjobform/Editform';
import Editsheduleform from './components/Shedulejobs/editsheduleform/Editsheduleform';





function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Jobvaccancies />} />
          <Route path="/jobform" element={<Jobform />} />
          <Route path="/sheduledjobs" element={<SheduledJobs />} />
          <Route path="/sheduledforms" element={<Sheduledform />} />
          <Route path="/jobform/edit/:id" element={<Editform />} />
          <Route path="/editsheduleform/edit/:id" element={<Editsheduleform />} />

      
          
  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
