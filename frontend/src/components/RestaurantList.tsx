import { useState, useEffect } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Restaurant } from '../types/Restaurant';
import { useNavigate } from 'react-router-dom';
import { getRestaurants } from '../api/restaurantApi';
import { deleteRestaurant } from '../api/restaurantApi';

const RestaurantList = () => {

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState<string | null>(null);

  const navigate = useNavigate()

  useEffect(()=>{
    fetchRestaurants()
  },[])

  const fetchRestaurants = async()=>{
      try {
        setLoading(true)
        const data = await getRestaurants()
        setRestaurants(data)
        setError(null)
      } catch (error) {
        setError('Failed to fetch restaurants')
        console.error(error)
        
      }finally{
        setLoading(false)

      }
  }

  const handleAddNew = ()=>{
    navigate('/add')
  }


  const handleEdit = (id:string)=>{
    navigate(`/edit/${id}`)
  }

  const handleDeleteClick = (id:string)=>{
    setRestaurantToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async()=>{
    if(restaurantToDelete){
      try {
        await deleteRestaurant(restaurantToDelete)
        setDeleteDialogOpen(false)
        fetchRestaurants()
      } catch (error) {
        setError('Failed to delete restaurant');
        console.error(error);
        
      }
    }
  }

  const handleDeleteCancel = ()=>{
    setDeleteDialogOpen(false)
    setRestaurantToDelete(null)
  }

  
  if (loading) return <Typography>Loading restaurants...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h5" component="h2">
          Restaurants
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddNew}
        >
          Add New Restaurant
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <TableRow key={restaurant._id}>
                  <TableCell>{restaurant.name}</TableCell>
                  <TableCell>{restaurant.address}</TableCell>
                  <TableCell>{restaurant.contact}</TableCell>
               
                  <TableCell align="right">
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEdit(restaurant._id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDeleteClick(restaurant._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No restaurants found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this restaurant? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default RestaurantList
