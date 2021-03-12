import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-burger-builder-31716-default-rtdb.firebaseio.com/',
});

export default instance;
