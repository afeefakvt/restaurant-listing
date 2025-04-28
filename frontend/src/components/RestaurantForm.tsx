import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
    Alert,
  } from '@mui/material';
  import { Restaurant } from '../types/Restaurant';
  import { getRestaurantById ,updateRestaurant,createRestaurant} from '../api/restaurantApi';
  import { validateRestaurantForm } from '../utils/validation';
import axios from 'axios';


  interface RestaurantFormProps {
    isEditMode?: boolean;
  }

  
const RestaurantForm: React.FC<RestaurantFormProps> = ({ isEditMode = false }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id) : undefined;

    const initialState: Omit<Restaurant, 'id'> = {
      name: '',
      address: '',
      contact: '',
    };
  
    const [restaurant, setRestaurant] = useState(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [validationErrors, setValidationErrors] = useState({
      name: '',
      address: '',
      contact: '',
    });
  
    useEffect(() => {
      if (isEditMode && numericId) {
        fetchRestaurant(numericId);
      }
    }, [isEditMode, numericId]);
  
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

      const {isValid,errors} = validateRestaurantForm(restaurant)
      setValidationErrors(errors)

      if(!isValid){
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        if (isEditMode && numericId) {
          await updateRestaurant(numericId, restaurant);
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
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || 'Something went wrong');
        } else {
          setError(isEditMode ? 'Failed to update restaurant' : 'Failed to add restaurant');
        }
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
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Restaurant Name"
            name="name"
            value={restaurant.name}
            onChange={handleChange}
            error={!!validationErrors.name}
            helperText={validationErrors.name}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={restaurant.address}
            onChange={handleChange}
            multiline
            rows={2}
            error={!!validationErrors.address}
            helperText={validationErrors.address}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Contact Number"
            name="contact"
            value={restaurant.contact}
            onChange={handleChange}
            error={!!validationErrors.contact}
            helperText={validationErrors.contact}
          />
        </Box>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={() => navigate('/')}>
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
        </Box>
      </Box>
    </Box>
    )
  }
  export default RestaurantForm;
