import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
	return {
		headers: { Authorization: `bearer ${storage.loadUser().token}` }
	}
}

const getAll = async () => {
	const request = await axios.get(baseUrl)
	return request.data
}

const create = async (blog) => {
	const request = await axios.post(baseUrl, blog, getConfig())
	return request.data
}

const update = (blog) => {
	const request = axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
	return request.then(response => response.data)
}

const remove = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`, getConfig())
	return request.then(response => response.data)
}

export default { getAll, create, update, remove }