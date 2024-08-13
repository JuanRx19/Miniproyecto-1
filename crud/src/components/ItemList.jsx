import { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);
      
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    if(connect){
      setTitle(`Cantidad de elementos: ${items.length}`)
    }else{
      setTitle(`Cantidad de elementos: Sin conexión al backend`)
    }
    
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/items/');
      setConnect(true)
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/items/', { name, description }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setItems([...items, response.data]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateItem = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/items/${editId}/`, { name, description }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const updatedItems = items.map(item => (item.id === editId ? response.data : item));
      setItems(updatedItems);
      setName('');
      setDescription('');
      setEditId(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/items/${id}/`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const startEdit = (item) => {
    setName(item.name);
    setDescription(item.description);
    setEditId(item.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      handleUpdateItem();
    } else {
      handleAddItem();
    }
  };

  return (
    <div>
      <h1 className='prueba'>{title}</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}: {item.description}
            <button onClick={() => startEdit(item)}>Editar</button>
            <button onClick={() => handleDeleteItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h2>{editId ? 'Editar' : 'Agregar nuevo'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <div>
    </div>
    </div>
  );
};

export default ItemList;
