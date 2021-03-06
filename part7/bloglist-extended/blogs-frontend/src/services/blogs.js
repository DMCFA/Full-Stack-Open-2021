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

const update = async (blog) => {
	const request = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
	return  request.data
}

const remove = async (id) => {
	const request = await axios.delete(`${baseUrl}/${id}`, getConfig())
	return request.data
}

const comment = async (comment, id) => {
	const request = await axios.post(`${baseUrl}/${id}/comments`, { comment })
	return request.data
}

export default { getAll, create, update, remove, comment }