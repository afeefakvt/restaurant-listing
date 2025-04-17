import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RestaurantList from './components/RestaurantList'
import RestaurantForm from "./components/RestaurantForm";


function App() {

  return (
    <Router>
      <CssBaseline />
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <RestaurantIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            Restaurant Listing App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ my: 4 }}>
          <Routes>
            <Route path="/" element={<RestaurantList/>}/>
            <Route path="/add" element={<RestaurantForm/>}/>
            <Route path="/edit/:id" element={<RestaurantForm isEditMode={true}/>}/>
           
          </Routes>
        </Box>
      </Container>
    </Router>
  )
}

export default App
