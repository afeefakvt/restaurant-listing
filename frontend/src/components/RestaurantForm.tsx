import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
    Grid,
    Alert
  } from '@mui/material';
  import { Restaurant } from '../types/Restaurant';


  interface RestaurantFormProps {
    isEditMode?: boolean;
  }

  
const RestaurantForm: React.FC<RestaurantFormProps> = ({ isEditMode = false }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    
    const initialState: Restaurant = {
        name: '',
        address: '',
        contact: '',

    };
  
    const [restaurant, setRestaurant] = useState<Restaurant>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
  
    useEffect(() => {
      if (isEditMode && id) {
        fetchRestaurant(parseInt(id));
      }
    }, [isEditMode, id]);
  
    const fetchRestaurant = async (restaurantId: number) => {
      try {
        setLoading(true);
        const data = await getRestaurantById(restaurantId);
        setRestaurant(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch restaurant details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setRestaurant(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        setLoading(true);
        setError(null);
        
        if (isEditMode && id) {
          await updateRestaurant(parseInt(id), restaurant);
          setSuccess('Restaurant updated successfully!');
        } else {
          await createRestaurant(restaurant);
          setSuccess('Restaurant added successfully!');
          setRestaurant(initialState); // Reset form on successful creation
        }
        
        setTimeout(() => {
          navigate('/');
        }, 1500);
        
      } catch (err) {
        setError(isEditMode ? 'Failed to update restaurant' : 'Failed to add restaurant');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    if (loading && isEditMode) return <CircularProgress />;
  
    return (
      <Box component={Paper} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {isEditMode ? 'Edit Restaurant' : 'Add New Restaurant'}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Restaurant Name"
                name="name"
                value={restaurant.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                value={restaurant.address}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Contact Number"
                name="contact"
                value={restaurant.contact}
                onChange={handleChange}
              />
            </Grid>
           
            <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : isEditMode ? 'Update' : 'Add'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };
  export default RestaurantForm;
